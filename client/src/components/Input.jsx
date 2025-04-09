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

  // const handleToggle = () => setShowPassword((prev) => !prev);
  const handleToggle = () => setShowPassword(!showPassword);


  return (
    <div className="mb-4">
      <label className="block mb-1 font-medium">{label}</label>
      <div className="flex items-center border rounded-md px-3 py-2 relative">
        {/* <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          {icon}
        </span> */}
        {icon && <span className="mr-2 text-gray-500">{icon}</span>}
        <input
          type={isPassword && showPassword ? "text" : type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full outline-none pr-8"
        />
        {isPassword && (
          <span
            className="absolute right-3 cursor-pointer text-gray-500"
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
