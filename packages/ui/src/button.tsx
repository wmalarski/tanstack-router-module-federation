"use client";

import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  appName: string;
}

export const Button = ({ children, className, appName }: ButtonProps) => {
  return (
    <button
      className={`bg-red-500 p-8 ${className}`}
      onClick={() => alert(`Hello from your ${appName} app!`)}
      type="button"
    >
      {children}
    </button>
  );
};
