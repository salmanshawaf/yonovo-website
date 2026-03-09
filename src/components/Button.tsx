import { ButtonHTMLAttributes } from "react";

type ButtonProps = {
  variant?: "primary" | "secondary" | "brand" | "ghost-light" | "ghost-dark";
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
  brand: "bg-brand-green text-brand-green-text hover:bg-brand-green-hover shadow-[0_0_20px_rgba(90,239,118,0.3)]",
  "ghost-light": "bg-transparent text-white border border-white/30 hover:bg-white/10",
  "ghost-dark": "bg-transparent text-foreground border border-zinc-200 hover:bg-zinc-100",
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
