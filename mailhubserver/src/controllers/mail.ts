import { Request, Response, NextFunction } from 'express';
import QueueSystemInstance from '../queue/QueueSystem';

export const mail = async (req: Request, res: Response, next: NextFunction) => {
  const { recipients, subject, text, mailId, mailPassword } = req.body;

  try {
    const producer = QueueSystemInstance.getProducer();

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
  } catch (error) {
    console.log(`Error sending mail : ${error}, body : ${req.body}`);
    next(error);
  }
};
