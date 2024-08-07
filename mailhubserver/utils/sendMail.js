import nodemailer from "nodemailer"

export const sendEmail = async (job) => {
  const { to, subject, text, mailId, mailPassword } = job.data;

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    auth: {
      user: mailId,
      pass: mailPassword,
    },
  });

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
