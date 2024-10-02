"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EmailProcessor_1 = __importDefault(require("./EmailProcessor"));
const MessageQueue_1 = __importDefault(require("./MessageQueue"));
const Producer_1 = __importDefault(require("./Producer"));
class QueueSystem {
    constructor() {
        if (QueueSystem.instance) {
            return QueueSystem.instance;
        }
        this.emailProcessor = new EmailProcessor_1.default();
        const numberOfDLQs = 3;
        const dlqChain = this.createDLQChain(this.emailProcessor, 5, numberOfDLQs);
        this.messageQueue = new MessageQueue_1.default(this.emailProcessor, 5, dlqChain);
        this.producer = new Producer_1.default(this.messageQueue);
        QueueSystem.instance = this;
    }
    getProducer() {
        return this.producer;
    }
    createDLQChain(processor, concurrency, numberOfDLQs) {
        let prevDLQ = null;
        for (let i = 0; i < numberOfDLQs; i++) {
            const retryDelay = Math.pow(3, numberOfDLQs - i) * 1000;
            console.log(`Retry no. ${numberOfDLQs - i}: Delay ${retryDelay / 1000} secs`);
            const curDLQ = new MessageQueue_1.default(processor, concurrency, prevDLQ, retryDelay);
            prevDLQ = curDLQ;
        }
        return prevDLQ;
    }
}
const QueueSystemInstance = new QueueSystem();
Object.freeze(QueueSystemInstance);
exports.default = QueueSystemInstance;
//# sourceMappingURL=QueueSystem.js.map