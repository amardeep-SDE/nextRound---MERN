import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiUser,
  FiMail,
  FiLock,
  FiPhone,
  FiLoader,
} from "react-icons/fi";

import { toast } from "react-toastify";
import Input from "../components/Input";
import useAuth from "../hooks/useAuth";
import { signupSchema } from "../schema/validationSchemas";

const Signup = () => {
  const navigate = useNavigate();

  const { signup, loading } = useAuth();

  const [acceptTerms, setAcceptTerms] = useState(false);

  const [termsError, setTermsError] = useState("");

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = signupSchema.safeParse(formData);

    if (!validation.success) {
      const fieldErrors = validation.error.formErrors.fieldErrors;
      setErrors(fieldErrors);
      return;
    }

    if (!acceptTerms) {
      setTermsError("Please accept Terms & Conditions");
      return;
    }

    setTermsError("");
    setErrors({});

    const response = await signup(formData);

    if (response?.success) {
      toast.success("Signup successful!");
      navigate("/");
    } else {
      toast.error(response?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-500 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2">

        {/* Left Section */}
        <div className="hidden md:flex flex-col items-center justify-center bg-white/5 p-10 text-white">
          <img
            src="https://cdn-icons-png.flaticon.com/512/5087/5087579.png"
            alt="Signup"
            className="w-80 drop-shadow-2xl"
          />

          <h1 className="text-4xl font-bold mt-8">
            Join With Us 🚀
          </h1>

          <p className="text-white/80 text-center mt-4 max-w-sm">
            Create your account and start managing everything easily.
          </p>
        </div>

        {/* Right Section */}
        <div className="bg-white p-8 md:p-12 flex flex-col justify-center">

          <div className="mb-8">
            <h2 className="text-4xl font-bold text-gray-800">
              Create Account
            </h2>

            <p className="text-gray-500 mt-2">
              Signup to get started
            </p>
          </div>

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
              label="Email Address"
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

            <div>
              <div className="flex items-start gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => {
                    setAcceptTerms(e.target.checked);

                    if (e.target.checked) {
                      setTermsError("");
                    }
                  }}
                  className="mt-1 accent-indigo-600"
                />

                <label className="text-gray-600">
                  I agree to the{" "}
                  <span className="text-indigo-600 font-medium cursor-pointer hover:underline">
                    Terms & Conditions
                  </span>
                </label>
              </div>

              {termsError && (
                <p className="text-red-500 text-sm mt-1">
                  {termsError}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:scale-[1.02] transition-all duration-300 shadow-lg flex items-center justify-center"
            >
              {loading ? (
                <FiLoader className="animate-spin text-xl" />
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <p className="text-sm text-center text-gray-600 mt-6">
            Already have an account?{" "}
            <Link
              to="/"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;