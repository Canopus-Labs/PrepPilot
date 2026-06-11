const nodemailer = require("nodemailer");

/**
 * Creates the nodemailer transporter based on EMAIL_SERVICE env variable.
 * Supports "gmail", "ethereal", or any custom SMTP provider.
 * Set EMAIL_SERVICE in .env to switch between providers.
 */
console.log("EMAIL_SERVICE:", process.env.EMAIL_SERVICE);

const createTransporter = () => {
    const service = process.env.EMAIL_SERVICE?.toLowerCase();

    if (service === "gmail") {
        return nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // SSL — works on Render (port 587 is blocked)
            family: 4, // Force IPv4
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
    }

    if (service === "ethereal") {
        return nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            family: 4, // Force IPv4
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
    }

    // Custom SMTP — provider sets EMAIL_HOST, EMAIL_PORT themselves
    return nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT) || 587,
        secure: process.env.EMAIL_SECURE === "true",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        tls: {
            rejectUnauthorized: false,
        },
    });
};

const transporter = createTransporter();

/**
 * Send an email verification link to a newly registered user.
 * @param {string} toEmail - Recipient email address.
 * @param {string} verificationUrl - Full URL with token for email verification.
 */
const sendVerificationEmail = async (toEmail, verificationUrl) => {
    console.log("Attempting SMTP connection...");
    await transporter.sendMail({
        from: `"PrepPilot" <${process.env.EMAIL_USER}>`,
        to: toEmail,
        subject: "Verify your PrepPilot account",
        html: `
            <div style="font-family:sans-serif;max-width:480px;margin:auto;padding:32px 24px;background:#0f0f13;border-radius:16px;border:1px solid rgba(255,255,255,0.08)">
                <div style="margin-bottom:24px">
                    <h2 style="color:#ffffff;font-size:20px;margin:0 0 8px">Welcome to PrepPilot!</h2>
                    <p style="color:#9ca3af;font-size:14px;margin:0">Click the button below to verify your email address.</p>
                </div>
                <a href="${verificationUrl}"
                   style="display:inline-block;padding:12px 24px;background:linear-gradient(to right,#7c3aed,#3b82f6);color:#fff;border-radius:8px;text-decoration:none;font-weight:500;font-size:14px">
                    Verify my email
                </a>
                <p style="color:#6b7280;font-size:12px;margin-top:24px">
                    This link expires in <strong style="color:#9ca3af">24 hours</strong>. If you didn't create an account, you can ignore this email.
                </p>
            </div>
        `,
    });
    console.log("SMTP verified");
};

module.exports = { sendVerificationEmail };