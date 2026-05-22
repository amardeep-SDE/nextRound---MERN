import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiMail, FiLock, FiLoader } from "react-icons/fi";
import { toast } from "react-toastify";
import Input from "../components/Input";
import useAuth from "../hooks/useAuth";
import { loginSchema } from "../schema/validationSchemas";

const Login = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = loginSchema.safeParse(formData);

    if (!validation.success) {
      const fieldErrors = validation.error.formErrors.fieldErrors;
      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    const response = await login(formData);

    if (response?.success) {
      toast.success("Login successful!");
      navigate("/dashboard");
    } else {
      toast.error(response?.message || "Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-500 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2">

        {/* Left Side */}
        <div className="hidden md:flex flex-col items-center justify-center bg-white/5 p-10 text-white relative">
          <img
            src="https://cdn-icons-png.flaticon.com/512/5087/5087579.png"
            alt="Login"
            className="w-80 drop-shadow-2xl"
          />

          <h1 className="text-4xl font-bold mt-8">
            Welcome Back 👋
          </h1>

          <p className="text-white/80 text-center mt-4 max-w-sm">
            Login to access your dashboard and continue your journey with us.
          </p>
        </div>

        {/* Right Side */}
        <div className="bg-white p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-gray-800">
              Sign In
            </h2>

            <p className="text-gray-500 mt-2">
              Please login to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            <Input
              label="Email Address"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              icon={<FiMail />}
              error={errors.email}
            />

            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              icon={<FiLock />}
              error={errors.password}
            />

            <div className="flex justify-end">
              <Link
                to="/forget-password"
                className="text-sm text-indigo-600 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:scale-[1.02] transition-all duration-300 shadow-lg flex items-center justify-center"
            >
              {loading ? (
                <FiLoader className="animate-spin text-xl" />
              ) : (
                "Login"
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Signup here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;