import MessageQueue from "./MessageQueue";
export default class Producer {
    private queue;
    constructor(queue: MessageQueue);
    produce(data: any): void;
}
