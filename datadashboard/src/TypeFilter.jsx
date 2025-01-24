import React from 'react';

const TypeFilter = ({ types, onSelectType }) => {
  return (
    <div>
      <label htmlFor="type">Filter by Type:</label>
      <select id="type" onChange={(e) => onSelectType(e.target.value)}>
        <option value="">All Types</option>
        {types.map((type, index) => (
          <option key={index} value={type}>{type}</option>
        ))}
      </select>
    </div>
  );
};

export default TypeFilter;
