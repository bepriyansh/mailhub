import { addEmailToQueue } from "../producer.js";

export const mail = async (req, res, next) => {
    const {
        recipients,
        subject,
        text,
        mailId,
        mailPassword } = req.body;
    try {
        for (let i = 0; i < recipients.length; i++) {
            const mailData = {
                to: recipients[i],
                subject,
                text,
                mailId,
                mailPassword
            }
            addEmailToQueue(mailData);
        }
        res.status(200).json({ message: "sent" });
    } catch (error) {
        next(error);
        console.log(error)
    }
}