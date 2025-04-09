import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Input from "../components/Input";
import useAuth from "../hooks/useAuth";
import { FiMail, FiLock, FiLoader } from "react-icons/fi";
import { toast } from "react-toastify";
import { loginSchema } from "../schema/validationSchemas"; // import schema

const Login = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({}); // validation errors

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // setFormData((prev) => ({
    //   ...prev,
    //   [e.target.name]: e.target.value,
    // }));
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
      navigate("/verify-email");
    } else {
      toast.error("Invalid email or password!");
      // toast.error(error);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gradient-to-r from-cyan-400 to-blue-500 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
          Welcome Back
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            icon={<FiMail />}
            error={errors.email} // show error
          />
          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            icon={<FiLock />}
            error={errors.password} // show error
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-500 transition duration-200 flex justify-center items-center"
            disabled={loading}
          >
            {loading ? <FiLoader className="animate-spin text-xl" /> : "Login"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          <Link
            to="/forget-password"
            className="text-blue-600 font-medium hover:underline"
          >
            Forget your password?
          </Link>
        </p>
        <p className="text-sm text-center text-gray-600 mt-4">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 font-medium hover:underline"
          >
            Signup here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
