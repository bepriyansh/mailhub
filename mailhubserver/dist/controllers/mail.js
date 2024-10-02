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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mail = void 0;
const QueueSystem_1 = __importDefault(require("../queue/QueueSystem"));
const mail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { recipients, subject, text, mailId, mailPassword } = req.body;
    try {
        const producer = QueueSystem_1.default.getProducer();
        for (let i = 0; i < recipients.length; i++) {
            const mailData = {
                to: recipients[i],
                subject,
                text,
                mailId,
                mailPassword,
            };
            producer.produce(mailData);
        }
        res.status(200).json({ message: 'sent' });
    }
    catch (error) {
        console.log(`Error sending mail : ${error}, body : ${req.body}`);
        next(error);
    }
});
exports.mail = mail;
//# sourceMappingURL=mail.js.map