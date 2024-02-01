// SearchBar.tsx
import React from 'react';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <label>
        Search:
        <input type="text" value={searchTerm} onChange={handleSearchChange} />
      </label>
    </div>
  );
};

export default SearchBar;
