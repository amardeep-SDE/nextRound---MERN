import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiUser, FiMail, FiLock, FiPhone, FiLoader } from "react-icons/fi";
import Input from "../components/Input";
import useAuth from "../hooks/useAuth";
import { signupSchema } from "../schema/validationSchemas";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
  });

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const { signup, loading, error } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    const validation = signupSchema.safeParse(formData);

    if (!validation.success) {
      const fieldErrors = validation.error.formErrors.fieldErrors;
      setErrors(fieldErrors);
      return;
    }
    setErrors({}); // Clear previous errors

    const response = await signup(formData);
    console.log(response);

    if (response) {
      toast.success("Signup successful! Please login.");
      navigate("/");
    } else if (error) {
      toast.error(error);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gradient-to-r from-indigo-400 to-blue-500 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-indigo-600">
          Create Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="User Name"
            name="username"
            type="text"
            value={formData.username}
            placeholder="Enter your name"
            onChange={handleChange}
            error={errors.username}
            icon={<FiUser />}
          />
          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            placeholder="Enter your email"
            onChange={handleChange}
            error={errors.email}
            icon={<FiMail />}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            placeholder="Enter your password"
            onChange={handleChange}
            error={errors.password}
            icon={<FiLock />}
          />
          <Input
            label="Phone Number"
            name="phone"
            type="text"
            value={formData.phone}
            placeholder="Enter your phone number"
            onChange={handleChange}
            error={errors.phone}
            icon={<FiPhone />}
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-500 transition duration-200 flex justify-center items-center"
            disabled={loading}
          >
            {loading ? (
              <FiLoader className="animate-spin text-xl" />
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/" className="text-indigo-600 font-medium hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
