import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const variants = {
      primary:
        "bg-black text-white neo-btn hover:bg-gray-800",
      secondary:
        "bg-white text-black neo-btn hover:bg-gray-50",
      outline:
        "bg-white text-black neo-btn hover:bg-gray-50",
      ghost:
        "bg-transparent text-black border-none shadow-none hover:bg-gray-100 font-bold uppercase tracking-wide",
      danger:
        "bg-black text-white neo-btn hover:bg-gray-800",
    };

    const sizes = {
      sm: "px-4 py-2 text-xs",
      md: "px-6 py-3 text-sm",
      lg: "px-8 py-4 text-base",
    };

    return (
      <button
        ref={ref}
        className={cn(variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export { Button };
