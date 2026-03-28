import React, { useState } from "react";
import useSchedule from "../hooks/useSchedule";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FiLoader } from "react-icons/fi";

const ROUND_OPTIONS = ["Technical", "Machine", "HR"];
const ROLE_OPTIONS = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
];

const AddSchedule = () => {
  const { addSchedule, loading } = useSchedule();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    date: "",
    day: "",
    company: "",
    role: "",
    rounds: [],
    topics: [{ id: Date.now(), title: "", details: "" }],
    result: "",
    mode: "Online",
    place: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "date") {
      const day = new Date(value + "T00:00:00").toLocaleDateString("en-US", {
        weekday: "long",
      });
      setFormData((prev) => ({ ...prev, date: value, day }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCheckboxChange = (round) => {
    setFormData((prev) => ({
      ...prev,
      rounds: prev.rounds.includes(round)
        ? prev.rounds.filter((r) => r !== round)
        : [...prev.rounds, round],
    }));
  };

  const handleTopicChange = (index, field, value) => {
    const updatedTopics = formData.topics.map((topic, i) =>
      i === index ? { ...topic, [field]: value } : topic
    );
    setFormData((prev) => ({ ...prev, topics: updatedTopics }));
  };

  const addTopic = () => {
    setFormData((prev) => ({
      ...prev,
      topics: [...prev.topics, { id: Date.now(), title: "", details: "" }],
    }));
  };

  const removeTopic = (index) => {
    if (formData.topics.length === 1) return;
    const updatedTopics = formData.topics.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, topics: updatedTopics }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.rounds.length === 0) {
      toast.error("Select at least one round");
      return;
    }

    const emptyTopic = formData.topics.some((t) => t.title.trim() === "");
    if (emptyTopic) {
      toast.error("Fill all topic titles");
      return;
    }

    try {
      const schedule = await addSchedule(formData);
      if (schedule) {
        toast.success("Schedule Added!");
        navigate("/schedule");
      } else {
        toast.error("Failed!");
      }
    } catch (err) {
      toast.error("Error occurred");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#020617] text-white p-4 sm:p-8">
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-xl p-6 sm:p-10 rounded-2xl shadow-2xl border border-white/10">

        <h2 className="text-3xl font-bold mb-8 text-center">
          <span className="bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-500 bg-clip-text text-transparent">
            Add Interview Schedule
          </span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Date Card */}
          <div className="bg-white/5 p-5 rounded-xl border border-white/10">
            <h3 className="text-lg mb-3 text-purple-300 font-semibold">Schedule Date</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="p-3 rounded-lg bg-white/10 border border-white/20 outline-none"
                required
              />
              <input
                type="text"
                name="day"
                value={formData.day}
                readOnly
                placeholder="Day"
                className="p-3 rounded-lg bg-white/5 border border-white/10"
              />
            </div>
          </div>

          {/* Company Card */}
          <div className="bg-white/5 p-5 rounded-xl border border-white/10">
            <h3 className="text-lg mb-3 text-purple-300 font-semibold">Company Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="company"
                placeholder="Company Name"
                value={formData.company}
                onChange={handleChange}
                className="p-3 rounded-lg bg-white/10 border border-white/20"
                required
              />
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="p-3 rounded-lg bg-white/10 border border-white/20"
                required
              >
                <option value="">Select Role</option>
                {ROLE_OPTIONS.map((role) => (
                  <option key={role} value={role} className="text-black">
                    {role}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Mode Card */}
          <div className="bg-white/5 p-5 rounded-xl border border-white/10">
            <h3 className="text-lg mb-3 text-purple-300 font-semibold">Interview Mode</h3>
            <div className="flex gap-3">
              {["Online", "Offline"].map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, mode }))}
                  className={`px-4 py-2 rounded-lg ${
                    formData.mode === mode
                      ? "bg-purple-500"
                      : "bg-white/10 border border-white/20"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>

            {formData.mode === "Offline" && (
              <input
                type="text"
                name="place"
                value={formData.place}
                onChange={handleChange}
                placeholder="Enter location"
                className="p-3 rounded-lg bg-white/10 border border-white/20 mt-3 w-full"
                required
              />
            )}
          </div>

          {/* Rounds */}
          <div className="bg-white/5 p-5 rounded-xl border border-white/10">
            <h3 className="text-lg mb-3 text-purple-300 font-semibold">Interview Rounds</h3>
            <div className="flex flex-wrap gap-3">
              {ROUND_OPTIONS.map((round) => {
                const isSelected = formData.rounds.includes(round);
                return (
                  <button
                    key={round}
                    type="button"
                    onClick={() => handleCheckboxChange(round)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all
                    ${isSelected
                        ? "bg-gradient-to-r from-green-400 to-emerald-500 scale-105"
                        : "bg-white/10 border border-white/20"
                      }`}
                  >
                    {round}
                  </button>
                );
              })}
            </div>

            <div className="w-full bg-white/10 h-2 rounded-full mt-3">
              <div
                className="bg-gradient-to-r from-green-400 to-emerald-500 h-full"
                style={{ width: `${(formData.rounds.length / ROUND_OPTIONS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Topics */}
          <div className="bg-white/5 p-5 rounded-xl border border-white/10">
            <h3 className="text-lg mb-3 text-purple-300 font-semibold">Topics Asked</h3>

            {formData.topics.map((topic, index) => (
              <div key={topic.id} className="mb-4">
                <input
                  type="text"
                  placeholder={`Topic ${index + 1}`}
                  value={topic.title}
                  onChange={(e) =>
                    handleTopicChange(index, "title", e.target.value)
                  }
                  className="p-3 rounded-lg bg-white/10 w-full"
                />
                <textarea
                  placeholder="Details"
                  value={topic.details}
                  onChange={(e) =>
                    handleTopicChange(index, "details", e.target.value)
                  }
                  className="p-3 rounded-lg bg-white/10 w-full mt-2"
                />
                <button
                  type="button"
                  onClick={() => removeTopic(index)}
                  className="text-red-400 text-sm mt-1"
                >
                  Remove
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={addTopic}
              className="text-blue-300 text-sm"
            >
              + Add Topic
            </button>
          </div>

          {/* Result */}
          <div className="bg-white/5 p-5 rounded-xl border border-white/10">
            <h3 className="text-lg mb-3 text-purple-300 font-semibold">Final Result</h3>
            <select
              name="result"
              value={formData.result}
              onChange={handleChange}
              className="p-3 rounded-lg bg-white/10 border border-white/20 w-full"
              required
            >
              <option value="">Select Result</option>
              <option value="Selected">Selected</option>
              <option value="Rejected">Rejected</option>
              <option value="On Hold">On Hold</option>
            </select>
          </div>

          {/* Submit */}
          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-indigo-600 hover:to-purple-600 px-10 py-3 rounded-full text-lg shadow-lg transition-all hover:scale-105 flex items-center justify-center mx-auto"
            >
              {loading ? <FiLoader className="animate-spin text-xl" /> : "Save Schedule"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddSchedule;