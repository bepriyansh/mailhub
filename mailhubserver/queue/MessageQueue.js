/*
    The MessageQueue class manages the queue and ensures that messages are processed
    with a concurrency limit (number of parallel tasks). 
    It delegates message processing to an injected processor, following the Dependency Inversion Principle.
*/

export default class MessageQueue {
    constructor(processor, concurrency = 5) {
        this.queue = [];                                // Queue to hold messages to be processed
        this.concurrency = concurrency;                 // Max number of parallel tasks
        this.activeWorkers = 0;                         // Track how many workers are currently active
        this.processing = false;                        // Indicates if the queue is being processed
        this.processor = processor;                     // Injected message processor (e.g., EmailProcessor)
    }

    // Adds a message to the queue and starts processing if it's not already running.
    addMessage(message) {
        this.queue.push(message);
        this.processQueue();
    }

    
    async processQueue() {
        if (this.processing) return;
        this.processing = true;  

        // Keep processing as long as there are messages or active workers
        while (this.queue.length > 0 || this.activeWorkers > 0) {
            // Check if more workers can be started based on concurrency limit
            while (this.activeWorkers < this.concurrency && this.queue.length > 0) {
                const message = this.queue.shift();
                this.activeWorkers++;
                
                this.processor.process(message)
                    .then(() => {
                        console.log(`Message processed: ${message.id}`);
                    })
                    .catch((error) => {
                        console.log(`Message failed: ${message.id}, Error: ${error.message}`);
                    })
                    .finally(() => {
                        this.activeWorkers--;
                        this.processQueue();         // Recursively continue processing the queue
                    });
            }

            // Introduce a small delay to prevent a tight loop when waiting for workers
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        this.processing = false;
    }
}
