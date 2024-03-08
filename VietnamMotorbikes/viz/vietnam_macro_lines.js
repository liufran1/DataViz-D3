createMacroLinesGraphic = function () {
  var graphicEl = d3.select("#macro_lines");
  var graphicVisEl = graphicEl.select(".graphic__vis");
  var graphicProseEl = graphicEl.select(".graphic__prose");

  d3.csv("data/VietnamVehicles_1991-2022.csv", d3.autoType).then(
    function (vehicleData) {
      d3.csv("data/VietnamGDPpcap_1991-2022.csv", d3.autoType).then(
        function (gdpData) {
          d3.csv("data/VietnamCO2_1991-2022.csv", d3.autoType).then(
            function (carbonData) {
              initLines(vehicleData, gdpData, carbonData);
              // setupProse(graphicProseEl);
            },
          );
        },
      );
    },
  );

  function initLines(vehicleData, gdpData, carbonData) {
    const svg = graphicVisEl
      .append("svg")
      .attr("height", svgHeight)
      .attr("width", svgWidth);

    const g = svg.append("g");

    let xScale = d3
      .scaleLinear()
      .domain(d3.extent(vehicleData, (d) => d["Year"]))
      .range([0, svgWidth]);

    let yScale1 = d3
      .scaleLinear()
      .domain([0, d3.max(vehicleData, (d) => d["Population"])])
      .range([svgHeight, 0]);

    let yScale2 = d3
      .scaleLinear()
      .domain([0, d3.max(gdpData, (d) => d["GDPperCapita"])])
      .range([svgHeight, 0]);

    let yScale3 = d3
      .scaleLinear()
      .domain([0, d3.max(carbonData, (d) => d["CO2_emissions"])])
      .range([svgHeight, 0]);

    drawLineChart(
      vehicleData,
      g,
      xScale,
      yScale1,
      "Year",
      "Population",
      "blue",
      "populationLine",
    );

    drawLineChart(
      vehicleData,
      g,
      xScale,
      yScale1,
      "Year",
      "Total number of registered motorcycles",
      "red",
      "motorcycleLine",
    );

    drawLineChart(
      gdpData,
      g,
      xScale,
      yScale2,
      "Year",
      "GDPperCapita",
      "orange",
      "gdpLine",
    );

    drawLineChart(
      carbonData,
      g,
      xScale,
      yScale3,
      "Year",
      "CO2_emissions",
      "green",
      "co2Line",
    );
  }

  function update(step) {
    steps[step].call();
  }

  var steps = [
    function step0() {
      graphicVisEl
        .select("#populationLine")
        .transition()
        .ease(d3.easeSin)
        .duration(500)
        .attr("stroke-dashoffset", 0);
    },
    function step1() {
      graphicVisEl.select("#populationLine").attr("stroke", "grey");

      graphicVisEl
        .select("#gdpLine")
        .transition()
        .ease(d3.easeSin)
        .duration(500)
        .attr("stroke-dashoffset", 0);
    },
    function step2() {
      graphicVisEl.select("#gdpLine").attr("stroke", "grey");

      graphicVisEl
        .select("#motorcycleLine")
        .transition()
        .ease(d3.easeSin)
        .duration(500)
        .attr("stroke-dashoffset", 0);
    },
    function step3() {
      graphicVisEl.select("#motorcycleLine").attr("stroke", "grey");

      graphicVisEl
        .select("#co2Line")
        .transition()
        .ease(d3.easeSin)
        .duration(500)
        .attr("stroke-dashoffset", 0);
    },
  ];

  return {
    update: update,
  };
};
// createMacroLinesGraphic();

function drawLineChart(
  dataset,
  groupElement,
  xScale,
  yScale,
  xVariable,
  yVariable,
  color,
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
    .attr("stroke", color)
    .attr("stroke-width", 0.5)
    .attr("fill", "none")
    .attr("id", elementID);

  console.log(
    "Node length for " + elementID + " : " + graph.node().getTotalLength(),
  );

  graph
    .attr("stroke-dashoffset", graph.node().getTotalLength()) // Animation trick from https://medium.com/@louisemoxy/create-a-d3-line-chart-animation-336f1cb7dd61
    .attr("stroke-dasharray", graph.node().getTotalLength());

  return graph;
}
