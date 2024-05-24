import nodemailer from "nodemailer";

interface EmailOptions {
  name: string;
  to: string;
  subject: string;
  html: string;
  mailId: string;
  mailPassword: string;
}

async function sendEmail(options: EmailOptions): Promise<void> {
  try {
    // Create a transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      auth: {
        user: options.mailId,
        pass: options.mailPassword,
      },
    });

    // Define email message
    const mailOptions = {
      from: `${options.name} ${process.env.MailId}`,
      to: options.to,
      subject: options.subject,
      html: options.html,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

export default sendEmail;
