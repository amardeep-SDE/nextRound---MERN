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
import {
  Sparkles,
  ArrowRight,
  Bell,
  TrendingUp,
} from "lucide-react";

const cardData = [
  {
    title: "Add Schedule",
    icon: <FaCalendarPlus size={30} />,
    description:
      "Create and organize your upcoming interview schedules easily.",
    route: "/add-schedule",
    color: "from-cyan-500 to-blue-500",
  },
  {
    title: "Schedule List",
    icon: <FaListAlt size={30} />,
    description:
      "View, filter and manage all your interview schedules in one place.",
    route: "/schedule-list",
    color: "from-pink-500 to-rose-500",
  },
  {
    title: "Chat Support",
    icon: <FaComments size={30} />,
    description:
      "Connect with mentors and get real-time interview guidance.",
    route: "/chat",
    color: "from-violet-500 to-purple-500",
  },
  {
    title: "Profile Settings",
    icon: <FaUserCircle size={30} />,
    description:
      "Manage your profile information and account settings securely.",
    route: "/user-details",
    color: "from-emerald-500 to-green-500",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <>
      <ThemeToggle />

      <div className="min-h-screen relative overflow-hidden bg-[#030712] text-white">

        {/* Background Effects */}
        <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-cyan-500/20 blur-[140px] rounded-full"></div>

        <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-purple-500/20 blur-[140px] rounded-full"></div>

        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

        <div className="relative z-10 p-6 md:p-10">

          {/* Top Navbar */}
          <div className="flex items-center justify-between mb-10">

            <div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight">

                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                  NextRound
                </span>

                <span className="text-white"> Dashboard</span>
              </h1>

              <p className="text-gray-400 mt-3 text-sm md:text-base">
                Organize interviews, track progress and level up your career 🚀
              </p>
            </div>

            {/* Right Icons */}
            <div className="hidden md:flex items-center gap-4">

              <button className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition">
                <Bell size={20} />
              </button>

              <button className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition">
                <TrendingUp size={20} />
              </button>
            </div>
          </div>

          {/* Hero Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 mb-12 shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/10 blur-[120px] rounded-full"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">

              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="text-yellow-400" />
                  <span className="text-yellow-300 font-medium">
                    Smart Interview Management
                  </span>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold leading-tight max-w-2xl">
                  Your all-in-one platform for interview scheduling & career growth.
                </h2>

                <p className="text-gray-400 mt-4 max-w-xl">
                  Manage schedules, chat with mentors, track interviews and stay productive with a modern dashboard experience.
                </p>

                <button className="mt-6 px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:scale-105 transition flex items-center gap-2 font-semibold shadow-lg">
                  Get Started
                  <ArrowRight size={18} />
                </button>
              </div>

              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt="dashboard"
                className="w-64 md:w-80 drop-shadow-2xl"
              />
            </div>
          </motion.div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-7xl mx-auto">

            {cardData.map((card, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200 }}
                onClick={() => navigate(card.route)}
                className="group relative cursor-pointer"
              >

                {/* Glow */}
                <div
                  className={`absolute inset-0 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r ${card.color}`}
                ></div>

                {/* Card */}
                <div className="relative h-full rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-7 overflow-hidden shadow-xl hover:border-white/20 transition">

                  {/* Shine Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700">
                    <div className="absolute -left-20 top-0 w-40 h-full bg-white/10 rotate-12 transform translate-x-[-120%] group-hover:translate-x-[400%] transition duration-1000"></div>
                  </div>

                  <div className="relative z-10">

                    {/* Icon */}
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${card.color} flex items-center justify-center shadow-lg mb-6`}
                    >
                      {card.icon}
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl font-bold mb-3 group-hover:text-cyan-300 transition">
                      {card.title}
                    </h2>

                    {/* Desc */}
                    <p className="text-gray-400 leading-relaxed">
                      {card.description}
                    </p>

                    {/* Bottom */}
                    <div className="mt-6 flex items-center gap-2 text-cyan-400 font-medium">
                      Explore
                      <ArrowRight
                        size={18}
                        className="group-hover:translate-x-1 transition"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;