"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class MessageQueue {
    constructor(processor, concurrency = 5, dlq = null, retryDelay = 500) {
        this.queue = [];
        this.activeWorkers = 0;
        this.processing = false;
        this.processor = processor;
        this.concurrency = concurrency;
        this.dlq = dlq;
        this.retryDelay = retryDelay;
    }
    addMessage(message) {
        this.queue.push(message);
        this.processQueue();
    }
    processQueue() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.processing)
                return;
            this.processing = true;
            while (this.queue.length > 0 || this.activeWorkers > 0) {
                while (this.activeWorkers < this.concurrency && this.queue.length > 0) {
                    const message = this.queue.shift();
                    this.activeWorkers++;
                    this.processor.process(message)
                        .then(() => {
                        console.log(`Message processed: ${message.id}`);
                    })
                        .catch((error) => {
                        if (this.dlq != null) {
                            console.log(`Message failed: ${message.id}`);
                            console.log(`Error: ${error.message}`);
                            console.log(`Retrying after ${this.retryDelay / 1000} secs`);
                            setTimeout(() => {
                                this.dlq.addMessage(message);
                            }, this.retryDelay);
                        }
                        else {
                            console.log(`Message failed: ${message.id}`);
                            console.log(`Error: ${error.message}`);
                        }
                    })
                        .finally(() => {
                        this.activeWorkers--;
                        this.processQueue();
                    });
                }
                yield new Promise(resolve => setTimeout(resolve, 100));
            }
            this.processing = false;
        });
    }
}
exports.default = MessageQueue;
//# sourceMappingURL=MessageQueue.js.map