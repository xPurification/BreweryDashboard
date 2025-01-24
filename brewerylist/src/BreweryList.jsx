import React, { useState } from 'react';
import SearchBar from './SearchBar';
import TypeFilter from './TypeFilter';
import StateFilter from './StateFilter';

const BreweryList = ({ breweries }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedState, setSelectedState] = useState('');

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const handleTypeSelect = (type) => {
    setSelectedType(type);
  };

  const handleStateSelect = (state) => {
    setSelectedState(state);
  };

  const getUniqueTypes = (breweries) => {
    const types = new Set();
    breweries.forEach(brewery => {
      types.add(brewery.brewery_type);
    });
    return Array.from(types);
  };
  
  const getUniqueStates = (breweries) => {
    const states = new Set();
    breweries.forEach(brewery => {
      states.add(brewery.state);
    });
    return Array.from(states);
  };  

  let filteredBreweries = breweries.filter(brewery =>
    brewery.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (selectedType) {
    filteredBreweries = filteredBreweries.filter(brewery =>
      brewery.brewery_type.toLowerCase() === selectedType.toLowerCase()
    );
  }

  if (selectedState) {
    filteredBreweries = filteredBreweries.filter(brewery =>
      brewery.state.toLowerCase() === selectedState.toLowerCase()
    );
  }

  return (
    <div>
      <h2>List of Breweries</h2>
      <SearchBar onSearch={handleSearch} />
      <TypeFilter
        types={getUniqueTypes(breweries)}
        onSelectType={handleTypeSelect}
      />
      <StateFilter
        states={getUniqueStates(breweries)}
        onSelectState={handleStateSelect}
      />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Location</th>
            <th>Street</th>
            <th>Details</th> {/* New column for details */}
          </tr>
        </thead>
        <tbody>
          {filteredBreweries.map(brewery => (
            <tr key={brewery.id}>
              <td><a href={brewery.website_url} target="_blank" rel="noopener noreferrer">{brewery.name}</a></td>
              <td>{brewery.brewery_type}</td>
              <td>{brewery.city}, {brewery.state}</td>
              <td>{brewery.street}</td>
              <td>🔗</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BreweryList;
