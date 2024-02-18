import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";
import User from "@/models/userModel";

export async function sendMail({ email, userId, emailType }: any) {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    if (emailType === "VERIFY") {
      let data = {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      };

      await User.findByIdAndUpdate(userId, data, {
        new: true,
        runValidators: true,
      });
    } else if (emailType === "FORGOTPASSWORD") {
      let data = {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      };

      await User.findByIdAndUpdate(userId, data, {
        new: true,
        runValidators: true,
      });
    }
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "98608ec820a7d7",
        pass: "448e211eeec0ce",
      },
    });
    const mailOptions = {
      from: "sakshampardeshi6610@gmail.com",
      to: email,
      subject:
        emailType === "VERFIY" ? "Verify Your Email" : "Reset Your Password",
      html: `<p>Click <a href="${
        process.env.domain
      }/verifyemail?token=${hashedToken}">here</a>to ${
        emailType === "VERIFY" ? "VERIFY YOUR EMAIL" : "Reset your email"
      } copy paste the link in your browser </p>`,
    };
    const mailResponse=await transporter.sendMail(mailOptions);
    return mailResponse
  } catch (error: any) {
    throw new Error(error.message);
  }
}
