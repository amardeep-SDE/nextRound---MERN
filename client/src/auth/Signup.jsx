import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiUser, FiMail, FiLock, FiPhone, FiLoader } from "react-icons/fi";
import Input from "../components/Input";
import useAuth from "../hooks/useAuth";
import { signupSchema } from "../schema/validationSchemas";

const Signup = () => {

  const [acceptTerms, setAcceptTerms] = useState(false);
const [termsError, setTermsError] = useState("");
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

  const validation = signupSchema.safeParse(formData);

  if (!validation.success) {
    const fieldErrors = validation.error.formErrors.fieldErrors;
    setErrors(fieldErrors);
    return;
  }

  if (!acceptTerms) {
    setTermsError("Please accept the Terms & Conditions");
    return;
  }

  setTermsError("");
  setErrors({});

  const response = await signup(formData);

  if (response?.success) {
    toast.success("Signup successful! Please login.");
    navigate("/");
  } else {
    toast.error(response?.message || "Something went wrong");
  }
};

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-r from-indigo-400 to-blue-500 px-4">
      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white rounded-lg shadow-lg overflow-hidden">
        
        {/* Left Side - Image */}
        <div className="hidden md:flex md:w-1/2 bg-indigo-100 items-center justify-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/5087/5087579.png" 
            alt="Register User"
            className="w-3/4 h-auto object-contain"
          />
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-8">
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
<div className="flex items-start gap-2 text-sm">
  <input
    type="checkbox"
    checked={acceptTerms}
    onChange={(e) => {
      setAcceptTerms(e.target.checked);
      if (e.target.checked) setTermsError("");
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
  <p className="text-red-500 text-sm">{termsError}</p>
)}
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
    </div>
  );
};

export default Signup;
