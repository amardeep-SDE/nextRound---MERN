import React, { useState } from "react";
import useSchedule from "../hooks/useSchedule";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FiLoader } from "react-icons/fi";

const AddSchedule = () => {
  const { addSchedule, loading } = useSchedule();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    date: "",
    day: "",
    company: "",
    role: "",
    rounds: [],
    topics: [{ title: "", details: "" }],
    result: "",
    mode: "Online",
    place: "",
  });

  const roundOptions = ["Technical", "Machine", "HR"];
  const roleOptions = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "date") {
      const day = new Date(value).toLocaleDateString("en-US", {
        weekday: "long",
      });
      setFormData((prev) => ({ ...prev, day }));
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
    const updatedTopics = [...formData.topics];
    updatedTopics[index][field] = value;
    setFormData((prev) => ({ ...prev, topics: updatedTopics }));
  };

  const addTopic = () => {
    setFormData((prev) => ({
      ...prev,
      topics: [...prev.topics, { title: "", details: "" }],
    }));
  };

  const removeTopic = (index) => {
    const updatedTopics = formData.topics.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, topics: updatedTopics }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const schedule = addSchedule(formData);
    if (schedule) {
      toast.success("Schedule added successfully!");
      navigate("/schedule");
    } else {
      toast.error("Failed to add schedule!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1f2937] via-[#111827] to-[#1f2937] text-white p-4 sm:p-8">
      <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-md p-6 sm:p-10 rounded-xl shadow-2xl border border-white/10">
        <h2 className="text-3xl font-bold mb-8 text-center text-white">
          Add Interview Schedule
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Date and Day */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="p-3 rounded-md bg-white/20 w-full outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
            <input
              type="text"
              name="day"
              placeholder="Day"
              value={formData.day}
              readOnly
              className="p-3 rounded-md bg-white/20 w-full text-gray-300"
            />
          </div>

          {/* Company and Role */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="company"
              placeholder="Company Name"
              value={formData.company}
              onChange={handleChange}
              className="p-3 rounded-md bg-white/20 w-full outline-none"
              required
            />
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="p-3 rounded-md bg-white/20 w-full"
              required
            >
              <option value="">Select Role</option>
              {roleOptions.map((role) => (
                <option key={role} value={role} className="text-black">
                  {role}
                </option>
              ))}
            </select>
          </div>

          {/* Mode and Place */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">Mode</label>
              <select
                name="mode"
                value={formData.mode}
                onChange={handleChange}
                className="p-3 rounded-md bg-white/20 w-full"
              >
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
              </select>
            </div>
            {formData.mode === "Offline" && (
              <div>
                <label className="block font-semibold mb-1">Place</label>
                <input
                  type="text"
                  name="place"
                  value={formData.place}
                  onChange={handleChange}
                  placeholder="Enter location"
                  className="p-3 rounded-md bg-white/20 w-full"
                  required
                />
              </div>
            )}
          </div>

          {/* Interview Rounds */}
          <div>
            <label className="block font-semibold mb-2 text-lg">
              Interview Rounds:
            </label>
            <div className="flex flex-wrap gap-3">
              {roundOptions.map((round) => {
                const isSelected = formData.rounds.includes(round);
                return (
                  <button
                    key={round}
                    type="button"
                    onClick={() => handleCheckboxChange(round)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all 
                    ${
                      isSelected
                        ? "bg-green-500 text-white scale-105"
                        : "bg-white/20 text-white hover:bg-white/30"
                    }`}
                  >
                    {round}
                  </button>
                );
              })}
            </div>

            <div className="w-full bg-white/20 h-2 rounded-full mt-3 overflow-hidden">
              <div
                className="bg-green-400 h-full transition-all duration-300"
                style={{
                  width: `${
                    (formData.rounds.length / roundOptions.length) * 100
                  }%`,
                }}
              ></div>
            </div>
          </div>

          {/* Topics Asked */}
          <div>
            <label className="block font-semibold mb-2">Topics Asked:</label>
            {formData.topics.map((topic, index) => (
              <div
                key={index}
                className="mb-4 bg-white/10 p-4 rounded-lg space-y-2"
              >
                <input
                  type="text"
                  placeholder={`Topic Title ${index + 1}`}
                  value={topic.title}
                  onChange={(e) =>
                    handleTopicChange(index, "title", e.target.value)
                  }
                  className="p-3 rounded-md bg-white/20 w-full"
                />
                <button
                  type="button"
                  onClick={() => removeTopic(index)}
                  className="text-red-400 hover:underline text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addTopic}
              className="text-blue-300 hover:underline text-sm"
            >
              + Add Another Topic
            </button>
          </div>

          {/* Final Result */}
          <div>
            <label className="block font-semibold mb-1">Final Result</label>
            <select
              name="result"
              value={formData.result}
              onChange={handleChange}
              className="p-3 rounded-md bg-white/20 w-full"
              required
            >
              <option value="">Select Result</option>
              <option value="Selected">Selected</option>
              <option value="Rejected">Rejected</option>
              <option value="On Hold">On Hold</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className="mt-4 bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full text-lg shadow-md transition-transform duration-300 hover:scale-105 flex items-center justify-center mx-auto"
            >
              {loading ? (
                <FiLoader className="animate-spin text-xl" />
              ) : (
                "Save Schedule"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSchedule;
