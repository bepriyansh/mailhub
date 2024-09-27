import QueueSystemInstance from "../queue/queueSystem.js";

export const mail = async (req, res, next) => {
    const {
        recipients,
        subject,
        text,
        mailId,
        mailPassword 
    } = req.body;

    try {
        // Get the producer from the QueueSystem singleton
        const producer = QueueSystemInstance.getProducer();

        for (let i = 0; i < recipients.length; i++) {
            const mailData = {
                to: recipients[i],
                subject,
                text,
                mailId,
                mailPassword
            }
            // Add email to the queue via the producer
            producer.produce(mailData);
        }

        res.status(200).json({ message: "sent" });
    } catch (error) {
        console.log(`Error sending mail : ${error}, body : ${req.body}`);
        next(error)
    }
};
