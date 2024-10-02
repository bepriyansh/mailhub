import MessageProcessor, { Message } from "./MessageProcessor";
export default class EmailProcessor extends MessageProcessor {
    process(message: Message): Promise<void>;
}
