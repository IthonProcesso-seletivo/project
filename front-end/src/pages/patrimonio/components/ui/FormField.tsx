import React from "react";

interface FormFieldProps {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

export const FormField = ({ label, icon, children }: FormFieldProps) => (
  <div>
    <label
      style={{ color: "#374151" }}
      className="flex items-center gap-1.5 text-xs font-semibold mb-2"
    >
      {icon}
      {label}
    </label>
    {children}
  </div>
);
