import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Input from "../components/Input";
import useAuth from "../hooks/useAuth";
import { FiMail, FiLock, FiLoader } from "react-icons/fi";
import { toast } from "react-toastify";
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

    const success = await login(formData);

    if (success) {
      toast.success("Login successful!");
      navigate("/dashboard");
    } else {
      toast.error("Invalid email or password!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 px-4">
      
      <div className="flex w-full max-w-5xl bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Left Image Section */}
        <div className="hidden md:flex md:w-1/2 bg-indigo-100 items-center justify-center p-10">
          <img
            src="https://cdn-icons-png.flaticon.com/512/5087/5087579.png"
            alt="Login"
            className="w-80"
          />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-10">
          <h1 className="text-3xl font-bold text-center text-indigo-600 mb-2">
            Welcome Back
          </h1>

          <p className="text-center text-gray-500 mb-6 text-sm">
            Login to continue to your dashboard
          </p>

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

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-2.5 rounded-lg hover:bg-indigo-500 transition duration-200 flex justify-center items-center font-medium"
            >
              {loading ? (
                <FiLoader className="animate-spin text-xl" />
              ) : (
                "Login"
              )}
            </button>
          </form>

          <div className="mt-5 text-center text-sm text-gray-600">
            <Link
              to="/forget-password"
              className="text-indigo-600 hover:underline"
            >
              Forgot your password?
            </Link>
          </div>

          <p className="text-sm text-center text-gray-600 mt-4">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-indigo-600 font-medium hover:underline"
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