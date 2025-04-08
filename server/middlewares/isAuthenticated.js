import express from "express";
export const isAuthenticated = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "User Unauthorized",
      });
    }
    // verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // check decoded token
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Invalid Token",
      });
    }
    req.id = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
};
