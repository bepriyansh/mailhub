/*
    The MessageQueue class manages the queue and ensures that messages are processed
    with a concurrency limit (number of parallel tasks). 
    It delegates message processing to an injected processor, following the Dependency Inversion Principle.
*/


import MessageProcessor, { Message } from "./MessageProcessor";

export default class MessageQueue {
    private queue: Message[] = [];                      // Queue to hold messages to be processed
    private concurrency: number;                        // Max number of parallel tasks
    private activeWorkers = 0;                          // Track how many workers are currently active
    private processing = false;                         // Indicates if the queue is being processed
    private processor: MessageProcessor;                // Injected message processor (e.g., EmailProcessor)
    private retryDelay: number;                         // Retry failed messages after delay
    private dlq: MessageQueue | null;                   // Dead-letter-queue for retrying failed tasks

    constructor(processor: MessageProcessor, concurrency = 5, dlq: MessageQueue | null = null, retryDelay = 500) {
        this.processor = processor;
        this.concurrency = concurrency;
        this.dlq = dlq;
        this.retryDelay = retryDelay;
    }
    
    // Adds a message to the queue and starts processing if it's not already running.
    addMessage(message: Message): void {
        this.queue.push(message);
        this.processQueue();
    }

    private async processQueue(): Promise<void> {
        if (this.processing) return;
        this.processing = true;

        // Keep processing as long as there are messages or active workers
        while (this.queue.length > 0 || this.activeWorkers > 0) {
            // Check if more workers can be started based on concurrency limit
            while (this.activeWorkers < this.concurrency && this.queue.length > 0) {
                const message = this.queue.shift()!;
                this.activeWorkers++;

                this.processor.process(message)
                    .then(() => {
                        console.log(`Message processed: ${message.id}`);
                    })
                    .catch((error: Error) => {
                        if (this.dlq != null) {
                            console.log(`Message failed: ${message.id}`)
                            console.log(`Error: ${error.message}`);
                            console.log(`Retrying after ${this.retryDelay / 1000} secs`)

                            setTimeout(() => {
                                this.dlq!.addMessage(message);
                            }, this.retryDelay);
                        } else {
                            console.log(`Message failed: ${message.id}`)
                            console.log(`Error: ${error.message}`);
                        }
                    })
                    .finally(() => {
                        this.activeWorkers--;
                        this.processQueue();    // Recursively continue processing the queue
                    });
            }
            // Introduce a small delay to prevent a tight loop when waiting for workers
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        this.processing = false;
    }
}
