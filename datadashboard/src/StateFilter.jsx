import React from 'react';

const StateFilter = ({ states, onSelectState }) => {
  return (
    <div>
      <label htmlFor="state">Filter by State:</label>
      <select id="state" onChange={(e) => onSelectState(e.target.value)}>
        <option value="">All States</option>
        {states.map((state, index) => (
          <option key={index} value={state}>{state}</option>
        ))}
      </select>
    </div>
  );
};

export default StateFilter;
