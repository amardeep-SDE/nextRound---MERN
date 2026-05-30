import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { FiLoader } from "react-icons/fi";
import { ShieldCheck } from "lucide-react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const inputRefs = useRef([]);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const { verifyEmail, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/[^a-zA-Z0-9]/g, "");

    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value.toUpperCase();
    setOtp(newOtp);

    if (index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];

      if (otp[index]) {
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pastedData = e.clipboardData
      .getData("text")
      .slice(0, 6)
      .toUpperCase()
      .split("");

    const newOtp = [...otp];

    pastedData.forEach((char, index) => {
      if (/^[a-zA-Z0-9]$/.test(char)) {
        newOtp[index] = char;
      }
    });

    setOtp(newOtp);

    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const code = otp.join("");

    if (code.length !== 6) {
      toast.error("Please enter complete verification code");
      return;
    }

    const result = await verifyEmail(code);

    if (result) {
      toast.success("Email verified successfully!");

      setOtp(["", "", "", "", "", ""]);

      navigate("/dashboard");
    } else {
      toast.error("Invalid or expired verification code");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] relative overflow-hidden px-4">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/20 blur-[150px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 blur-[150px] rounded-full" />

      <div
        className="
          relative z-10
          w-full max-w-md
          backdrop-blur-xl
          bg-white/10
          border border-white/20
          rounded-3xl
          shadow-2xl
          p-8 md:p-10
        "
      >
        {/* Icon */}
        <div className="flex justify-center mb-5">
          <div className="bg-cyan-500/20 p-4 rounded-full">
            <ShieldCheck
              size={40}
              className="text-cyan-400"
            />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-center text-white mb-2">
          Verify Email
        </h1>

        <p className="text-center text-gray-300 mb-8">
          Enter the 6-character verification code sent to your email
        </p>

        <form onSubmit={handleSubmit}>
          {/* OTP Inputs */}
          <div
            className="flex justify-center gap-3 mb-8"
            onPaste={handlePaste}
          >
            {otp.map((char, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={char}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputRefs.current[index] = el)}
                className="
                  w-12 h-14 md:w-14 md:h-16
                  text-center
                  text-xl
                  font-bold
                  text-white
                  bg-white/10
                  border border-white/20
                  rounded-xl
                  outline-none
                  transition-all duration-200
                  focus:border-cyan-400
                  focus:ring-2 focus:ring-cyan-400/40
                "
              />
            ))}
          </div>

          {/* Verify Button */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              h-12
              rounded-xl
              font-semibold
              text-white
              bg-gradient-to-r
              from-cyan-500
              to-blue-600
              hover:scale-[1.02]
              transition-all
              duration-300
              disabled:opacity-60
              flex
              justify-center
              items-center
              gap-2
            "
          >
            {loading ? (
              <>
                <FiLoader className="animate-spin text-lg" />
                Verifying...
              </>
            ) : (
              "Verify Email"
            )}
          </button>

          {/* Footer Text */}
          <p className="text-center text-gray-400 text-sm mt-6">
            Didn't receive the code?
            <button
              type="button"
              className="ml-2 text-cyan-400 hover:text-cyan-300"
            >
              Resend Code
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;