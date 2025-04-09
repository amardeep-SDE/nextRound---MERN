import express from "express";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";
import crypto from "crypto";
import cloudinary from "../utils/cloudinary.js";
import { generateVerificationCode } from "../utils/generateVerificationCode.js";
import { generateToken } from "../utils/generateToken.js";
import {
  sendPasswordResetEmail,
  sendResetSuccessEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../mail/email.js";
export const signup = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;

    console.log(req.body);

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exist with this email",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = generateVerificationCode();

    // const newUser = new User({
    //   username,
    //   email,
    //   phone,
    //   password: hashedPassword,
    // });

    const user = await User.create({
      username,
      email,
      phone,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
    });

    generateToken(res, user);
    await sendVerificationEmail(email, verificationToken);

    const userWithoutPassword = await User.findOne({ email }).select(
      "-password"
    );

    // await user.save();

    return res.status(201).json({
      success: true,
      message: "User created successfully!!",
      user: userWithoutPassword,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    generateToken(res, user);

    user.lastLogin = Date.now();
    await user.save();

    // send user data without password
    const userWithoutPassword = await User.findOne({ email }).select(
      "-password"
    );
    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: userWithoutPassword,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { verificationCode } = req.body;
    console.log("verificationCode", verificationCode);
    
    const user = await User.findOne({
      verificationToken: verificationCode,
      verificationTokenExpiresAt: { $gt: Date.now() },
    }).select("-password");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification code",
      });
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    // send welcome email to user
    await sendWelcomeEmail(user.email, user.username);
    return res
      .status(200)
      .json({ success: true, message: "Email verified successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = async (_, res) => {
  try {
    return res.clearCookie("token").status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const resetToken = crypto.randomBytes(32).toString("hex");
    // const hashedToken = CryptoJS.AES.encrypt(resetToken, process.env.SECRET_KEY).toString();
    const resetTokenExpiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    user.resetPasswordToken = resetToken;
    user.resetPasswordTokenExpiresAt = resetTokenExpiresAt;
    await user.save();

    // send email to user with reset token
    await sendPasswordResetEmail(
      user.email,
      `${process.env.FRONTEND_URL}/reset-password/${resetToken}`
    );

    return res.status(200).json({
      success: true,
      message: "Password reset token sent to email",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordTokenExpiresAt: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token",
      });
    }

    // update password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpiresAt = undefined;
    await user.save();

    //send success reset email
    await sendResetSuccessEmail(user.email);
    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({
      success: true,
      message: "User authenticated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.id;
    const { username, email, phone, address, profilePicture } = req.body;

    let cloudResponse;

    cloudResponse = await cloudinary.uploader.upload(profilePicture);
    const updatedData = { username, email, phone, address, profilePicture };

    const user = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    }).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
