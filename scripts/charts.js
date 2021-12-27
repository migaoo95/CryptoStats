class Charts {
  // Generate Charts ------------------------------------ { Charts }
  generateCharts(data) {
    const canvases = document.querySelectorAll(".canvases");
    // console.log("Data", data);
    canvases.forEach((canvas, index) => {
      // Price of each coin --------------- {}
      const sevenDayPrice = document
        .getElementById(`myChart${index}`)
        .parentElement.getElementsByTagName("h6")[3]
        .getElementsByTagName("span")[1].textContent;
      // If statement
      let color;
      const stetement = sevenDayPrice < 0 ? (color = "red") : (color = "green");
      // console.log("My Tag", sevenDayPrice);
      const ctx = document.getElementById(`myChart${index}`).getContext("2d");
      const myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: data[index].sparkline_in_7d.price,
          datasets: [
            {
              label: "# of Votes",
              data: data[index].sparkline_in_7d.price,
              backgroundColor: [color],
              borderColor: [color],
              borderWidth: 1,
            },
          ],
        },
        options: {
          elements: {
            point: {
              radius: 0,
            },
          },
          scales: {
            y: {
              beginAtZero: false,
              // Hide grid Lines y axis
              display: false,
            },
            // Hide grid Lines x axis
            x: {
              display: false,
            },
          },
          plugins: {
            // Remove tooltips
            tooltip: {
              enabled: false,
            },
            // Remove legend
            legend: {
              display: false,
            },
            // Remove grid
            gridlines: {
              display: false,
            },
          },
        },
      });
      // console.log(myChart);

      // console.log(canvas);
    });
  }
  generateSingleChart(coin, color) {
    console.log("Coin");
    const ctx = document.getElementById("myChartBoard").getContext("2d");

    const myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: coin.prices,
        datasets: [
          {
            label: "",
            data: coin.prices,
            backgroundColor: ["blue"],
            borderColor: ["blue"],
            borderWidth: 2,
          },
        ],
      },
      options: {
        elements: {
          point: {
            radius: 0.5,
          },
        },
        scales: {
          //   y: {
          //     beginAtZero: false,
          //     // Hide grid Lines y axis
          //     display: false,
          //   },
          // Hide grid Lines x axis
          x: {
            display: false,
          },
        },
        plugins: {
          // Remove tooltips
          tooltip: {
            callbacks: {
              title: function () {},
            },
          },
          // Remove legend
          legend: {
            display: false,
          },
          // Remove grid
          gridlines: {
            display: false,
          },
        },
      },
    });
    console.log(myChart);
  }
}
