window.addEventListener("load", function () {
  fetch("http://localhost:3000/v1/prices/today", {
    // Example api key
    headers: {
      "X-API-KEY": "abc12345abc12345abc12345abc12345abc12345abc12345",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // Extract labels and values from data
      const labels = data.map((obj) =>
        new Date(obj.time).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
      const values = data.map((obj) => obj.price);

      // Get chart canvas element
      const ctx = document.getElementById("myChart");

      // Find the minimum and maximum values
      const minValue = Math.min(...values);
      const maxValue = Math.max(...values);

      const lowestColor = "green";
      const highestColor = "red";
      const baseColor = "#fff";
      const yGridColor = "#AEAEAE";
      const xGridColor = "#AEAEAE";

      // Create an array of colors for each point in the dataset
      const pointColors = values.map((value) => {
        if (value === minValue) {
          return lowestColor;
        } else if (value === maxValue) {
          return highestColor;
        } else {
          return baseColor;
        }
      });

      // Configure chart data and options
      const chartData = {
        labels: labels,
        datasets: [
          {
            label: "Price",
            data: values,
            fill: true,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgb(255, 99, 132)",
            borderColor: baseColor,
            tension: 0.4,
            pointBackgroundColor: pointColors,
            pointRadius: values.map((value, index) =>
              value === Math.min(...values) || value === Math.max(...values)
                ? 5
                : 3
            ),
          },
        ],
      };
      const options = {
        plugins: {
          legend: {
            display: false,
          },
        },
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          x: {
            title: {
              display: false,
              text: "Time",
            },
            grid: {
              display: false,
              color: xGridColor, // Set the color of the grid lines
            },
          },
          y: {
            title: {
              display: false,
              text: "Price (NOK)",
            },
            beginAtZero: true,
            ticks: {
              callback: function (value) {
                return (value / 1000).toLocaleString("nb-NO", {
                  style: "currency",
                  currency: "NOK",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                });
              },
            },
            grid: {
              display: true,
              color: yGridColor, // Set the color of the grid lines
            },
          },
        },
      };

      // Create line chart instance
      const lineChart = new Chart(ctx, {
        type: "line",
        data: chartData,
        options: options,
      });
    })
    .catch((error) => console.error(error));
});

// Load highest and lowest price data
window.addEventListener("load", function () {
  fetch("http://localhost:3000/v1/prices/highlow", {
    // Example api key
    headers: {
      "X-API-KEY": "abc12345abc12345abc12345abc12345abc12345abc12345",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // Get the element with id 'highlow'
      const highLowElement = document.getElementById("header");

      // Create new elements for highest and lowest price
      const highestPriceElement = document.createElement("p");
      highestPriceElement.textContent = `Strømmen er dyrest klokka ${new Date(
        data.highestPriceTime
      ).toLocaleTimeString("nb-NO", {
        hour: "2-digit",
        minute: "2-digit"
      })}`;
      
      const lowestPriceElement = document.createElement("p");
      lowestPriceElement.textContent = `Strømmen er billigst klokka: ${new Date(
        data.lowestPriceTime
      ).toLocaleTimeString("nb-NO", {
        hour: "2-digit",
        minute: "2-digit"
      })}`;
      

      // Append the new elements to the 'highlow' element
      highLowElement.appendChild(highestPriceElement);
      highLowElement.appendChild(lowestPriceElement);
    });
});

window.addEventListener("load", function () {
  fetch("http://localhost:3000/v1/prices/average", {
    // Example api key
    headers: {
      "X-API-KEY": "abc12345abc12345abc12345abc12345abc12345abc12345",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Gjennomsnitts pris idag: ', (data / 1000).toLocaleString("nb-NO", {
        style: "currency",
        currency: "NOK",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }))
})});