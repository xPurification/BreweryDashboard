import React from 'react';

const SearchBar = ({ onSearch }) => {
  const handleSearchChange = (event) => {
    const searchTerm = event.target.value;
    onSearch(searchTerm);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a brewery..."
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default SearchBar;
