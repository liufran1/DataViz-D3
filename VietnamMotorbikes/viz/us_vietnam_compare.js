createCarbonCompareBars = function () {
  d3.csv("./data/USACarbonSources_1990-2020.csv", d3.autoType).then(
    function (USAcarbonSources) {
      // Set up margins and dimensions
      const margin = { top: 20, right: 20, bottom: 30, left: 300 };
      const width = 800 - margin.left - margin.right;
      const height = 400 - margin.top - margin.bottom;

      // Create SVG element
      const svg = d3
        .select("#us_vietnam_compare")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // Filter data for the year 2019
      const filteredData = USAcarbonSources.filter((d) => d["Year"] == 2020)
        .filter((d) => d["value"] > 0)
        .sort((a, b) => d3.descending(a.value, b.value));

      // Create scales
      const xScale = d3
        .scaleLinear()
        .domain([0, d3.max(filteredData, (d) => d.value)])
        .range([0, width]);

      const yScale = d3
        .scaleBand()
        .domain(filteredData.map((d) => d.variable))
        .range([0, height])
        .padding(0.1);

      svg
        .selectAll(".bar")
        .data(filteredData)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", 0)
        .attr("y", (d) => yScale(d.variable))
        .attr("height", yScale.bandwidth())
        // .style("fill", (d) => colorScale(d.categories))
        .attr("width", 0)
        .transition()
        .duration(3000)
        .attr("width", (d) => xScale(d.value));

      // Add axes
      const xAxis = d3.axisBottom(xScale);
      svg
        .append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

      const yAxis = d3.axisLeft(yScale);
      svg.append("g").attr("class", "y-axis").call(yAxis);
    },
  );
  function update(step) {
    steps[step].call();
  }

  var steps = [
    function step0() {
      // TO DO: data step: animate in bars, highlight SEAsia
    },
    function step1() {
      // TO DO: data step: fade out everything but Vietnam
    },
    function step2() {},
  ];
  return {
    update: update, // make the update function callable as var graphic = createGraphic(".graphic"); graphic.update
  };
};
