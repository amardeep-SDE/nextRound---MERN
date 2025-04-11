import React from "react";
import { useNavigate } from "react-router-dom";

const cardData = [
  {
    title: "➕ Add Schedule",
    description: "Create and organize your upcoming interview schedules easily.",
    route: "/add-schedule",
  },
  {
    title: "📋 List of Schedules",
    description: "View, filter, and manage all the schedules you've added.",
    route: "/schedule-list",
  },
  {
    title: "💬 Chat Support",
    description: "Connect with mentors or team members in real-time.",
    route: "/chat",
  },
  {
    title: "👤 User Details",
    description: "View and manage your personal profile and account settings.",
    route: "/user-details",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#4b6cb7] to-[#182848] p-6 md:p-10">
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center drop-shadow-md">
        nextRound Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {cardData.map((card, index) => (
          <div
            key={index}
            onClick={() => {
              if (!card.disabled && card.route) navigate(card.route);
            }}
            className={`relative group bg-white/10 text-white p-6 rounded-2xl shadow-xl backdrop-blur-md transition-all duration-300 ${
              card.disabled
                ? "opacity-60 cursor-not-allowed"
                : "cursor-pointer hover:scale-[1.03]"
            }`}
          >
            {/* Gradient border on hover */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition duration-500 z-0" />
            
            {/* Actual content */}
            <div className="relative z-10">
              <h2 className="text-xl font-semibold mb-3">{card.title}</h2>
              <p className="text-sm text-gray-200">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
