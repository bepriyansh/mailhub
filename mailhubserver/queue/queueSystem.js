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
        this.messageQueue = new MessageQueue(this.emailProcessor, 5);  // Concurrency limit set to 5
        this.producer = new Producer(this.messageQueue);

        QueueSystem.instance = this;
        return this;
    }

    // Method to access the producer
    getProducer() {
        return this.producer;
    }
}

const instance = new QueueSystem();
Object.freeze(instance);  // Freeze the instance to prevent modification

export default instance;
