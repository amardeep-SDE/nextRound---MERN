import jwt from "jsonwebtoken";
import express from "express";
export const generateToken = (res, user) => {
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 3600000, // 1 hour
  });
  return token;
  // return res.status(200).json({
  //   success: true,
  //   message: "User logged in successfully",
  //   token,
  // });
};
