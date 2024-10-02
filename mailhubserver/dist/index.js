"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mail_1 = __importDefault(require("./routes/mail"));
const app = (0, express_1.default)();
const port = 8080;
app.use(express_1.default.json());
app.use(express_1.default.static('public'));
app.get('/', (req, res) => {
    res.send('Hello from Mailhub');
});
app.get("/keepalive", (req, res) => {
    const time = new Date(Date.now()).toLocaleString();
    console.log(time, "Keep Alive Ping");
    res.send(`${time} : Hello from Mailhub`);
});
app.use('/api/v1/', mail_1.default);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map