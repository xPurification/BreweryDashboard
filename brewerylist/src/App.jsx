import React, { useState, useEffect } from 'react';

import BreweryList from './BreweryList';
import BreweryChart from './BreweryChart';
import './App.css';

const App = () => {
  const [breweries, setBreweries] = useState([]);
  const [summaryStatistics, setSummaryStatistics] = useState(null);

  useEffect(() => {
    const fetchBreweries = async () => {
      try {
        const response = await fetch('https://api.openbrewerydb.org/breweries?per_page=100');
        if (!response.ok) {
          throw new Error('Failed to fetch breweries');
        }
        const data = await response.json();
        setBreweries(data);
        calculateSummaryStatistics(data);
      } catch (error) {
        console.error('Error fetching breweries:', error);
      }
    };

    fetchBreweries();
  }, []);

  const calculateSummaryStatistics = (breweries) => {
    // Total number of breweries
    const totalBreweries = breweries.length;

    // Most common brewery type
    const typesCount = {};
    breweries.forEach(brewery => {
      typesCount[brewery.brewery_type] = (typesCount[brewery.brewery_type] || 0) + 1;
    });
    const mostCommonType = Object.keys(typesCount).reduce((a, b) => typesCount[a] > typesCount[b] ? a : b);

    // Average number of breweries per city
    const citiesCount = {};
    breweries.forEach(brewery => {
      citiesCount[brewery.city] = (citiesCount[brewery.city] || 0) + 1;
    });
    const totalCities = Object.keys(citiesCount).length;
    const averageBreweriesPerCity = totalBreweries / totalCities;

    // Set summary statistics
    setSummaryStatistics({ totalBreweries, mostCommonType, averageBreweriesPerCity });
  };

  return (
    <div className="container">
      <h1 className="title">🍺Open Brewery Dashboard🍺</h1>
      {summaryStatistics && (
        <div className="summary">
          <h2>Summary Statistics</h2>
          <p>Total Breweries: {summaryStatistics.totalBreweries}</p>
          <p>Most Common Brewery Type: {summaryStatistics.mostCommonType}</p>
          <p>Average Breweries per City: {summaryStatistics.averageBreweriesPerCity.toFixed(2)}</p>
        </div>
      )}
      <BreweryChart breweries={breweries} />
      <BreweryList breweries={breweries} />
    </div>
  );
};

export default App;
