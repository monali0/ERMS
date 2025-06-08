import * as React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", ...props }, ref) => {
    const base = "px-4 py-2 rounded-2xl shadow-sm text-sm font-medium ";
    const style =
      variant === "default"
        ? "bg-blue-600 text-white hover:bg-blue-700"
        : "bg-gray-200 text-gray-800 hover:bg-gray-300";
    return (
      <button
        ref={ref}
        className={base + style + " " + className}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
