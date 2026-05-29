import React, { useEffect } from "react";
import useSchedule from "../hooks/useSchedule";
import { useSelector } from "react-redux";
import {
  CalendarDays,
  Building2,
  UserCheck,
  MapPin,
  Briefcase,
  Clock3,
} from "lucide-react";

const ScheduleList = () => {
  const { getSchedules, loading, error } = useSchedule();

  const schedules = useSelector(
    (state) => state.schedule?.schedules?.schedules || []
  );

  useEffect(() => {
    getSchedules();
  }, []);

  const getStatusColor = (status) => {
    const value = status?.toLowerCase();

    if (value?.includes("selected"))
      return "bg-green-500/20 text-green-400 border-green-500/30";

    if (value?.includes("reject"))
      return "bg-red-500/20 text-red-400 border-red-500/30";

    return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      {/* Background Blur Effects */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-cyan-500/20 blur-[140px] rounded-full" />
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-purple-500/20 blur-[140px] rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Interview Tracker
          </h1>

          <p className="text-gray-400 mt-3 text-lg">
            Manage and track all your interview schedules in one place
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-10">
            <div className="w-10 h-10 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl text-center">
            {error}
          </div>
        )}

        {/* Empty State */}
        {!loading && schedules.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24">
            <CalendarDays size={80} className="text-gray-600 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-300">
              No Interview Schedules Found
            </h2>
            <p className="text-gray-500 mt-2">
              Add your upcoming interviews to start tracking.
            </p>
          </div>
        )}

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {schedules.map((schedule, index) => (
            <div
              key={index}
              className="
                backdrop-blur-xl
                bg-white/5
                border border-white/10
                rounded-3xl
                p-6
                shadow-xl
                hover:shadow-cyan-500/20
                hover:border-cyan-400/30
                hover:-translate-y-2
                transition-all duration-300
              "
            >
              {/* Company Header */}
              <div className="flex justify-between items-start mb-5">
                <div>
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Building2
                      size={22}
                      className="text-cyan-400"
                    />
                    {schedule.company}
                  </h2>

                  <p className="text-gray-400 text-sm mt-1">
                    {schedule.role}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                    schedule.result
                  )}`}
                >
                  {schedule.result}
                </span>
              </div>

              {/* Details */}
              <div className="space-y-4 text-sm">
                <div className="flex items-center gap-3">
                  <CalendarDays
                    size={18}
                    className="text-cyan-400"
                  />
                  <div>
                    <p className="text-gray-400">Interview Date</p>
                    <p className="font-medium">{schedule.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock3
                    size={18}
                    className="text-purple-400"
                  />
                  <div>
                    <p className="text-gray-400">Day</p>
                    <p className="font-medium">{schedule.day}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Briefcase
                    size={18}
                    className="text-green-400"
                  />
                  <div>
                    <p className="text-gray-400">Mode</p>
                    <p className="font-medium">{schedule.mode}</p>
                  </div>
                </div>

                {schedule.mode === "Offline" && schedule.place && (
                  <div className="flex items-center gap-3">
                    <MapPin
                      size={18}
                      className="text-red-400"
                    />
                    <div>
                      <p className="text-gray-400">Location</p>
                      <p className="font-medium">{schedule.place}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <UserCheck
                    size={18}
                    className="text-yellow-400"
                  />
                  <div>
                    <p className="text-gray-400">Rounds</p>
                    <p className="font-medium">
                      {schedule.rounds?.join(" → ")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Topics */}
              {schedule.topics?.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-semibold text-gray-300 mb-3">
                    Topics Covered
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {schedule.topics.map((topic, i) => (
                      <span
                        key={i}
                        className="
                          px-3 py-1
                          text-xs
                          rounded-full
                          bg-cyan-500/10
                          border border-cyan-500/20
                          text-cyan-300
                        "
                      >
                        {topic.title}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScheduleList;