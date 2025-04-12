import React from "react";
import { useSelector } from "react-redux";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

const UserProfile = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  console.log(currentUser.user);
  

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p className="text-lg">No User Found!!</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e293b] via-[#0f172a] to-black flex items-center justify-center px-4 py-10">
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 max-w-md w-full text-white shadow-2xl border border-white/10 relative overflow-hidden">
        {/* Profile Picture */}
        <div className="flex flex-col items-center space-y-4 relative z-10">
          <div className="relative group">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 blur-lg opacity-30 group-hover:scale-105 transition-transform duration-500" />
            <img
              src={currentUser.user.profilePicture}
              alt="Profile"
              className="w-28 h-28 rounded-full border-4 border-white shadow-lg z-10 relative group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <h2 className="text-2xl font-bold tracking-wide">{currentUser.user.username}</h2>
          <p className="text-xs text-gray-300 italic">
            Last Login: {new Date(currentUser.user.lastLogin).toLocaleString()}
          </p>
        </div>

        {/* User Info */}
        <div className="mt-6 space-y-4 text-sm z-10 relative">
          <InfoItem icon={<FaEnvelope />} text={currentUser.user.email} color="text-blue-400" />
          <InfoItem icon={<FaPhone />} text={currentUser.user.phone} color="text-green-400" />
          <InfoItem icon={<FaMapMarkerAlt />} text={currentUser.user.address} color="text-red-400" />
          <InfoItem
            icon={<FaUser />}
            text={`Admin: ${currentUser.user.admin ? "Yes" : "No"}`}
            color="text-yellow-400"
          />
          <div className="flex items-center gap-2">
            {currentUser.user.isVerified ? (
              <FaCheckCircle className="text-green-400 animate-pulse" />
            ) : (
              <FaTimesCircle className="text-red-400" />
            )}
            <span className="text-gray-200">
              {currentUser.user.isVerified ? "Verified Account" : "Not Verified"}
            </span>
          </div>
        </div>

        {/* Button */}
        <div className="mt-8 flex justify-center">
          <button className="px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 rounded-full text-sm font-semibold shadow-md transition-all duration-300">
            Edit Profile
          </button>
        </div>

        {/* Background Blur */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-600 opacity-20 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-500 opacity-20 blur-2xl rounded-full" />
      </div>
    </div>
  );
};

const InfoItem = ({ icon, text, color }) => (
  <div className="flex items-center gap-2">
    <span className={`${color} text-lg`}>{icon}</span>
    <span className="text-gray-200">{text}</span>
  </div>
);

export default UserProfile;
