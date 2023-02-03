import React from "react";

function Button({ onClick, children, full, bgColor = "primary" }) {
  let bgClassName = "bg-primary";
  switch (bgColor) {
    case "primary":
      bgClassName = "bg-primary";
      break;
    case "secondary":
      bgClassName = "bg-secondary";
      break;
    default:
      break;
  }

  return (
    <button
      onClick={onClick}
      className={`${
        full ? "w-full" : ""
      } ${bgClassName} rounded-lg py-3 px-6 capitalize mt-auto`}
    >
      {children}
    </button>
  );
}

export default Button;
