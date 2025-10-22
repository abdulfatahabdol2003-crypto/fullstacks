const nodemailer = require("nodemailer");

// Send verification email
exports.sendVerificationEmail = async (email, username, verificationToken) => {
  // Check if email credentials are configured
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.error("❌ Email credentials not found in .env file!");
    console.log("Please add EMAIL_USER and EMAIL_PASSWORD to your .env file");
    return { success: false, error: "Email service not configured" };
  }

  // Create transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const verificationUrl = `${process.env.BASE_URL}/auth/verify-email?token=${verificationToken}`;

  const mailOptions = {
    from: `"ONBOARD3" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verify Your Email - ONBOARD3",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            background-color: #0a0a0a;
            color: #ffffff;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 40px 20px;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
          }
          .logo {
            font-size: 32px;
            font-weight: bold;
            color: #39FF14;
            margin-bottom: 10px;
          }
          .content {
            background: rgba(20, 20, 20, 0.9);
            border: 1px solid rgba(57, 255, 20, 0.2);
            border-radius: 15px;
            padding: 30px;
          }
          h1 {
            color: #39FF14;
            font-size: 24px;
            margin-bottom: 20px;
          }
          p {
            line-height: 1.6;
            color: rgba(255, 255, 255, 0.9);
            margin-bottom: 20px;
          }
          .button {
            display: inline-block;
            padding: 15px 40px;
            background: #39FF14;
            color: #0a0a0a;
            text-decoration: none;
            border-radius: 10px;
            font-weight: bold;
            font-size: 16px;
            margin: 20px 0;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            color: rgba(255, 255, 255, 0.6);
            font-size: 14px;
          }
          .token {
            background: rgba(57, 255, 20, 0.1);
            padding: 15px;
            border-radius: 8px;
            font-family: monospace;
            word-break: break-all;
            margin: 20px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">ONBOARD3</div>
          </div>
          <div class="content">
            <h1>Welcome to ONBOARD3, ${username}! 🚀</h1>
            <p>Thank you for joining the future of Web3 development. We're excited to have you onboard!</p>
            <p>To complete your registration and activate your account, please verify your email address by clicking the button below:</p>
            
            <center>
              <a href="${verificationUrl}" class="button">Verify Email Address</a>
            </center>
            
            <p>Or copy and paste this link into your browser:</p>
            <div class="token">${verificationUrl}</div>
            
            <p><strong>This verification link will expire in 24 hours.</strong></p>
            
            <p>If you didn't create an account with ONBOARD3, please ignore this email.</p>
          </div>
          <div class="footer">
            <p>ONBOARD3 - Onboard. Educate. Build.</p>
            <p>Building the Future of Web3</p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ Verification email sent to:", email);
    return { success: true };
  } catch (error) {
    console.error("❌ Error sending email:", error.message);
    return { success: false, error: error.message };
  }
};

// Send welcome email after verification
exports.sendWelcomeEmail = async (email, username) => {
  // Check if email credentials are configured
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.error("❌ Email credentials not found in .env file!");
    return;
  }

  // Create transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const mailOptions = {
    from: `"ONBOARD3" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Welcome to ONBOARD3! 🎉",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            background-color: #0a0a0a;
            color: #ffffff;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 40px 20px;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
          }
          .logo {
            font-size: 32px;
            font-weight: bold;
            color: #39FF14;
            margin-bottom: 10px;
          }
          .content {
            background: rgba(20, 20, 20, 0.9);
            border: 1px solid rgba(57, 255, 20, 0.2);
            border-radius: 15px;
            padding: 30px;
          }
          h1 {
            color: #39FF14;
            font-size: 24px;
            margin-bottom: 20px;
          }
          p {
            line-height: 1.6;
            color: rgba(255, 255, 255, 0.9);
            margin-bottom: 15px;
          }
          .button {
            display: inline-block;
            padding: 15px 40px;
            background: #39FF14;
            color: #0a0a0a;
            text-decoration: none;
            border-radius: 10px;
            font-weight: bold;
            font-size: 16px;
            margin: 20px 0;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            color: rgba(255, 255, 255, 0.6);
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">ONBOARD3</div>
          </div>
          <div class="content">
            <h1>🎉 Your Account is Verified!</h1>
            <p>Hi ${username},</p>
            <p>Congratulations! Your email has been successfully verified and your ONBOARD3 account is now active.</p>
            <p>You're now part of a community building the future of Web3. Here's what you can do next:</p>
            <ul style="color: rgba(255, 255, 255, 0.9); line-height: 1.8;">
              <li>Complete quests and earn rewards</li>
              <li>Join hackathons and build real projects</li>
              <li>Connect with other Web3 builders</li>
              <li>Access exclusive learning resources</li>
            </ul>
            
            <center>
              <a href="${process.env.BASE_URL}" class="button">Start Building</a>
            </center>
            
            <p>Welcome aboard! 🚀</p>
          </div>
          <div class="footer">
            <p>ONBOARD3 - Onboard. Educate. Build.</p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ Welcome email sent to:", email);
  } catch (error) {
    console.error("❌ Error sending welcome email:", error.message);
  }
};