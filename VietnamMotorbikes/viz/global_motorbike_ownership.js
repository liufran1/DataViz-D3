createMotorbikeBarsGraphic = function () {
  var graphicEl = d3.select("#motorbike_ownership_bar");
  var graphicVisEl = graphicEl.select(".graphic__vis");

  // var globalParams = {};

  d3.csv(
    "https://raw.githubusercontent.com/liufran1/DataViz-D3/master/VietnamMotorbikes/data/global_motorbike_ownership.csv",
    d3.autoType,
  ).then(function (ownershipData) {
    initBars(ownershipData);
  });

  function initBars(ownershipData) {
    // TO DO: Make this consistent with the other viz
    const margin = { top: 20, right: 20, bottom: 30, left: 30 };
    const width = 1000 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = graphicVisEl
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Create scales
    const yScale = d3.scaleLinear().domain([0, 100]).range([height, 0]);

    const xScale = d3
      .scaleBand()
      .domain(ownershipData.map((d) => d["Country"]))
      .range([0, width])
      .padding(0.2);

    const colorScale = d3
      .scaleOrdinal()
      .domain(ownershipData.map((d) => d["SEAsia"]))
      .range(["#5E4FA2", "#3288BD"]);
    // TO DO - update colors

    let g = svg.append("g");
    // Create bars
    g.selectAll(".barBackground")
      .data(ownershipData)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("y", (d) => yScale(100))
      .attr("x", (d) => xScale(d["Country"]))
      .attr("width", xScale.bandwidth())
      .attr("fill", "#ffffff")
      .attr("stroke", "#000000")
      .attr("height", yScale(0) - yScale(100));

    g.selectAll(".barFill")
      .data(ownershipData)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => xScale(d["Country"]))
      .attr("width", xScale.bandwidth())
      .style("fill", (d) => colorScale(d["SEAsia"]))
      .attr("height", 0)
      .attr("y", (d) => yScale(0) - yScale(100))
      .attr("id", "motorbikeOwnsBar");

    // // Add axes
    const xAxis = d3.axisBottom(xScale);
    svg
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    const yAxis = d3.axisLeft(yScale);
    svg.append("g").attr("class", "y-axis").call(yAxis);

    // globalParams["yScale"] = yScale;
    // globalParams["colorScale"] = colorScale;

    d3.selectAll("#motorbikeOwnsBar")
      .transition()
      .ease(d3.easeSin)
      .duration(3000)
      .attr("y", (d) => yScale(d["HouseholdMotorbikeOwnership"]))
      .attr(
        "height",
        (d) => yScale(0) - yScale(d["HouseholdMotorbikeOwnership"]),
      );
  }
  function update(step) {
    steps[step].call();
  }

  var steps = [
    function step0() {
      // TO DO: data step: animate in bars, highlight SEAsia
      // d3.selectAll("#motorbikeOwnsBar").attr("fill", (d) =>
      //   globalParams["colorScale"].call(d["SEAsia"]),
      // );
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
