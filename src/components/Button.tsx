import { ButtonHTMLAttributes } from "react";

type ButtonProps = {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
} & ButtonHTMLAttributes<HTMLButtonElement>;

const sizeClasses = {
  sm: "px-4 py-1.5 text-sm",
  md: "px-6 py-2.5 text-base",
  lg: "px-8 py-3 text-lg",
};

const variantClasses = {
  primary: "bg-primary text-white hover:bg-primary/90 shadow-inner-sm",
  secondary: "bg-white text-primary border border-primary hover:bg-surface",
};

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`rounded-md font-medium transition-all duration-200 cursor-pointer ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
