let pollutantSelect = "CO";

d3.csv(
  "https://raw.githubusercontent.com/liufran1/DataViz-D3/master/VietnamMotorbikes/data/hcmc_vehicle_air_pollutants.csv",
  d3.autoType,
).then(function (pollutionBreakdown) {
  const width = 500;
  const height = Math.min(width, 500);
  const radius = Math.min(width, height) / 2;

  const arc = d3
    .arc()
    .innerRadius(radius * 0.67)
    .outerRadius(radius - 1);

  const pie = d3
    .pie()
    .padAngle(1 / radius)
    .sort(null)
    .value((d) => d["Pollutant_percent"]);

  const color = d3
    .scaleOrdinal()
    .domain(pollutionBreakdown.map((d) => d["Vehicle_Type"]))
    .range(d3.schemeAccent);

  const svg = d3
    .select("#vehicle_pie")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [-width / 2, -height / 2, width, height])
    .attr("style", "max-width: 100%; height: auto;");

  svg
    .append("g")
    .selectAll()
    .data(
      pie(pollutionBreakdown.filter((d) => d["Pollutant"] == pollutantSelect)),
    )
    .join("path")
    .attr("fill", (d) => color(d.data["Vehicle_Type"]))
    .attr("d", arc)
    .append("title")
    .text(
      (d) =>
        `${d.data["Vehicle_Type"]}: ${d.data[
          "Pollutant_percent"
        ].toLocaleString()}`,
    );

  svg
    .append("g")
    .attr("font-family", "sans-serif")
    .attr("font-size", 12)
    .attr("text-anchor", "middle")
    .selectAll()
    .data(
      pie(pollutionBreakdown.filter((d) => d["Pollutant"] == pollutantSelect)),
    )
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
});