import MessageProcessor, { Message } from "./MessageProcessor";
export default class MessageQueue {
    private queue;
    private concurrency;
    private activeWorkers;
    private processing;
    private processor;
    private retryDelay;
    private dlq;
    constructor(processor: MessageProcessor, concurrency?: number, dlq?: MessageQueue | null, retryDelay?: number);
    addMessage(message: Message): void;
    private processQueue;
}
