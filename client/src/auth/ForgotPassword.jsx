import { useState } from "react";
import { FiLoader, FiMail } from "react-icons/fi";
import { toast } from "react-toastify";
import Input from "../components/Input";
import { forgotPasswordSchema } from "../schema/validationSchemas";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = forgotPasswordSchema.safeParse({ email });
    if (!validation.success) {
      const fieldErrors = validation.error.formErrors.fieldErrors;
      setError(fieldErrors);
      return;
    }
    // ye tab tha jab zod yenhi tha
    // if (!validation.success) {
    //   toast.error(validation.error.errors[0].message);
    //   return;
    // }

    setLoading(true);
    // Simulate API call
    await new Promise((res) => setTimeout(res, 1000));
    setLoading(false);

    toast.success("Password reset link sent to your email!");
    setEmail("");
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-purple-400 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6 text-purple-600">
          Forgot Password
        </h1>
        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            name="email"
            type="email"
            value={email}
            placeholder="Enter your registered email"
            onChange={(e) => setEmail(e.target.value)}
            error={error.email}
            icon={<FiMail />}
          />
          <button
            type="submit"
            className="w-full bg-purple-600 text-white hover:bg-purple-500 transition duration-200  py-2 rounded-lg mt-4 flex items-center justify-center"
            disabled={loading}
          >
            {loading ?  <FiLoader className="animate-spin text-xl" /> : "Send Reset Link"}
          </button>
          
        <p className="text-sm text-center text-gray-600 mt-4">
          <Link
            to="/"
            className="text-blue-600 font-medium hover:underline"
          >
            Back to Login
          </Link>
        </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
