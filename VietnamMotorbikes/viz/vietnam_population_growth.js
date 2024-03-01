d3.csv("data/VietnamVehicles_1991-2022.csv", d3.autoType).then(
  function (vehicleData) {
    // Specify the chart’s dimensions.
    const width = 500;
    const height = 500;
    const marginTop = 10;
    const marginRight = 10;
    const marginBottom = 20;
    const marginLeft = 40;

    const x = d3
      .scaleLinear()
      .domain([0, Math.sqrt(d3.max(vehicleData, (d) => d["Population"]))])
      .range([marginLeft, width - marginRight]);

    const y = d3
      .scaleLinear()
      .domain([Math.sqrt(d3.max(vehicleData, (d) => d["Population"])), 0])
      .range([height - marginBottom, marginTop]);

    const svg = d3
      .select("#population_growth")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;");

    let beginning_data = vehicleData.filter((d) => d["Year"] == 1991)[0];
    let ending_data = vehicleData.filter((d) => d["Year"] == 2022)[0];

    svg
      .append("rect")
      .attr("fill", "grey")
      .attr("opacity", 0.3)
      .attr("stroke", "black")
      .attr("stroke-width", 0.3)
      .attr("y", 0)
      .attr("height", y(Math.sqrt(beginning_data["Population"])))
      .attr("x", 0)
      .attr("width", x(Math.sqrt(beginning_data["Population"])))
      .transition()
      .duration(2500)
      .attr("width", x(Math.sqrt(ending_data["Population"])))
      .attr("height", y(Math.sqrt(ending_data["Population"])));

    svg
      .append("rect")
      .attr("fill", "blue")
      .attr("opacity", 0.3)
      .attr("stroke", "black")
      .attr("stroke-width", 0.3)
      .attr("y", 0)
      .attr(
        "height",
        y(
          Math.sqrt(
            (beginning_data["Population"] *
              beginning_data["Urbanization Rate"]) /
              100,
          ),
        ),
      )
      .attr("x", 0)
      .attr(
        "width",
        x(
          Math.sqrt(
            (beginning_data["Population"] *
              beginning_data["Urbanization Rate"]) /
              100,
          ),
        ),
      )
      .transition()
      .duration(2500)
      .attr(
        "width",
        x(
          Math.sqrt(
            (ending_data["Population"] * ending_data["Urbanization Rate"]) /
              100,
          ),
        ),
      )
      .attr(
        "height",
        y(
          Math.sqrt(
            (ending_data["Population"] * ending_data["Urbanization Rate"]) /
              100,
          ),
        ),
      );

    // animate in population numbers - https://www.geeksforgeeks.org/how-to-make-animated-counter-using-javascript/
  },
);
