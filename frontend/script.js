// Load chart data
window.addEventListener('load', function() {
    fetch('http://localhost:3000/v1/prices/all')
      .then(response => response.json())
      .then(data => {
        // Extract labels and values from data
        const labels = data.map(obj => new Date(obj.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));
        const values = data.map(obj => obj.price);
  
        // Get chart canvas element
        const ctx = document.getElementById('myChart');
  
        // Configure chart data and options
        const chartData = {
          labels: labels,
          datasets: [{
            label: 'Price',
            data: values,
            fill: true,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.4,
            pointBackgroundColor: values.map((value, index) => value === Math.min(...values) ? 'green' : 'rgba(75, 192, 192, 1)')
          }]
        };
        const options = {
          responsive: true,
          maintainAspectRatio: true,
          scales: {
            x: {
              title: {
                display: true,
                text: 'Time'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Price (NOK)'
              },
              beginAtZero: true
            }
          }
        };
  
        // Create line chart instance
        const lineChart = new Chart(ctx, {
          type: 'line',
          data: chartData,
          options: options
        });
      })
      .catch(error => console.error(error));
  });
  
  // Load highest and lowest price data
  window.addEventListener('load', function() {
    fetch('http://localhost:3000/v1/prices/highlow')
      .then(response => response.json())
      .then(data => {
        // Get the element with id 'highlow'
        const highLowElement = document.getElementById('highlow');
  
        // Create new elements for highest and lowest price
        const highestPriceElement = document.createElement('p');
        highestPriceElement.textContent = `Strømmen er dyrest: ${data.highestPrice}, klokka ${new Date(data.highestPriceTime).toLocaleTimeString('en-GB')}`;
  
        const lowestPriceElement = document.createElement('p');
        lowestPriceElement.textContent = `Strømmen er billigst: ${data.lowestPrice}, at ${new Date(data.lowestPriceTime).toLocaleTimeString('en-GB')}`;
  
        // Append the new elements to the 'highlow' element
        highLowElement.appendChild(highestPriceElement);
        highLowElement.appendChild(lowestPriceElement);
      });
  });
  