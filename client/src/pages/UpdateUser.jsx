import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateUser = () => {
  const currentUser = useSelector((state) => state.user.currentUser?.user);

  const [formData, setFormData] = useState({
    username: currentUser?.username || "",
    email: currentUser?.email || "",
    phone: currentUser?.phone || "",
    address: currentUser?.address || "",
    profilePicture: currentUser?.profilePicture || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        "http://localhost:3001/api/users/profile/update",
        formData,
        {
          withCredentials: true, // zaroori agar login cookie/session ka use ho raha ho
        }
      );

      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-md p-8 rounded-xl max-w-md w-full space-y-6 shadow-2xl"
      >
        <h2 className="text-2xl font-bold text-center">Update Profile</h2>

        <InputField
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <InputField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <InputField
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <InputField
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
        <InputField
          label="Profile Picture URL"
          name="profilePicture"
          value={formData.profilePicture}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md transition-all font-semibold"
        >
          Save Changes
        </button>
      </form>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
    </div>
  );
};

const InputField = ({ label, name, value, onChange }) => (
  <div>
    <label className="block mb-1 text-sm text-gray-300">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

export default UpdateUser;
