/*
    The Producer class is responsible for creating and adding messages to the queue.
    It creates a message object with an ID, data, and optional delay and sends it to the queue.
*/

export default class Producer {
    constructor(queue) {
        this.queue = queue;  // The message queue to which messages will be added
    }

    // Creates a message object with a unique ID and a delay, then adds it to the queue.
    produce(mailData) {
        const message = {
            id: Date.now(),       // Use current timestamp as a unique ID for the message
            data: mailData,       // The content of the message (email content)
            delay: 2000,          // Optional delay before processing the message
        };
        this.queue.addMessage(message);  // Add the message to the queue
        console.log(`Message added to queue. ID: ${message.id}`);
    }
}
