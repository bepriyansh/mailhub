"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const QueueSystem_1 = __importDefault(require("./QueueSystem"));
const producer = QueueSystem_1.default.getProducer();
const id = setInterval(() => {
    for (let i = 1; i <= 5; i++) {
        producer.produce(`Email ${i}`);
    }
}, 5000);
setTimeout(() => clearInterval(id), 31000);
//# sourceMappingURL=test.js.map