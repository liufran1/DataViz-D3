d3.json("data/countries.geojson").then(function (countries) {
  d3.json("data/middle_income_exposure_deaths.geojson").then(
    function (middle_income_exposure_deaths) {
      console.log("Map Script loaded");
      let svgHeight = 400;
      let svgWidth = 2000;
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

      const projection = d3
        .geoIdentity()
        .reflectY(true)
        .fitHeight(svgHeight, countries);

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

      g.selectAll("path")
        .data(countries.features)
        .enter()
        .append("path")
        .attr("opacity", 0.1)
        .attr("d", pathGenerator);
    },
  );
});
