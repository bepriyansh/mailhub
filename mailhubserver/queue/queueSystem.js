import EmailProcessor from "./EmailProcessor.js";
import MessageQueue from "./MessageQueue.js";
import Producer from "./Producer.js";

class QueueSystem {
    constructor() {
        if (QueueSystem.instance) {
            return QueueSystem.instance;
        }

        // Initialize the processor, queue, and producer once
        this.emailProcessor = new EmailProcessor();

        
        // Function to create a chain of DLQs
        function createDLQChain(processor, concurrency, numberOfDLQs) {
            let n = numberOfDLQs;
            let prevDLQ = null;
            for (let i = 0; i < n; i++) {
            const retryDelay = (3**(n-i))*1000;
            if(prevDLQ)console.log(`Retry no. ${n-i} : ${retryDelay/1000} secs`)
            const curDLQ = new MessageQueue(processor, concurrency, prevDLQ, retryDelay);
            prevDLQ = curDLQ;
            }
            return prevDLQ;
        }

        const numberOfDLQs = 4;
        const dlqChain = createDLQChain(this.emailProcessor, 5, numberOfDLQs);
                
        this.messageQueue = new MessageQueue(this.emailProcessor, 5, dlqChain);
        this.producer = new Producer(this.messageQueue);

        QueueSystem.instance = this;
        return this;
    }
  

    // Method to access the producer
    getProducer() {
        return this.producer;
    }
}

const QueueSystemInstance = new QueueSystem();
Object.freeze(QueueSystemInstance);  // Freeze the instance to prevent modification

export default QueueSystemInstance;
