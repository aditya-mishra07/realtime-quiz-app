import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import {
  verifyPasswordTokenModel,
  verifyTokenUpdateModel,
} from "../../models/auth.model";
type sendEmailType = {
  email: string;
  emailType: String;
  userId: number;
};

export const sendEmail = async ({
  email,
  emailType,
  userId,
}: sendEmailType) => {
  try {
    const hashedToken = await bcrypt.hash(userId.toString(), 10);
    const tokenExpiryDate = new Date(Date.now() + 3600000);

    if (emailType === "VERIFY") {
      await verifyTokenUpdateModel(userId, hashedToken, tokenExpiryDate);
    } else if (emailType === "RESET") {
      await verifyPasswordTokenModel(userId, hashedToken, tokenExpiryDate);
    }

    // Looking to send emails in production? Check out our Email API/SMTP product!
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "f3fb30d9b8f56a",
        pass: "84272f5fb29bac",
      },
    });

    const mailOptions = {
      from: "mishra.adi2005@gmail.com",
      to: email.toString(),
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="http://localhost:5173/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }</p>`,
    };

    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
