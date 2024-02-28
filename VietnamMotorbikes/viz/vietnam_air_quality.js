let svgPM25 = d3
  .select("#pmline")
  .append("svg")
  .attr("height", svgHeight) // TO DO - Make adaptive
  .attr("width", svgWidth);

let groupPM25 = svgPM25.append("g");

d3.csv("data/VietnamVsNYCpmpollution_2023.csv", d3.autoType).then(
  function (carbonSources) {
    // console.log(vehicleData);
    
    let xScale = d3
      .scaleLinear()
      .domain(d3.extent(carbonSources, (d) => d["date"]))
      .range([0, svgWidth]);
    
    let yScale = d3
      .scaleLinear()
      .domain([0, d3.max(carbonSources, (d) => d["pm25"])])
      .range([svgHeight, 0]);

    drawLineChart(
      carbonSources,
      groupPM25,
      xScale,
      yScale,
      "date",
      "pm25",
      "blue",
      "hanoiPMline",
    );