createPollutantPie = function () {
  const width = 500;
  const height = Math.min(width, 500);
  const radius = Math.min(width, height) / 2;

  const arc = d3
    .arc()
    .innerRadius(radius * 0.67)
    .outerRadius(radius - 1);

  const svg = d3
    .select("#vehicle_pie")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [-width / 2, -height / 2, width, height]);
  // .attr("style", "max-width: 100%; height: auto;");

  let plotPie = function (pollutionBreakdown, pollutant) {
    const pie = d3
      .pie()
      .padAngle(1 / radius)
      .sort(null)
      .value((d) => d["Pollutant_percent"]);

    const color = d3
      .scaleOrdinal()
      .domain(pollutionBreakdown.map((d) => d["Vehicle_Type"]))
      .range(d3.schemeAccent);
    // TO DO: update colors

    // TO DO: Turn this into an update function

    // Pie component
    let pieGroup = svg
      .append("g")
      .selectAll()
      .data(pie(pollutionBreakdown.filter((d) => d["Pollutant"] == pollutant)));

    pieGroup.exit().transition().duration(1000).attr("width", 0).remove();

    // pieGroup
    //   .join("path")
    //   .enter()
    //   .merge(pieGroup)
    //   .transition()
    //   .attr("fill", (d) => color(d.data["Vehicle_Type"]))
    //   .attr("d", arc);

    pieGroup
      .join("path")
      .merge(pieGroup)
      .transition()
      .attr("fill", (d) => color(d.data["Vehicle_Type"]))
      .attr("d", arc);

    // .append("title")
    // .text(
    //   (d) =>
    //     `${d.data["Vehicle_Type"]}: ${d.data[
    //       "Pollutant_percent"
    //     ].toLocaleString()}`,
    // );

    // text component
    svg
      .append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 12)
      .attr("text-anchor", "middle")
      .selectAll()
      .data(pie(pollutionBreakdown.filter((d) => d["Pollutant"] == pollutant)))
      .join("text")
      .attr("transform", (d) => `translate(${arc.centroid(d)})`)
      .call((text) =>
        text
          .append("tspan")
          .attr("y", "-0.4em")
          .attr("font-weight", "bold")
          .text((d) => d.data.name),
      )
      .call(
        (text) =>
          text
            .filter((d) => d.endAngle - d.startAngle > 0.25)
            .append("tspan")
            .attr("x", 0)
            .attr("y", "0.7em")
            .attr("fill-opacity", 0.7)
            .text(
              (d) =>
                `${d.data["Vehicle_Type"]}: ${d.data[
                  "Pollutant_percent"
                ].toLocaleString()}`,
            ),
        // .text(d => d.data['Pollutant_percent'].toLocaleString("en-US"))
      );
  };

  d3.csv("./data/hcmc_vehicle_air_pollutants.csv", d3.autoType).then(
    function (pollutionBreakdown) {
      plotPie(pollutionBreakdown, "CO");
    },
  );
  function update(step) {
    steps[step].call();
  }

  var steps = [
    function step0() {
      d3.csv("./data/hcmc_vehicle_air_pollutants.csv", d3.autoType).then(
        function (pollutionBreakdown) {
          plotPie(pollutionBreakdown, "CO");
        },
      );
    },
    function step1() {
      d3.csv("./data/hcmc_vehicle_air_pollutants.csv", d3.autoType).then(
        function (pollutionBreakdown) {
          plotPie(pollutionBreakdown, "PM2.5");
        },
      );
    },
    function step2() {},
  ];
  return {
    update: update, // make the update function callable as var graphic = createGraphic(".graphic"); graphic.update
  };
};
