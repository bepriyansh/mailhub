/*
    Base class to define the message processing interface
    This follows the Single Responsibility and Dependency Inversion principles.
    Every processor must implement the `process` method.
*/

export default class MessageProcessor {
    /*
        Abstract method to be implemented by subclasses.
        Throws an error if a subclass does not implement it.
    */
    async process(message) {
        throw new Error("process() must be implemented");
    }
}