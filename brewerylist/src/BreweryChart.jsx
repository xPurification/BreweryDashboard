import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';

const BreweryChart = ({ breweries }) => {
  useEffect(() => {
    // Count the occurrences of each brewery type
    const typeCounts = {};
    breweries.forEach(brewery => {
      typeCounts[brewery.brewery_type] = (typeCounts[brewery.brewery_type] || 0) + 1;
    });

    // Extract labels and data for the chart
    const labels = Object.keys(typeCounts);
    const data = labels.map(label => typeCounts[label]);

    // Destroy existing chart instance, if any
    const existingChart = Chart.getChart('breweryChart');
    if (existingChart) {
      existingChart.destroy();
    }

    // Create a new Chart instance
    const ctx = document.getElementById('breweryChart');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Brewery Types',
          data: data,
          backgroundColor: 'rgba(255, 99, 132, 0.5)', // Customize the color
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }, [breweries]);

  return (
    <div>
      <h2>Brewery Type Distribution</h2>
      <canvas id="breweryChart" width="400" height="200"></canvas>
      <p>As you can see, the micro brewery type is by far the most common.</p>
    </div>
  );
};

export default BreweryChart;