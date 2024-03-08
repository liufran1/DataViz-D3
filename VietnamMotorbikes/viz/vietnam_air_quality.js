createPollutionLines = function () {
  let svgPM = d3
    .select("#pmline")
    .append("svg")
    .attr("height", svgHeight) // TO DO - Make adaptive
    .attr("width", svgWidth);

  let groupPM25 = svgPM.append("g");

  d3.csv("data/VietnamVsNYCpmpollution_2023.csv", d3.autoType).then(
    function (pollutionData) {
      // console.log(vehicleData);

      let xScale = d3
        .scaleLinear()
        .domain(d3.extent(pollutionData, (d) => d["date"]))
        .range([0, svgWidth]);

      let yScale = d3
        .scaleLinear()
        .domain([0, d3.max(pollutionData, (d) => d["pm25"])])
        .range([svgHeight, 0]);

      drawLineChart(
        pollutionData.filter((d) => d["city"] === "Hanoi"),
        groupPM25,
        xScale,
        yScale,
        "date",
        "pm25",
        "blue",
        "hanoiPMline",
      );
      drawLineChart(
        pollutionData.filter((d) => d["city"] === "New York"),
        groupPM25,
        xScale,
        yScale,
        "date",
        "pm25",
        "orange",
        "nycPMline",
      );

      groupPM25
        .append("rect")
        .attr("y", yScale(50))
        .attr("height", yScale(50))
        .attr("fill", "grey")
        .attr("opacity", 0.3)
        .attr("stroke", "black")
        .attr("stroke-width", 0.3)
        .attr("x", 0)
        .attr("width", 0) // Initial width of 0 for animation
        .transition()
        .duration(2500) // Duration of the animation
        .attr("width", svgWidth);
    },
  );

  function update(step) {
    steps[step].call();
  }

  var steps = [
    function step0() {
      // TO DO: animate in Hanoi
      groupPM25
        .selectAll("#hanoiPMline")
        .transition()
        .ease(d3.easeSin)
        .duration(500)
        .attr("stroke-dashoffset", 0);
    },
    function step1() {
      // TO DO: animate in NYC
      groupPM25
        .selectAll("#nycPMline")
        .transition()
        .ease(d3.easeSin)
        .duration(500)
        .attr("stroke-dashoffset", 0);
    },
    function step2() {},
  ];
  return {
    update: update, // make the update function callable as var graphic = createGraphic(".graphic"); graphic.update
  };
};
