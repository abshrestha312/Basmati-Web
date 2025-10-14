import React from "react";
import { cn } from "@/utils";

const alertVariants = {
  default: "bg-white text-gray-900 border-gray-200",
  destructive: "border-red-200 text-red-800 bg-red-50 [&>svg]:text-red-600",
};

export function Alert({ className, variant = "default", ...props }) {
  return (
    <div
      role="alert"
      className={cn(
        "relative w-full rounded-lg border p-4 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-gray-900 [&>svg~*]:pl-7",
        alertVariants[variant],
        className
      )}
      {...props}
    />
  );
}

export function AlertDescription({ className, ...props }) {
  return (
    <div
      className={cn("text-sm [&_p]:leading-relaxed", className)}
      {...props}
    />
  );
}