import React from "react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import {
  FaCalendarPlus,
  FaListAlt,
  FaComments,
  FaUserCircle,
} from "react-icons/fa";
import { motion } from "framer-motion";

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

      <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#020617] p-6 md:p-10 relative overflow-hidden">

        {/* Glow Background */}
        <div className="absolute w-[400px] h-[400px] bg-purple-500/20 blur-[120px] top-[-50px] left-[-50px]" />
        <div className="absolute w-[400px] h-[400px] bg-blue-500/20 blur-[120px] bottom-[-50px] right-[-50px]" />

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
          <span className="bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-500 bg-clip-text text-transparent">
            NextRound Dashboard
          </span>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {cardData.map((card, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -8, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200 }}
              onClick={() => {
                if (!card.disabled && card.route) navigate(card.route);
              }}
              className={`relative rounded-2xl p-[1px] bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 group ${
                card.disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              {/* Inner Card */}
              <div className="relative bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-white shadow-xl group-hover:border-white/30 transition duration-300">

                {/* Shine Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500">
                  <div className="absolute -left-10 top-0 w-40 h-full bg-white/10 rotate-12 transform translate-x-[-100%] group-hover:translate-x-[300%] transition duration-700"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col gap-4">
                  
                  <div className="flex items-center gap-3">
                    <div className="text-white bg-white/20 p-3 rounded-xl group-hover:scale-110 transition duration-300">
                      {card.icon}
                    </div>
                    <h2 className="text-xl font-semibold group-hover:text-yellow-300 transition">
                      {card.title}
                    </h2>
                  </div>

                  <p className="text-sm text-gray-200 group-hover:text-white transition">
                    {card.description}
                  </p>
                </div>

                {/* Bottom Line Animation */}
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 group-hover:w-full transition-all duration-500"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;