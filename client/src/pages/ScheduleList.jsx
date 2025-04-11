import React, { useEffect } from "react";
import useSchedule from "../hooks/useSchedule";
import { useSelector } from "react-redux"; // 👈 for Redux data

const ScheduleList = () => {
  const { getSchedules, loading, error } = useSchedule();

  const schedules = useSelector((state) => state.schedule.schedules); // 👈 Redux se data le rahe ho
  console.log(schedules.schedules);
  console.log(schedules?.schedules?.[0]?.company);
  console.log(schedules?.schedules?.map(item => item.company));



  useEffect(() => {
    getSchedules(); // 👈 Redux me dispatch ho raha h setSchedules
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#1f2937] via-[#2c3e50] to-[#1c1c1c] text-white px-4 py-8 font-poppins">
      <h1 className="text-3xl font-bold text-center mb-8">All Interview Qs</h1>

      {loading && <p className="text-center text-gray-300">Loading...</p>}
      {error && <p className="text-center text-red-400">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.isArray(schedules?.schedules) && schedules.schedules.length > 0 ? (
        schedules.schedules.map((schedule, idx) => (
            <div
              key={idx}
              className="bg-white/10 rounded-xl p-4 shadow-md hover:shadow-lg backdrop-blur-sm transition-all duration-300"
            >
              <h2 className="text-xl font-semibold mb-1">{schedule.company}</h2>
              <p className="text-sm mb-1 text-gray-300">
                Date: {schedule.date}
              </p>
              <p className="text-sm mb-1 text-gray-300">Day: {schedule.day}</p>
              <p className="text-sm mb-1 text-gray-300">
                Mode: {schedule.mode}
              </p>
              {schedule.mode === "Offline" && (
                <p className="text-sm mb-1 text-gray-300">
                  Place: {schedule.place}
                </p>
              )}
              <p className="text-sm mb-1 text-gray-300">
                Role: {schedule.role}
              </p>
              <p className="text-sm mb-1 text-gray-300">
                Result: {schedule.result}
              </p>
              <p className="text-sm mb-1 text-gray-300">
                Rounds: {schedule.rounds.join(", ")}
              </p>
              <div className="mt-3">
                <h3 className="font-semibold mb-1 text-white underline">
                  Topics:
                </h3>
                <ul className="text-sm list-disc list-inside text-gray-100">
                  {Array.isArray(schedule.topics) &&
                    schedule.topics.map((topic, i) => (
                      <li key={i}>{topic.title}</li>
                    ))}
                </ul>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-300 col-span-full">
            No schedules available.
          </p>
        )}
      </div>
    </div>
  );
};

export default ScheduleList;
