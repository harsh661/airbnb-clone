"use client";

import React from "react";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  outline?: boolean;
  secondary?: boolean;
  icon?: React.ReactElement;
  colored?: boolean;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  outline,
  icon,
  colored,
  secondary,
  loading = false,
}) => {
  let style = "bg-accent-pink text-white";

  if (colored) {
    style = "bg-black text-white";
  }
  if (secondary) {
    style = "bg-white text-black underline";
  }
  if (outline) {
    style = "border border-dark-gray bg-white text-black";
  }

  return (
    <button
      onClick={onClick}
      className={`${style} relative w-full font-bold rounded-md cursor-pointer p-3 flex items-center justify-center`}
      disabled={loading}
    >
      {loading ? (
        <span className="animate-spin">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
        </span>
      ) : (
        <>
          {text}
          {icon && <div className="absolute left-6">{icon}</div>}
        </>
      )}
    </button>
  );
};

export default Button;
