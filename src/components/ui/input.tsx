import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label
            htmlFor={id}
            className="text-sm font-bold uppercase tracking-wide"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            "neo-input w-full",
            error && "border-danger",
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-xs font-semibold text-danger">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export { Input };
