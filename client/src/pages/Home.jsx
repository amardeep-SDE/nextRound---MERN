import React from "react";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import NextRoundLogo from "../components/NextRoundLogo";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="w-full h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] relative overflow-hidden font-poppins">
      {/* Logo */}
      <div className="absolute top-4 left-6 md:left-16 z-10">
        <NextRoundLogo />
      </div>

      {/* Auth Buttons */}
      <div className="absolute top-4 right-6 md:right-24 flex gap-4 z-10">
        <Link to="/">
          <button className="px-4 py-1.5 text-sm font-semibold text-white bg-white/10 border border-white/30 backdrop-blur-md rounded-xl hover:bg-white/20 transition-all duration-300 hover:scale-105 shadow-lg">
            Login
          </button>
        </Link>
        <Link to="/signup">
          <button className="px-4 py-1.5 text-sm font-semibold text-gray-900 bg-white rounded-xl hover:bg-gray-200 transition-all duration-300 hover:scale-105 shadow-xl">
            Sign Up
          </button>
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row items-center h-full justify-center">
        {/* Left Section */}
        <motion.div
          className="w-11/12 md:w-1/2 p-6 md:p-16"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-snug drop-shadow-md">
            Explore the World of{" "}
            <span className="text-yellow-300 drop-shadow">
              <Typewriter
                words={["NextRound", "Progress"]}
                loop={0}
                cursor
                cursorStyle="|"
                typeSpeed={100}
                deleteSpeed={100}
                delaySpeed={1500}
              />
            </span>
          </h1>
          <p className="text-lg md:text-xl mt-5 text-gray-200 animate-slideFade leading-relaxed max-w-lg">
            Manage all your interview experiences digitally — track, reflect,
            and grow with every opportunity.
          </p>
        </motion.div>

        {/* Right Feature Cards */}
        <motion.div
          className="w-full md:w-1/2 flex flex-col md:flex-row md:flex-wrap gap-6 p-6 md:p-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          {[
            {
              icon: "📋",
              title: "Track Interviews",
              desc: "Keep all your interview records in one place, easily searchable & filterable.",
            },
            {
              icon: "📈",
              title: "Journey Insights",
              desc: "Get insights on how you're improving over time and what to focus on.",
            },
            {
              icon: "⏰",
              title: "Smart Reminders",
              desc: "Never miss an opportunity — get alerts before interviews or follow-ups.",
            },
            {
              icon: "📑",
              title: "Document Upload",
              desc: "Upload and organize your resumes, notes, and important docs for quick access.",
            },
          ].map((card, index) => (
            <motion.div
              key={index}
              className="bg-white/10 rounded-2xl p-5 text-white shadow-xl backdrop-blur-sm w-full md:w-[45%] transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:bg-white/20"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <h3 className="text-lg font-semibold mb-2">
                {card.icon} {card.title}
              </h3>
              <p className="text-sm text-gray-200">{card.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
