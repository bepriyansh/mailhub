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
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
let transporter;
const createTransporter = (mailId, mailPassword) => {
    var _a, _b;
    if (!transporter) {
        transporter = nodemailer_1.default.createTransport({
            service: "Gmail",
            host: "smtp.gmail.com",
            pool: true,
            auth: {
                user: mailId,
                pass: mailPassword,
            },
        });
    }
    else if (((_a = transporter.options.auth) === null || _a === void 0 ? void 0 : _a.user) !== mailId ||
        ((_b = transporter.options.auth) === null || _b === void 0 ? void 0 : _b.pass) !== mailPassword) {
        transporter = nodemailer_1.default.createTransport({
            service: "Gmail",
            host: "smtp.gmail.com",
            pool: true,
            auth: {
                user: mailId,
                pass: mailPassword,
            },
        });
    }
    return transporter;
};
const sendEmail = (job) => __awaiter(void 0, void 0, void 0, function* () {
    const { to, subject, text, mailId, mailPassword } = job.data;
    transporter = createTransporter(mailId, mailPassword);
    const mailOptions = {
        from: mailId,
        to: to,
        subject: subject,
        text: text,
    };
    if (!transporter) {
        throw new Error("Transporter is not defined.");
    }
    yield transporter.sendMail(mailOptions).catch((error) => {
        throw new Error(error);
    });
});
exports.sendEmail = sendEmail;
//# sourceMappingURL=sendMail.js.map