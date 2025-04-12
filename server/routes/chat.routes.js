import express from "express";
import { sendMessage, getMessage } from "../controllers/message.controller.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js"; // this should extract `req.id`

const router = express.Router();

// POST /api/message/send/:id -> send message to user with :id
router.post("/send/:id", isAuthenticated, sendMessage);

// GET /api/v1/message/:id -> get messages between current user and user with :id
router.get("/:id", isAuthenticated, getMessage);
// router.get("/:id", getMessage);


export default router;
