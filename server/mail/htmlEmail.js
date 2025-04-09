export const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Email Verification</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f2f2f2;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    }
    .header {
      background: linear-gradient(90deg, #4e54c8, #8f94fb);
      padding: 30px;
      color: #ffffff;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
    }
    .content {
      padding: 30px 40px;
      text-align: center;
    }
    .content h2 {
      color: #333333;
      margin-bottom: 10px;
    }
    .content p {
      color: #555555;
      font-size: 16px;
      line-height: 1.6;
      margin: 0 0 20px;
    }
    .code-box {
      display: inline-block;
      padding: 12px 24px;
      font-size: 24px;
      font-weight: bold;
      background-color: #eaf0ff;
      color: #4e54c8;
      border: 2px dashed #8f94fb;
      border-radius: 8px;
      margin: 20px 0;
    }
    .footer {
      text-align: center;
      padding: 20px;
      font-size: 13px;
      color: #999999;
      background-color: #f9f9f9;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Email Verification</h1>
    </div>
    <div class="content">
      <h2>Hello,</h2>
      <p>
        Thank you for signing up with us! To complete your registration, please use the following verification code:
      </p>
      <div class="code-box">{verificationToken}</div>
      <p>If you didn’t request this code, you can safely ignore this email.</p>
    </div>
    <div class="footer">
     &copy; 2025 NextRound. Developed & Designed with ❤️ in India.
    </div>
  </div>
</body>
</html>
`;

export const generateWelcomeEmailHtml = (name) => {
    return `
          <html>
            <head>
              <style>
                .email-container {
                  font-family: Arial, sans-serif;
                  line-height: 1.6;
                  color: #333;
                  padding: 20px;
                  background-color: #f4f4f4;
                  border-radius: 10px;
                  max-width: 600px;
                  margin: auto;
                }
                .email-header {
                  background-color: #4CAF50;
                  color: white;
                  padding: 10px;
                  text-align: center;
                  border-radius: 10px 10px 0 0;
                }
                .email-body {
                  padding: 20px;
                  background-color: white;
                  border-radius: 0 0 10px 10px;
                }
                .email-footer {
                  text-align: center;
                  padding: 10px;
                  font-size: 12px;
                  color: #777;
                }
              </style>
            </head>
            <body>
              <div class="email-container">
                <div class="email-header">
                  <h1>Welcome to nextRound!</h1>
                </div>
                <div class="email-body">
                  <p>Hi ${name},</p>
                  <p>Congratulations! Your email has been successfully verified.</p>
                  <p>We are excited to have you on board at nextRound. Explore our platform and enjoy our services.</p>
                  <p>If you have any questions or need assistance, feel free to reach out to us.</p>
                  <p>Best Regards,<br/>The nextRound Team</p>
                </div>
                <div class="email-footer">
                  <p>&copy; 2025 nextRound. All rights reserved.</p>
                </div>
              </div>
            </body>
          </html>
        `;
};

export const generatePasswordResetEmailHtml = (resetURL) => {
    return `
      <html>
        <head>
          <style>
            .email-container {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              padding: 20px;
              background-color: #f4f4f4;
              border-radius: 10px;
              max-width: 600px;
              margin: auto;
            }
            .email-header {
              background-color: #d9534f;
              color: white;
              padding: 10px;
              text-align: center;
              border-radius: 10px 10px 0 0;
            }
            .email-body {
              padding: 20px;
              background-color: white;
              border-radius: 0 0 10px 10px;
            }
            .email-footer {
              text-align: center;
              padding: 10px;
              font-size: 12px;
              color: #777;
            }
            .button {
              display: inline-block;
              padding: 10px 20px;
              margin: 20px 0;
              font-size: 16px;
              color: white;
              background-color: #ffffff;
              text-decoration: none;
              border-radius: 5px;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="email-header">
              <h1>Reset Your Password</h1>
            </div>
            <div class="email-body">
              <p>Hi,</p>
              <p>We received a request to reset your password. Click the button below to reset it.</p>
              <a href="${resetURL}" class="button">Reset Password</a>
              <p>If you didn't request a password reset, please ignore this email.</p>
              <p>Thank you,<br/>The nextRound Team</p>
            </div>
            <div class="email-footer">
              <p>&copy; 2025 nextRound. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `;
  };

  export const generateResetSuccessEmailHtml = () => {
    return `
      <html>
        <head>
          <style>
            .email-container {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              padding: 20px;
              background-color: #f4f4f4;
              border-radius: 10px;
              max-width: 600px;
              margin: auto;
            }
            .email-header {
              background-color: #4CAF50;
              color: white;
              padding: 10px;
              text-align: center;
              border-radius: 10px 10px 0 0;
            }
            .email-body {
              padding: 20px;
              background-color: white;
              border-radius: 0 0 10px 10px;
            }
            .email-footer {
              text-align: center;
              padding: 10px;
              font-size: 12px;
              color: #777;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="email-header">
              <h1>Password Reset Successful</h1>
            </div>
            <div class="email-body">
              <p>Hi,</p>
              <p>Your password has been successfully reset. You can now log in with your new password.</p>
              <p>If you did not request this change, please contact our support team immediately.</p>
              <p>Thank you,<br/>The nextRound Team</p>
            </div>
            <div class="email-footer">
              <p>&copy; 2025 nextRound. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `;
  };