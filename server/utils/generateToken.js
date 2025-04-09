import jwt from "jsonwebtoken";
import express from "express";
export const generateToken = (res, user) => {
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  });
  return token;
  // return res.status(200).json({
  //   success: true,
  //   message: "User logged in successfully",
  //   token,
  // });
};
