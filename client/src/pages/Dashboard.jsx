import React from "react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { FaCalendarPlus, FaListAlt, FaComments, FaUserCircle } from "react-icons/fa";

const cardData = [
  {
    title: "Add Schedule",
    icon: <FaCalendarPlus size={28} />,
    description: "Create and organize your upcoming interview schedules easily.",
    route: "/add-schedule",
  },
  {
    title: "List of Schedules",
    icon: <FaListAlt size={28} />,
    description: "View, filter, and manage all the schedules you've added.",
    route: "/schedule-list",
  },
  {
    title: "Chat Support",
    icon: <FaComments size={28} />,
    description: "Connect with mentors or team members in real-time.",
    route: "/chat",
  },
  {
    title: "User Details",
    icon: <FaUserCircle size={28} />,
    description: "View and manage your personal profile and account settings.",
    route: "/user-details",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <>
      <ThemeToggle />
      <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#4b6cb7] to-[#182848] p-6 md:p-10">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-10 text-center drop-shadow-lg">
          nextRound Dashboard
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {cardData.map((card, index) => (
            <div
              key={index}
              onClick={() => {
                if (!card.disabled && card.route) navigate(card.route);
              }}
              className={`group relative p-5 rounded-2xl bg-white/10 text-white backdrop-blur-md border border-white/10 shadow-md transition-all duration-300 ease-in-out transform ${
                card.disabled
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer hover:-translate-y-2 hover:shadow-xl hover:bg-white/20"
              }`}
            >
              <div className="relative z-10 flex flex-col items-start gap-3">
                <div className="text-white bg-white/20 p-2 rounded-full">
                  {card.icon}
                </div>
                <h2 className="text-xl font-semibold">{card.title}</h2>
                <p className="text-sm text-gray-200">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
