"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Producer {
    constructor(queue) {
        this.queue = queue;
    }
    produce(data) {
        const message = {
            id: Date.now(),
            data: data,
            delay: 0
        };
        this.queue.addMessage(message);
        console.log(`Message added to queue. ID: ${message.id}`);
    }
}
exports.default = Producer;
//# sourceMappingURL=Producer.js.map