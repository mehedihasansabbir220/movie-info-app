// src/components/SearchBar.tsx
import React from 'react';

// Props interface for type safety
interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  searchTerm, 
  onSearchChange 
}) => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="
          w-full 
          px-4 
          py-3 
          rounded-full 
          bg-white 
          text-gray-800 
          focus:outline-none 
          focus:ring-2 
          focus:ring-blue-500
          shadow-md
        "
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-4">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6 text-gray-500" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
          />
        </svg>
      </div>
    </div>
  );
};

export default SearchBar;