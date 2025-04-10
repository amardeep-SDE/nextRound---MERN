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
    <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#4b6cb7] to-[#182848] p-8">
      <h1 className="text-4xl font-bold text-white mb-8 text-center">
        nextRound Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {cardData.map((card, index) => (
          <div
            key={index}
            onClick={() => {
              if (!card.disabled && card.route) navigate(card.route);
            }}
            className={`${
              card.disabled
                ? "opacity-60 cursor-not-allowed"
                : "cursor-pointer hover:bg-white/20 hover:scale-105"
            } bg-white/10 text-white p-6 rounded-2xl shadow-lg backdrop-blur-sm transition-all duration-300`}
          >
            <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
            <p className="text-sm">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
