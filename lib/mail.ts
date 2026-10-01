// lib/mail.ts
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true, // true for port 465 (SSL), false for port 587 (TLS)
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendApprovalEmail(toEmail: string, name: string, username: string, pin: string) {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: toEmail,
      subject: "Your AgriLab Account Has Been Approved! 🎉",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 10px;">
          <h2 style="color: #16a34a;">Welcome to AgriLab, ${name}!</h2>
          <p>Your registration request has been reviewed and <strong>approved</strong> by the administrator.</p>
          <p>Below are your secure login credentials generated for the platform:</p>
          
          <div style="background-color: #f9fafb; padding: 15px; border-radius: 8px; margin: 20px 0; border: 1px solid #f3f4f6;">
            <p style="margin: 5px 0;"><strong>Assigned Username:</strong> <span style="color: #2563eb; font-family: monospace; font-size: 16px;">${username}</span></p>
            <p style="margin: 5px 0;"><strong>Your Personal PIN:</strong> <span style="color: #dc2626; font-family: monospace; font-size: 16px;">${pin}</span></p>
          </div>

          <p>You can now log back into your account and access all platform features.</p>
          <p style="margin-top: 30px; font-size: 12px; color: #6b7280;">If you didn't request this, please ignore this email.</p>
        </div>
      `,
    });
    console.log("Approval email sent successfully to:", toEmail);
  } catch (error) {
    console.error("Failed to send approval email:", error);
    throw new Error("Email dispatch failed.");
  }
}