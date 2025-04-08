import { useState } from "react";
import Input from "../components/Input";
const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    
  };
  return (
    <>
      <div className="w-full h-screen flex justify-center items-center bg-slate-400">
        <div className="w-full max-w-md p-6 bg-white rounded-lg">
          <h1 className="text-3xl font-bold mb-4 text-center">Signup</h1>

          <form onSubmit={handleSubmit}>
            <Input
              label="User Name"
              name="username"
              type="text"
              value={formData.username}
              placeholder="Enter your name"
              onChange={handleChange}
            />
            <Input
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              placeholder="Enter your email"
              onChange={handleChange}
            />
            <Input
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              placeholder="Enter your password"
              onChange={handleChange}
            />

            <Input
              label="Phone Number"
              name="phone"
              type="text"
              value={formData.phone}
              placeholder="Enter your phone number"
              onChange={handleChange}
            />
            <button
              type="submit"
              className=" w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Signup
            </button>
          </form>
          <div className="text-center mt-2">
            <p>You have already register ?</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Signup;
