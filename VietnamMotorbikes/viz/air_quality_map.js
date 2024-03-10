createPollutionMapGraphic = function () {
  let svgHeight = 500;
  let svgWidth = 1000;
  const svg = d3
    .select("#air_quality_map")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);

  const g = svg.append("g");

  var colors = d3 //TO DO - refine colors
    .scaleQuantize()
    .domain([0, 15])
    // .range(d3.interpolateYlOrRd);
    .range([
      "#5E4FA2",
      "#3288BD",
      "#66C2A5",
      "#ABDDA4",
      "#E6F598",
      "#FFFFBF",
      "#FEE08B",
      "#FDAE61",
      "#F46D43",
      "#D53E4F",
      "#9E0142",
    ]);

  d3.json("data/middle_income_pollution_map.geojson").then(
    function (middle_income_exposure_deaths) {
      console.log("Map Script loaded");

      const projection = d3
        .geoIdentity()
        .reflectY(true)
        .fitHeight(svgHeight, middle_income_exposure_deaths);

      const pathGenerator = d3.geoPath(projection);

      g.selectAll("path")
        .data(middle_income_exposure_deaths.features)
        .enter()
        .append("path")
        .attr("opacity", 1)
        .attr("d", pathGenerator)
        .attr("fill", (d) => colors(d.properties["percentAirPollutionDeaths"]))
        // .attr("id", "mapPopulationDist")
        .attr("stroke", "black")
        .attr("stroke-width", 0.5);

      // g.selectAll("path")
      //   .data(countries.features)
      //   .enter()
      //   .append("path")
      //   .attr("opacity", 0.1)
      //   .attr("d", pathGenerator);
    },
  );
  function update(step) {
    steps[step].call();
  }

  var steps = [
    function step0() {
      g.selectAll("path").attr("opacity", (d) =>
        d.properties["Entity"] == "Vietnam" ? 1 : 0,
      );
      g.transition()
        .duration(500)
        .ease(d3.easeSin)
        .attr("transform", "translate(-5500, -1200)scale(" + 7 + ")");
    },
    function step1() {
      g.selectAll("path")
        .transition()
        .duration(500)
        .ease(d3.easeSin)
        .attr("opacity", 1);
      g.transition()
        .duration(500)
        .ease(d3.easeSin)
        .attr("transform", "translate(0, 0)scale(" + 1 + ")");
    },
  ];

  return {
    update: update,
  };
};
