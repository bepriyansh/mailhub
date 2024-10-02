import EmailProcessor from "./EmailProcessor";
import MessageQueue from "./MessageQueue";
import Producer from "./Producer";

class QueueSystem {
    private static instance: QueueSystem;
    private emailProcessor!: EmailProcessor;
    private messageQueue!: MessageQueue;
    private producer!: Producer;

    constructor() {
        if (QueueSystem.instance) {
            return QueueSystem.instance;
        }

        this.emailProcessor = new EmailProcessor();
        const numberOfDLQs = 3;
        const dlqChain = this.createDLQChain(this.emailProcessor, 5, numberOfDLQs);
        this.messageQueue = new MessageQueue(this.emailProcessor, 5, dlqChain);
        this.producer = new Producer(this.messageQueue);

        QueueSystem.instance = this;
    }

    getProducer(): Producer {
        return this.producer;
    }

    private createDLQChain(processor: EmailProcessor, concurrency: number, numberOfDLQs: number): MessageQueue | null {
        let prevDLQ: MessageQueue | null = null;
        for (let i = 0; i < numberOfDLQs; i++) {
            const retryDelay = Math.pow(3, numberOfDLQs - i) * 1000;
            console.log(`Retry no. ${numberOfDLQs - i}: Delay ${retryDelay / 1000} secs`);
            const curDLQ: MessageQueue  = new MessageQueue(processor, concurrency, prevDLQ, retryDelay);
            prevDLQ = curDLQ;
        }
        return prevDLQ;
    }
}

const QueueSystemInstance = new QueueSystem();
Object.freeze(QueueSystemInstance);

export default QueueSystemInstance;
