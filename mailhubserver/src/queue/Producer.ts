/*
    The Producer class is responsible for creating and adding messages to the queue.
    It creates a message object with an ID, data, and optional delay and sends it to the queue.
*/


import { Message } from "./MessageProcessor";
import MessageQueue from "./MessageQueue";

export default class Producer {
    private queue: MessageQueue;

    constructor(queue: MessageQueue) {
        this.queue = queue;
    }

    produce(data: any): void {
        const message: Message = {
            id: Date.now(),
            data: data,
            delay: 0
        };
        this.queue.addMessage(message);
        console.log(`Message added to queue. ID: ${message.id}`);
    }
}
