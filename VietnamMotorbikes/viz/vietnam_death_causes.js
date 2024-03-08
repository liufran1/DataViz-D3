createDeathBarGraphic = function () {
  d3.csv("./data/VietnamDeathCauses_1990-2019.csv", d3.autoType).then(
    function (deathData) {
      // Set up margins and dimensions
      const margin = { top: 20, right: 20, bottom: 30, left: 300 };
      const width = 800 - margin.left - margin.right;
      const height = 400 - margin.top - margin.bottom;

      // Create SVG element
      const svg = d3
        .select("#health_bar_chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // Filter data for the year 2019
      const filteredData = deathData
        .filter((d) => d["Year"] == 2019)
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

      const colorScale = d3
        .scaleOrdinal()
        .domain(filteredData.map((d) => d["categories"]))
        // .range([
        //   "#5E4FA2",
        //   "#3288BD",
        //   "#66C2A5",
        //   "#ABDDA4",
        //   "#E6F598",
        //   "#FFFFBF",
        //   "#FEE08B",
        //   "#FDAE61",
        //   "#F46D43",
        //   "#D53E4F",
        //   "#9E0142",
        // ]);
        .range(d3.schemeCategory10);

      // Create bars
      svg
        .selectAll(".bar")
        .data(filteredData)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", 0)
        .attr("y", (d) => yScale(d.variable))
        .attr("height", yScale.bandwidth())
        .style("fill", (d) => colorScale(d.categories))
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

  var steps = [function step0() {}, function step1() {}];

  return {
    update: update,
  };
};
