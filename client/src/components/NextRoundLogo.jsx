import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const NextRoundLogo = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-3"
    >
      {/* Logo Icon */}
      <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-500 shadow-lg">

        {/* Glow Effect */}
        <div className="absolute inset-0 rounded-2xl bg-indigo-500 blur-xl opacity-30 animate-pulse"></div>

        {/* Arrow */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.2}
          stroke="currentColor"
          className="w-6 h-6 text-white relative z-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 5l7 7-7 7M5 5v14"
          />
        </svg>
      </div>

      {/* Text */}
      <div className="flex flex-col leading-none">
        <h1 className="text-2xl font-extrabold tracking-wide bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
          Next Round
        </h1>

        <div className="flex items-center gap-1 text-xs text-gray-300 mt-1">
          <Sparkles className="w-3 h-3 text-yellow-400" />
          <span>Level Up Your Career</span>
        </div>
      </div>
    </motion.div>
  );
};

export default NextRoundLogo;