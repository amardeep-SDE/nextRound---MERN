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

    // Auto-set day when date changes
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
    console.log("Submitted Data:", formData);
    const schedule = addSchedule(formData);

    if (schedule) {
      toast.success("Schedule added successfully!");
      navigate("/schedule");
    } else {
      toast.error("Failed to add schedule!");
      navigate("/add-schedule");
    }
    // Send to API or store
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-[#141E30] via-[#243B55] to-[#141E30]
 text-white p-6 md:p-10"
    >
      <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-sm p-8 rounded-xl shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Add Interview Schedule
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="p-2 rounded bg-white/20 w-full"
              required
            />
            <input
              type="text"
              name="day"
              placeholder="Day"
              value={formData.day}
              onChange={handleChange}
              className="p-2 rounded bg-white/20 w-full"
              readOnly
            />
            <input
              type="text"
              name="company"
              placeholder="Company Name"
              value={formData.company}
              onChange={handleChange}
              className="p-2 rounded bg-white/20 w-full"
              required
            />
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="p-2 rounded bg-white/20 w-full"
              required
            >
              <option className="bg-gray-500" value="">
                Select Role
              </option>
              {roleOptions.map((role) => (
                <option className="bg-gray-500" key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>

          {/* Interview Mode */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-semibold">
                Mode of Interview:
              </label>
              <select
                name="mode"
                value={formData.mode}
                onChange={handleChange}
                className="p-2 rounded bg-white/20 w-full"
              >
                <option className="bg-gray-500" value="Online">
                  Online
                </option>
                <option className="bg-gray-500" value="Offline">
                  Offline
                </option>
              </select>
            </div>

            {formData.mode === "Offline" && (
              <div>
                <label className="block mb-2 font-semibold">
                  Place of Interview:
                </label>
                <input
                  type="text"
                  name="place"
                  value={formData.place}
                  onChange={handleChange}
                  placeholder="Enter place"
                  className="p-2 rounded bg-white/20 w-full"
                  required
                />
              </div>
            )}
          </div>

          {/* Rounds */}
          <div>
            <label className="block mb-4 font-semibold text-lg">
              Interview Rounds:
            </label>

            <div className="flex flex-wrap gap-4 mb-4">
              {roundOptions.map((round) => {
                const isSelected = formData.rounds.includes(round);
                return (
                  <button
                    key={round}
                    type="button"
                    onClick={() => handleCheckboxChange(round)}
                    className={`px-4 py-2 rounded-xl transition-all duration-300 font-medium 
            ${
              isSelected
                ? "bg-green-500 text-white shadow-lg scale-105"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
                  >
                    {round}
                  </button>
                );
              })}
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-white/20 h-3 rounded-full overflow-hidden">
              <div
                className="bg-green-500 h-full transition-all duration-300"
                style={{
                  width: `${
                    (formData.rounds.length / roundOptions.length) * 100
                  }%`,
                }}
              ></div>
            </div>

            <p className="text-sm text-gray-300 mt-2">
              {formData.rounds.length} of {roundOptions.length} selected
            </p>
          </div>

          {/* Topics */}
          <div>
            <label className="block mb-2 font-semibold">Topics Asked:</label>
            {formData.topics.map((topic, index) => (
              <div
                key={index}
                className="space-y-2 mb-4 bg-white/10 p-4 rounded"
              >
                <input
                  type="text"
                  placeholder={`Topic Title ${index + 1}`}
                  value={topic.title}
                  onChange={(e) =>
                    handleTopicChange(index, "title", e.target.value)
                  }
                  className="p-2 rounded bg-white/20 w-full font-semibold"
                />

                <button
                  type="button"
                  onClick={() => removeTopic(index)}
                  className="bg-red-500 hover:bg-red-600 px-2 py-1 rounded text-white text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addTopic}
              className="text-sm text-blue-300 hover:underline"
            >
              + Add Another Topic
            </button>
          </div>

          {/* Result */}
          <div>
            <label className="block mb-2 font-semibold">Final Result:</label>
            <select
              name="result"
              value={formData.result}
              onChange={handleChange}
              className="p-2 rounded bg-white/20 w-full"
              required
            >
              <option className="bg-gray-500" value="">
                Select Result
              </option>
              <option className="bg-gray-500" value="Selected">
                Selected
              </option>
              <option className="bg-gray-500" value="Rejected">
                Rejected
              </option>
              <option className="bg-gray-500" value="On Hold">
                On Hold
              </option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-white text-black px-6 py-2 rounded-xl hover:scale-105 transition-all duration-300 shadow-md"
            disabled={loading}
          >
            {loading ? (
              <FiLoader className="animate-spin text-xl" />
            ) : (
              "save interview"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSchedule;
