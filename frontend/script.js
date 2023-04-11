window.addEventListener("load", function () {
  fetch('http://localhost:3000/v1/prices/all', {
  headers: {
    'X-API-KEY': 'api123'
  }
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

      console.log(values);

      // Get chart canvas element
      const ctx = document.getElementById("myChart");

      // Find the minimum and maximum values
      const minValue = Math.min(...values);
      const maxValue = Math.max(...values);

      const lowestColor = "green";
      const highestColor = "red";
      const baseColor = "rgba(75, 192, 192, 1)";

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
            borderColor: "rgb(75, 192, 192)",
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
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          x: {
            title: {
              display: true,
              text: "Time",
            },
          },
          y: {
            title: {
              display: true,
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
  fetch('http://localhost:3000/v1/prices/highlow', {
  headers: {
    'X-API-KEY': 'api123'
  }
})
    .then((response) => response.json())
    .then((data) => {
      // Get the element with id 'highlow'
      const highLowElement = document.getElementById("highlow");

      // Create new elements for highest and lowest price
      const highestPriceElement = document.createElement("p");
      highestPriceElement.textContent = `Strømmen er dyrest: ${(
        data.highestPrice / 1000
      ).toLocaleString("nb-NO", {
        style: "currency",
        currency: "NOK",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })} klokka ${new Date(data.highestPriceTime).toLocaleTimeString(
        "en-GB"
      )}`;

      const lowestPriceElement = document.createElement("p");
      lowestPriceElement.textContent = `Strømmen er biligst: ${(
        data.lowestPrice / 1000
      ).toLocaleString("nb-NO", {
        style: "currency",
        currency: "NOK",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })} at ${new Date(data.lowestPriceTime).toLocaleTimeString("en-GB")}`;

      // Append the new elements to the 'highlow' element
      highLowElement.appendChild(highestPriceElement);
      highLowElement.appendChild(lowestPriceElement);
    });
});
