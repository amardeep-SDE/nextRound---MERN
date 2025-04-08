import {
  generatePasswordResetEmailHtml,
  generateResetSuccessEmailHtml,
  generateWelcomeEmailHtml,
  htmlContent,
} from "./htmlEmail.js  ";
import { client, sender } from "./mailtrap.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];

  try {
    const res = await client.send({
      from: sender,
      to: recipient,
      subject: "Verify your email..!",
      html: htmlContent.replace("{verificationToken}", verificationToken),
      category: "Email Verification",
    });
  } catch (error) {
    throw new Error("Failed to send verification email: " + error.message);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  const recipient = [{ email }];
  const htmlContent = generateWelcomeEmailHtml(name);

  try {
    const res = await client.send({
      from: sender,
      to: recipient,
      subject: "Welcome to Amardeep",
      html: htmlContent,
      template_variables: {
        company_info_name: "Amardeep",
        name: name,
      },
    });
  } catch (error) {
    throw new Error("Failed to send welcome email: " + error.message);
  }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
  const htmlContent = generatePasswordResetEmailHtml(resetURL);

  const recipient = [{ email }];
  try {
    const res = await client.send({
      from: sender,
      to: recipient,
      subject: "Reset your password",
      html: htmlContent,
      category: "Reset Password",
    });
  } catch (error) {
    throw new Error("Failed to reset password: " + error.message);
  }
};

export const sendResetSuccessEmail = async (email) => {
  const htmlContent = generateResetSuccessEmailHtml();

  const recipient = [{ email }];
  try {
    const res = await client.send({
      from: sender,
      to: recipient,
      subject: "Password Reset Successfully",
      html: htmlContent,
      category: "Password Reset",
    });
  } catch (error) {
    throw new Error(
      "Failed to send password reset success email: " + error.message
    );
  }
};
