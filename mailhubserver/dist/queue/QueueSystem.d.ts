import Producer from "./Producer";
declare class QueueSystem {
    private static instance;
    private emailProcessor;
    private messageQueue;
    private producer;
    constructor();
    getProducer(): Producer;
    private createDLQChain;
}
declare const QueueSystemInstance: QueueSystem;
export default QueueSystemInstance;
