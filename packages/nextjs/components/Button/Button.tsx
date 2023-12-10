// components/Button.tsx
import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition ease-in duration-200 text-center text-base shadow-md focus:bg-blue-600 hover:bg-blue-500 bg-blue-400 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
