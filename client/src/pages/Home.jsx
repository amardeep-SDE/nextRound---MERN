import React from "react";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import NextRoundLogo from "../components/NextRoundLogo";

const Home = () => {
  return (
    <>
      <div className="w-full h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] relative overflow-hidden font-poppins">

    <div className="">
    <div className="absolute top-4 left-6 md:left-16 z-10">
        <NextRoundLogo />
      </div>
        {/* Top Right Auth Buttons */}
        <div className="absolute top-4 right-6 md:right-24 flex gap-4 z-10">
          <Link to="/">
            <button className="px-4 py-1.5 text-sm font-medium text-white bg-white/10 border border-white/30 backdrop-blur-md rounded-lg hover:bg-white/20 transition duration-300 transform hover:scale-105">
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button className="px-4 py-1.5 text-sm font-medium text-gray-900 bg-white rounded-lg hover:bg-gray-200 transition duration-300 transform hover:scale-105 shadow-md">
              Sign Up
            </button>
          </Link>
        </div>
    </div>
     

        {/* Main Content */}
        <div className="flex flex-col md:flex-row items-center h-full">
          {/* Left Text Section */}
          <div className="w-11/12 md:w-1/2 p-6 md:p-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-200 leading-snug">
              Explore the World of{" "}
              <span className="text-white">
                <Typewriter
                  words={["NextRound", "Progress"]}
                  loop={0}
                  cursor
                  cursorStyle="-> "
                  typeSpeed={100}
                  deleteSpeed={100}
                  delaySpeed={1500}
                />
              </span>
            </h1>
            <p className="text-lg md:text-xl mt-4 text-gray-300 animate-slideFade leading-relaxed">
              Manage all your interview experiences digitally — track, reflect,
              and grow with every opportunity.
            </p>
          </div>

          {/* Right Feature Cards */}
          <div className="w-full md:w-1/2 flex flex-col md:flex-row md:flex-wrap gap-6 p-6 md:p-16">
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
              <div
                key={index}
                className="bg-white/10 rounded-2xl p-5 text-white shadow-xl backdrop-blur-sm w-full md:w-[45%] hover:animate-slideFade"
              >
                <h3 className="text-base font-semibold mb-2">
                  {card.icon} {card.title}
                </h3>
                <p className="text-sm text-gray-200">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
