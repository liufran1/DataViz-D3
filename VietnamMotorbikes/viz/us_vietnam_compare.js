createCarbonCompareBars = function () {
  // Set up margins and dimensions
  const margin = { top: 20, right: 20, bottom: 30, left: 300 };
  const width = 800 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;
  // Create SVG element
  const svg = d3
    .select("#us_vietnam_compare")
    .append("svg")
    .attr("width", 2 * width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  d3.csv("./data/USACarbonSources_1990-2020.csv", d3.autoType).then(
    function (USAcarbonSources) {
      d3.csv("./data/VietnamCarbonSources_1990-2020.csv", d3.autoType).then(
        function (VietnamcarbonSources) {
          const filteredUSData = USAcarbonSources.filter(
            (d) => d["Year"] == 2020,
          )
            .filter((d) => d["value"] > 0)
            .sort((a, b) => d3.descending(a.value, b.value));
          const filteredVNData = VietnamcarbonSources.filter(
            (d) => d["Year"] == 2020,
          ).filter((d) => d["value"] > 0);

          // TO DO: Fix scales
          const xScale1 = d3
            .scaleLinear()
            .domain([0, d3.max(filteredUSData, (d) => d.value)])
            .range([width, width * 2]);
          const xScale2 = d3
            .scaleLinear()
            .domain([0, d3.max(filteredVNData, (d) => d.value)])
            .range([width, 0]);

          const yScale = d3
            .scaleBand()
            .domain(filteredUSData.map((d) => d.variable))
            .range([0, height])
            .padding(0.1);

          svg
            .selectAll(".barUS")
            .data(filteredUSData)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", xScale1(width))
            .attr("y", (d) => yScale(d.variable))
            .attr("height", yScale.bandwidth())
            // .style("fill", (d) => colorScale(d.categories))
            .attr("width", 0)
            .transition()
            .duration(3000)
            .attr("width", (d) => xScale1(d.value));

          svg
            .selectAll(".barVN")
            .data(filteredVNData)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", xScale2(width))
            .attr("y", (d) => yScale(d.variable))
            .attr("height", yScale.bandwidth())
            // .style("fill", (d) => colorScale(d.categories))
            .attr("width", 0)
            .transition()
            .duration(3000)
            .attr("width", (d) => xScale2(width) - xScale2(d.value));

          // Add axes
          const xAxis1 = d3.axisBottom(xScale1);
          svg
            .append("g")
            .attr("class", "x-axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis1);

          // TO DO: Fix position of y-axis
          const yAxis = d3.axisLeft(yScale);
          svg.append("g").attr("class", "y-axis").call(yAxis);
        },
      );
    },
  );

  function update(step) {
    steps[step].call();
  }

  var steps = [
    function step0() {
      // TO DO: animate in US, highlight transportation
    },
    function step1() {
      // TO DO: animate in Vietnam
    },
    function step2() {},
  ];
  return {
    update: update,
  };
};
