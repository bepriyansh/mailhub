/*
    EmailProcessor is a subclass of MessageProcessor.
    It implements the `process` method to simulate sending an email with a delay.
    This adheres to the Open/Closed Principle, allowing extension without modifying the MessageQueue.
*/


import { sendEmail } from "../utils/sendMail";
import MessageProcessor, { Message } from "./MessageProcessor";

export default class EmailProcessor extends MessageProcessor {
    async process(message: Message): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                sendEmail(message.data).then(resolve).catch(reject);
            }, message.delay || 0);
        });
    }
}
