let carbonData = d3.csv(
  "https://raw.githubusercontent.com/liufran1/DataViz-D3/master/VietnamMotorbikes/data/VietnamCO2_1991-2022.csv",
  d3.autoType,
);

// let svgHeight = 500;
// let svgWidth = 500;

let svgLine = d3
  .select("#line1")
  .append("svg")
  .attr("height", 500)
  .attr("width", 500);

// let xScale = d3
//   .scaleLinear()
//   .domain(d3.extent(vehicleData, (d) => d["Year"]))
//   .range([0, svgWidth]);
// let yScale1 = d3
//   .scaleLinear()
//   .domain([0, d3.max(vehicleData, (d) => d["Population"])])
//   .range([svgHeight, 0]);
// let yScale2 = d3
//   .scaleLinear()
//   .domain([0, d3.max(gdpData, (d) => d["GDPperCapita"])])
//   .range([svgHeight, 0]);
// let yScale3 = d3
//   .scaleLinear()
//   .domain([0, d3.max(carbonData, (d) => d["CO2_emissions"])])
//   .range([svgHeight, 0]);

let groupLine = svgLine.append("g");

function drawLineChart(
  dataset,
  groupElement,
  xScale,
  yScale,
  xVariable,
  yVariable,
  elementID,
) {
  let graph = groupElement
    .append("path")
    .datum(dataset)
    .attr(
      "d",
      d3
        .line()
        .x((d) => xScale(d[xVariable]))
        .y((d) => yScale(d[yVariable])),
    )
    .attr("stroke", "black")
    .attr("stroke-width", 0.5)
    .attr("fill", "none")
    .attr("id", elementID);

  graph
    .attr("stroke-dashoffset", graph.node().getTotalLength()) // Animation trick from https://medium.com/@louisemoxy/create-a-d3-line-chart-animation-336f1cb7dd61
    .attr("stroke-dasharray", graph.node().getTotalLength())
    .transition()
    .ease(d3.easeSin)
    .duration(3000)
    .attr("stroke-dashoffset", 0);
  return graph;
}

d3.csv("data/VietnamVehicles_1991-2022.csv", d3.autoType).then(
  function (vehicleData) {
    // console.log(vehicleData);
    let xScale = d3
      .scaleLinear()
      .domain(d3.extent(vehicleData, (d) => d["Year"]))
      .range([0, svgWidth]);
    let yScale1 = d3
      .scaleLinear()
      .domain([0, d3.max(vehicleData, (d) => d["Population"])])
      .range([svgHeight, 0]);

    drawLineChart(
      vehicleData,
      groupLine,
      xScale,
      yScale1,
      "Year",
      "Population",
      "populationLine",
    );

    drawLineChart(
      vehicleData,
      groupLine,
      xScale,
      yScale1,
      "Year",
      "Total number of registered motorcycles",
      "motorcycleLine",
    );

    d3.csv("data/VietnamGDPpcap_1991-2022.csv", d3.autoType).then(
      function (gdpData) {
        let yScale2 = d3
          .scaleLinear()
          .domain([0, d3.max(gdpData, (d) => d["GDPperCapita"])])
          .range([svgHeight, 0]);

        drawLineChart(
          gdpData,
          groupLine,
          xScale,
          yScale2,
          "Year",
          "GDPperCapita",
          "gdpLine",
        );
      },
    );
  },
);

// drawLineChart(g, yScale1, "Population", "populationLine");
// drawLineChart(
//   g,
//   yScale1,
//   "Total number of registered motorcycles",
//   "motorcycleLine",
// );
// drawLineChart(gdpData, g, yScale2, "GDPperCapita", "gdpLine");
// drawLineChart(carbonData, g, yScale3, "CO2_emissions", "co2Line");
