import { useState } from "react";
import { FiUser } from "react-icons/fi";

const Signup = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { label: "Personal Information", desc: "Basic Profile Details", completed: true },
    { label: "Skills", desc: "Your Technical Experience", completed: true },
    { label: "Experience", desc: "Work History", completed: true },
    { label: "Certifications", desc: "Credentials", completed: false },
    { label: "Portfolio", desc: "Showcase Your Work", completed: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#17132B] to-[#502C6A] px-6 py-10 text-white">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-semibold">Complete Your Profile</h1>
          <p className="text-gray-300 mt-2">
            Let's set up your professional testing profile to attract clients
          </p>
        </div>

        {/* Step Text */}
        <div className="flex justify-between items-center mb-4 text-sm">
          <span>Step {currentStep} Of 6</span>
          <span>60% Complete</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-gray-600 rounded-full mb-8">
          <div className="bg-red-500 h-1 rounded-full" style={{ width: "60%" }}></div>
        </div>

        {/* Step Indicators */}
        <div className="flex flex-wrap justify-between items-start gap-4">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center flex-1 text-center">
              <div
                className={`w-8 h-18 rounded-full flex items-center justify-center mb-2 ${
                  step.completed ? "bg-white text-black" : "border border-gray-400"
                }`}
              >
                {step.completed ? "✓" : index + 1}
              </div>
              <div className="text-sm font-medium">{step.label}</div>
              <div className="text-xs text-gray-300">{step.desc}</div>
            </div>
          ))}
        </div>

        {/* Optional: Continue with your form below */}
        <div className="mt-12 bg-white text-black rounded-lg p-6 shadow">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full mt-1 px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Nick Name</label>
              <input
                type="text"
                placeholder="Nick Name"
                className="w-full mt-1 px-3 py-2 border rounded"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-6">
            <button className="text-sm px-4 py-2 rounded border">Previous</button>
            <button className="text-sm px-6 py-2 rounded bg-indigo-700 text-white">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
