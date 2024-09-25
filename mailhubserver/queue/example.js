import EmailProcessor from "./EmailProcessor.js";
import MessageQueue from "./MessageQueue.js";
import Producer from "./Producer.js";

// Create a message processor (EmailProcessor)
const emailProcessor = new EmailProcessor();

// Create a message queue with a concurrency limit of 5
const messageQueue = new MessageQueue(emailProcessor, 5);

// Create a producer to add messages to the queue
const producer = new Producer(messageQueue);

// Add messages to the queue

for(let i = 1; i <= 20; i++){
    producer.produce(`Email ${i}`);
}
