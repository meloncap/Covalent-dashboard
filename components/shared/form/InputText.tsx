import React from "react";

interface Props {
  value?: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

export const InputText = ({ value, onChange, placeholder }: Props) => {
  return (
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
      type="text"
      id="rounded-email"
      className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm shadow appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
      placeholder={placeholder}
    />
  );
};
