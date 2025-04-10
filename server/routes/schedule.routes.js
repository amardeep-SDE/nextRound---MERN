import express from "express";
import {
  createSchedule,
  getAllSchedules,
  deleteSchedule
} from "../controllers/schedule.controller.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

// router.post("/schedule", isAuthenticated, createSchedule);
router.route("/schedule").post(isAuthenticated, createSchedule);
router.route("/schedules").get(isAuthenticated, getAllSchedules);
router.route("/schedule/:id").delete(isAuthenticated, deleteSchedule);

export default router;