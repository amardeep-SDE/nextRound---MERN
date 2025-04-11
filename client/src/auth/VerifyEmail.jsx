import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { FiLoader } from "react-icons/fi";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
const VerifyEmail = () => {
  const inputRefs = useRef([]);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const { verifyEmail, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/[^a-zA-Z0-9]/g, "");
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        // If current box has a value, just clear it
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        // If box is empty, go to previous
        inputRefs.current[index - 1].focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1].focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = otp.join("");
    console.log(e);

    if (code.length !== 6) {
      toast.error("Please enter all 6 characters.");
      return;
    }

    const result = await verifyEmail(code);
    console.log(result);

    if (result) {
      toast.success("Email verified successfully!");
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();

      // Redirect to dashboard or login after verification
      navigate("/dashboard");
    } else {
      toast.error("Invalid or expired code.");
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-blue-400 px-4">
      <div className="w-full max-w-md bg-white p-12 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold text-blue-600 mb-4">Verify Code</h1>
        <p className="text-gray-700 mb-6">
          Enter the 6-character alphanumeric code sent to your email.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-between gap-2">
            {otp.map((char, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={char}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputRefs.current[index] = el)}
                className="w-8 h-8 text-center text-xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 flex justify-center items-center"
          >
            {loading ? <FiLoader className="animate-spin text-xl" /> : "Verify"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;
