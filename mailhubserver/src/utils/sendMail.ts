import nodemailer, { Transporter, SendMailOptions } from "nodemailer";

let transporter: Transporter | undefined;

const createTransporter = (mailId: string, mailPassword: string): Transporter => {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      pool: true,
      auth: {
        user: mailId,
        pass: mailPassword,
      },
    });
  } else if (
    (transporter as any).options.auth?.user !== mailId || 
    (transporter as any).options.auth?.pass !== mailPassword
  ) {
    transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      pool: true,
      auth: {
        user: mailId,
        pass: mailPassword,
      },
    });
  }

  return transporter!;
};

export const sendEmail = async (job: { data: { to: string; subject: string; text: string; mailId: string; mailPassword: string; } }) => {
  const { to, subject, text, mailId, mailPassword } = job.data;
  transporter = createTransporter(mailId, mailPassword);

  const mailOptions: SendMailOptions = {
    from: mailId,
    to: to,
    subject: subject,
    text: text,
  };

  if (!transporter) {
    throw new Error("Transporter is not defined.");
  }

  await transporter.sendMail(mailOptions).catch((error) => {
    throw new Error(error);
  });
};
