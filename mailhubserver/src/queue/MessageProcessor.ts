/*
    Base class to define the message processing interface
    This follows the Single Responsibility and Dependency Inversion principles.
    Every processor must implement the `process` method.
*/

export interface Message {
    id: number;
    data: any;
    delay?: number;
}

export default abstract class MessageProcessor {
    /*
        Abstract method to be implemented by subclasses.
        Throws an error if a subclass does not implement it.
    */
    abstract process(message: Message): Promise<void>;
}
