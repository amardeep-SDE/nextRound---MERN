import { Schedule } from "../models/schedule.model.js";

// POST - Add New Schedule
export const createSchedule = async (req, res) => {
  try {
    const { date, day, company, role, rounds, topics, result, mode, place } =
      req.body;

    // Optional: You can access logged-in user via req.user or req.userId
    const newSchedule = await new Schedule({
      date,
      day,
      company,
      role,
      rounds,
      topics,
      result,
      mode,
      place,
    });

    await newSchedule.save();
    return res
      .status(201)
      .json({
        success: true,
        message: "Schedule added successfully",
        schedule: newSchedule,
      });
  } catch (error) {
    console.error("Error adding schedule:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

export const getAllSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find();
    return res
      .status(200)
      .json({
        success: true,
        message: "Schedules fetched successfully",
        schedules,
      });
  } catch (error) {
    console.error("Error fetching schedules:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

export const deleteSchedule = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedSchedule = await Schedule.findByIdAndDelete(id);

    if (!deletedSchedule) {
      return res
        .status(404)
        .json({ success: false, message: "Schedule not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Schedule deleted successfully" });
  } catch (error) {
    console.error("Error deleting schedule:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
