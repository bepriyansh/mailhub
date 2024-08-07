import nodemailer from "nodemailer"

let transporter;
const createTransporter = (mailId, mailPassword) => {
  if (!transporter) {
    return nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      pool: true,
      auth: {
        user: mailId,
        pass: mailPassword,
      },
    });
  } else if (transporter.options.auth.user != mailId && transporter.options.auth.pass != mailPassword) {
    return nodemailer.createTransport({
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
}
export const sendEmail = async (job) => {

  const { to, subject, text, mailId, mailPassword } = job.data;
  transporter = createTransporter(mailId, mailPassword);

  const mailOptions = {
    from: mailId,
    to: to,
    subject: subject,
    text: text,
  };

  await transporter.sendMail(mailOptions)
    .catch((error) => {
      throw new Error(error);
    })
}
