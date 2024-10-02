"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mail_1 = require("../controllers/mail");
const router = express_1.default.Router();
router.post('/mail', mail_1.mail);
exports.default = router;
//# sourceMappingURL=mail.js.map