import React from "react";

const NextRoundLogo = () => {
  return (
    <div className="flex items-center gap-2 font-bold text-white text-xl">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.8}
        stroke="currentColor"
        className="w-7 h-7 text-green-400 animate-pulse"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 5l7 7-7 7M5 5v14"
        />
      </svg>
      <span className="tracking-wide">Next Round</span>
    </div>
  );
};

export default NextRoundLogo;
