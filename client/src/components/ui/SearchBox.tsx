import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

interface SearchBoxProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  size?: "sm" | "md" | "lg";
  variant?: "minimal" | "elevated";
  trigger?: "onchange" | "enter";
  className?: string;
}

interface SearchBoxProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  size?: "sm" | "md" | "lg";
  variant?: "minimal" | "elevated";
  className?: string;
}

export const SearchBox: React.FC<SearchBoxProps> = ({
  placeholder = "Search...",
  onSearch,
  size = "md",
  variant = "minimal",
  trigger = "enter",
  className = "",
}) => {
  const [query, setQuery] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (trigger === "onchange" && onSearch) {
      onSearch(query);
    }
    if (e.key === "Enter" && onSearch) {
      onSearch(query);
    }
  };

  const baseSize = {
    sm: "pl-8 pr-3 py-1.5 text-sm rounded-lg",
    md: "pl-10 pr-4 py-2 text-sm rounded-xl",
    lg: "pl-12 pr-5 py-3 text-base rounded-2xl",
  }[size];

  const baseVariant = {
    minimal:
      "bg-white border border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
    elevated:
      "bg-white/70 backdrop-blur-md border border-gray-200 shadow-md focus:ring-2 focus:ring-indigo-500",
  }[variant];

  return (
    <div className={`relative w-full ${className}`}>
      <FiSearch
        className={`absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 ${
          size === "lg" ? "w-5 h-5" : "w-4 h-4"
        }`}
      />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={`w-full outline-none text-black ${baseSize} ${baseVariant}`}
      />
    </div>
  );
};
