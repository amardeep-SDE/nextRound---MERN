import mongoose from "mongoose";

const topicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    default: "",
  },
});

const scheduleSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
    },
    day: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    rounds: {
      type: [String],
      enum: ["Technical", "Machine", "HR"],
      default: [],
    },
    topics: {
      type: [topicSchema],
      default: [],
    },
    result: {
      type: String,
      enum: ["Selected", "Rejected", "On Hold"],
      required: true,
    },
    mode: {
      type: String,
      enum: ["Online", "Offline"],
      required: true,
    },
    place: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true, // adds createdAt, updatedAt
  }
);

export const Schedule = mongoose.model("Schedule", scheduleSchema);
export const Topic = mongoose.model("Topic", topicSchema);