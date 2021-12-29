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
          events: [],

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
            crosshair: {
              enabled: false,
            },
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
    const ctx = document.getElementById("myChartBoard").getContext("2d");

    const myChart = new Chart(ctx, {
      type: "line",

      data: {
        labels: coin.prices,
        datasets: [
          {
            label: "",
            data: coin.prices,
            backgroundColor: ["#5bc0de"],
            borderColor: ["#5bc0de"],
            borderWidth: 2,
            showLine: true,
            fill: false,
            tension: 0.1,
            pointRadius: 0,
            interpolate: true,
          },
        ],
      },
      options: {
        crosshair: {
          color: "#000",
        },
        elements: {
          point: {
            radius: 1,
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
          crosshair: {
            color: "#000",

            sync: {
              enabled: false,
            },
            zoom: {
              enabled: false,
            },
            snap: {
              enabled: false,
            },
          },
          tooltip: {
            // titleFont: {
            //   size: 100,
            // },
            bodyFont: {
              size: 20,
            },
            displayColors: false,
            mode: "index",
            intersect: false,
            callbacks: {
              title: function () {},
            },
          },
          hover: {
            intersect: true,
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
  }
}
