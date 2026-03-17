import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Input = ({
  label,
  name,
  type,
  value,
  onChange,
  placeholder,
  icon,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  const handleToggle = () => setShowPassword(!showPassword);

  return (
    <div className="mb-4">
      <label className="block mb-1 font-medium text-gray-700">{label}</label>

      <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 relative bg-white focus-within:ring-2 focus-within:ring-indigo-500 transition">

        {icon && <span className="mr-2 text-gray-400">{icon}</span>}

        <input
          type={isPassword && showPassword ? "text" : type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full outline-none bg-transparent text-gray-700 placeholder-gray-400 pr-8"
        />

        {isPassword && (
          <span
            className="absolute right-3 cursor-pointer text-gray-400 hover:text-gray-600"
            onClick={handleToggle}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </span>
        )}
      </div>

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Input;