import React, { useEffect } from "react";
import useSchedule from "../hooks/useSchedule";
import { useSelector } from "react-redux";
import { CalendarDays, Building2, UserCheck, MapPin } from "lucide-react";

const ScheduleList = () => {
  const { getSchedules, loading, error } = useSchedule();
  const schedules = useSelector((state) => state.schedule.schedules); 
  console.log(schedules.schedules);
  console.log(schedules?.schedules?.[0]?.company);
  console.log(schedules?.schedules?.map((item) => item.company));

  useEffect(() => {
    getSchedules();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-4 py-10 font-poppins">
      <h1 className="text-4xl font-bold text-center mb-10 text-white drop-shadow">
        Interview Schedules
      </h1>

      {loading && <p className="text-center text-gray-400">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.isArray(schedules?.schedules) &&
        schedules.schedules.length > 0 ? (
          schedules.schedules.map((schedule, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-xl p-5 border border-white/10 shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all duration-300"
            >
              <h2 className="text-2xl font-bold mb-2 text-white flex items-center gap-2">
                <Building2 size={20} /> {schedule.company}
              </h2>

              <div className="text-sm text-gray-300 space-y-1">
                <p className="flex items-center gap-2">
                  <CalendarDays size={16} /> <strong>Date:</strong>{" "}
                  {schedule.date}
                </p>
                <p>
                  <strong>Day:</strong> {schedule.day}
                </p>
                <p>
                  <strong>Mode:</strong> {schedule.mode}
                </p>
                {schedule.mode === "Offline" && (
                  <p className="flex items-center gap-2">
                    <MapPin size={16} /> <strong>Place:</strong>{" "}
                    {schedule.place}
                  </p>
                )}
                <p>
                  <strong>Role:</strong> {schedule.role}
                </p>
                <p className="flex items-center gap-2">
                  <UserCheck size={16} /> <strong>Result:</strong>{" "}
                  {schedule.result}
                </p>
                <p>
                  <strong>Rounds:</strong> {schedule.rounds.join(", ")}
                </p>
              </div>

              {Array.isArray(schedule.topics) && schedule.topics.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-white font-semibold underline mb-2">
                    Topics Covered:
                  </h3>
                  <ul className="list-disc list-inside text-sm text-gray-200 space-y-1">
                    {schedule.topics.map((topic, i) => (
                      <li key={i}>{topic.title}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400 col-span-full">
            No schedules available.
          </p>
        )}
      </div>
    </div>
  );
};

export default ScheduleList;
