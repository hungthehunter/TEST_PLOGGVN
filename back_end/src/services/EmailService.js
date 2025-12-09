const nodemailer = require("nodemailer");
const dotenv = require('dotenv');
dotenv.config();

const sendEmailCreateUser = async (email) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_ACCOUNT,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  // Link kích hoạt (Ví dụ trỏ về trang login)
  const activationLink = `${process.env.URL_FRONTEND || 'http://localhost:5173'}/login`;

  // Chuyển đổi từ React EmailTemplate sang HTML string
  const mainContent = `
    <div style="background-color: #f3f4f6; min-height: 100vh; padding: 20px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; display: flex; justify-content: center; align-items: center;">
      
      <div style="background-color: #ffffff; width: 100%; max-width: 600px; margin: 0 auto; padding: 40px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); text-align: center;">
        
        <h2 style="color: #1f2937; font-weight: 700; margin-bottom: 24px; font-size: 24px;">
          You're almost there! Just confirm your email
        </h2>

        <p style="color: #6b7280; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
          You've successfully created a <strong>PloggVN</strong> account. To activate it, please click below to verify your email address.
        </p>

        <div style="margin-bottom: 30px;">
          <a href="${activationLink}" style="background-color: #14b8a6; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 15px; display: inline-block;">
            Activate Your Account
          </a>
        </div>

        <div style="text-align: left; margin-top: 40px; color: #6b7280; font-size: 14px;">
          <p style="margin: 0;">Cheers,</p>
          <p style="margin: 0; font-weight: 600; color: #374151;">The PloggVN team</p>
        </div>

        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          
          <div style="margin-bottom: 15px;">
            <a href="#" style="color: #6b7280; text-decoration: none; margin: 0 10px; font-weight: 600;">Facebook</a>
            <a href="#" style="color: #6b7280; text-decoration: none; margin: 0 10px; font-weight: 600;">Twitter/X</a>
            <a href="#" style="color: #6b7280; text-decoration: none; margin: 0 10px; font-weight: 600;">Instagram</a>
            <a href="#" style="color: #6b7280; text-decoration: none; margin: 0 10px; font-weight: 600;">LinkedIn</a>
          </div>

          <p style="font-size: 12px; color: #9ca3af; margin: 0;">
            <a href="#" style="color: #14b8a6; text-decoration: none;">Unsubscribe</a>
            •
            <a href="#" style="color: #14b8a6; text-decoration: none;">Unsubscribe Preferences</a>
          </p>
        </div>

      </div>
    </div>
  `;

  try {
    const info = await transporter.sendMail({
      from: process.env.MAIL_ACCOUNT,
      to: email,
      subject: "Welcome to PloggVN - Please confirm your email",
      text: "You've successfully created a PloggVN account.", // Fallback cho email không đọc HTML
      html: mainContent,
    });
    console.log("Activation email sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email: ", error);
  }
};

module.exports = {
  sendEmailCreateUser
};