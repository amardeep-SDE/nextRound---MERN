import React from "react";

const interviews = [
  {
    company: "Google",
    date: "2024-08-01",
    mode: "Online",
    place: "",
    questions: ["What is a linked list?", "How does load balancing work?"],
  },
  {
    company: "Amazon",
    date: "2024-08-05",
    mode: "Offline",
    place: "Hyderabad",
    questions: ["Explain abstraction in OOPs.", "What is a transaction?"],
  },
  {
    company: "Meta",
    date: "2024-08-10",
    mode: "Online",
    place: "",
    questions: ["What are React Hooks?", "How to optimize rendering?"],
  },
  {
    company: "Microsoft",
    date: "2024-08-15",
    mode: "Offline",
    place: "Bangalore",
    questions: ["Explain BFS in Graph.", "What is caching?"],
  },
  {
    company: "Adobe",
    date: "2024-08-18",
    mode: "Online",
    place: "",
    questions: ["What is closure?", "Difference between REST and GraphQL?"],
  },
  {
    company: "Netflix",
    date: "2024-08-20",
    mode: "Offline",
    place: "Mumbai",
    questions: ["What is JWT?", "Explain IAM in AWS."],
  },
  {
    company: "Flipkart",
    date: "2024-08-22",
    mode: "Online",
    place: "",
    questions: ["Explain Multithreading in Java.", "What is Dependency Injection?"],
  },
  {
    company: "Paytm",
    date: "2024-08-25",
    mode: "Offline",
    place: "Noida",
    questions: ["What is the difference between Stack and Queue?", "Explain middleware in Express."],
  },
];

const InterviewList = () => {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#1f2937] via-[#2c3e50] to-[#1c1c1c] text-white px-4 py-8 font-poppins">
      <h1 className="text-3xl font-bold text-center mb-8">All Interview Qs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {interviews.map((interview, idx) => (
          <div
            key={idx}
            className="bg-white/10 rounded-xl p-4 shadow-md hover:shadow-lg backdrop-blur-sm transition-all duration-300"
          >
            <h2 className="text-xl font-semibold mb-1">{interview.company}</h2>
            <p className="text-sm mb-1 text-gray-300">Date: {interview.date}</p>
            <p className="text-sm mb-1 text-gray-300">Mode: {interview.mode}</p>
            {interview.mode === "Offline" && (
              <p className="text-sm mb-1 text-gray-300">Place: {interview.place}</p>
            )}

            <div className="mt-3">
              <h3 className="font-semibold mb-1 text-white underline">INT Q:</h3>
              <ul className="text-sm list-decimal list-inside text-gray-100">
                {interview.questions.map((q, i) => (
                  <li key={i}>{q}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InterviewList;
