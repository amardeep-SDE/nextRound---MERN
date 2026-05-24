// src/validations/validationSchemas.js
import { z } from "zod";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

export const signupSchema = z.object({
  username: z.string().min(4, "Name must be at least 4 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .regex(emailRegex, "Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
});

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .regex(emailRegex, "Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .regex(emailRegex, "Please enter a valid email address"),
});

export const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
