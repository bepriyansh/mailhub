export interface Message {
    id: number;
    data: any;
    delay?: number;
}
export default abstract class MessageProcessor {
    abstract process(message: Message): Promise<void>;
}
