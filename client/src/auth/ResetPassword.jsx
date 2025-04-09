import { useState } from "react";
import { FiLock, FiLoader } from "react-icons/fi";
import { toast } from "react-toastify";
import Input from "../components/Input";
import { resetPasswordSchema } from "../schema/validationSchemas";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = resetPasswordSchema.safeParse(formData);
    if (!validation.success) {
      const fieldErrors = validation.error.formErrors.fieldErrors;
      setError(fieldErrors);
      return;
    }

    setError({});
    setLoading(true);
    // Simulate API call
    await new Promise((res) => setTimeout(res, 1000));
    setLoading(false);

    toast.success("Password reset successful!");
    setFormData({ password: "", confirmPassword: "" });
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-pink-400 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6 text-pink-600">
          Reset Password
        </h1>

        <form onSubmit={handleSubmit}>
          <Input
            label="New Password"
            name="password"
            type="password"
            placeholder="Enter new password"
            value={formData.password}
            onChange={handleChange}
            error={error.password}
            icon={<FiLock />}
          />
          <Input
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder="Confirm new password"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={error.confirmPassword}
            icon={<FiLock />}
          />

          <button
            type="submit"
            className="w-full bg-pink-600 text-white hover:bg-pink-500 transition duration-200 py-2 rounded-lg mt-4 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <FiLoader className="animate-spin text-xl" />
            ) : (
              "Reset Password"
            )}
          </button>

          <p className="text-sm text-center text-gray-600 mt-4">
            <Link to="/" className="text-blue-600 font-medium hover:underline">
              Back to Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
