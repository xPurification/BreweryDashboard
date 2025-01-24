import React from 'react';

const BreweryDetail = ({ brewery }) => {
  // Render detailed information about the selected brewery
  return (
    <div>
      <h2>{brewery.name}</h2>
      <p>Type: {brewery.brewery_type}</p>
      <p>Location: {brewery.city}, {brewery.state}</p>
      <p>Street: {brewery.street}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default BreweryDetail;
