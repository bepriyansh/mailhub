import nodemailer from "nodemailer"

export const sendEmail = async (job) => {
  const { to, subject, text, mailId, mailPassword } = job.data;
  try {
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

    await transporter.sendMail(mailOptions).then(() => {
      console.log("Email sent successfully")
    }).catch((error) => {
      console.log("Error sending mail")
      console.log(error)
    })
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
