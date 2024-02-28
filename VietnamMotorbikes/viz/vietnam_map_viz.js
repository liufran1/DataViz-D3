// let vietnamBorders = d3.json('../data/vietnam_boundary.geojson')
// let vietnamDistricts = d3.json('../data/vietnam_districts.geojson')
console.log("Map Script loaded");
let svgHeight = 600;
let svgWidth = 500;
const svg = d3
  .select("#map1")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// const projection = d3.geoIdentity().reflectY(true);
// .fitWidth(svgWidth, vietnamBorders);

// const pathGenerator = d3.geoPath(projection);

const g = svg.append("g");

function drawBoundaries(groupElement, pathGenerator, borderData) {
  groupElement
    .selectAll("path")
    .data(borderData.features)
    .enter()
    .append("path")
    .attr("opacity", 0)
    .transition()
    .duration(1000)
    .attr("opacity", 1)
    .attr("d", pathGenerator)
    .attr("fill", "#d1ae54")
    .attr("id", "introMapBorders")
    .attr("stroke", "black")
    .attr("stroke-width", 1);
}

function drawPopulation(groupElement, pathGenerator, districtData) {
  groupElement
    .selectAll("path")
    .data(districtData.features)
    .enter()
    .append("path")
    .attr("opacity", 0.5)
    .attr("d", pathGenerator)
    .attr("fill", "blue")
    .attr("id", "mapPopulationDist")
    .attr("stroke", "black")
    .attr("stroke-width", 0.5);
}

d3.json("data/vietnam_boundary.geojson").then(function (vietnamBorders) {
  const projection = d3
    .geoIdentity()
    .reflectY(true)
    .fitWidth(svgWidth, vietnamBorders);

  const mapPathGenerator = d3.geoPath(projection);
  drawBoundaries(g, mapPathGenerator, vietnamBorders);

  d3.json("data/vietnam_districts.geojson").then(function (vietnamDistricts) {
    console.log("Districts file found");

    drawPopulation(g, mapPathGenerator, vietnamDistricts);
  });
});
