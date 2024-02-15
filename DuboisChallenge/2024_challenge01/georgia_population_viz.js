// To Do:
// 1. display 1870 data, 1880 data - https://www.d3indepth.com/geographic/
// 2. Position on the html
// 3. Add background
// 4. Add color
// 5. Linked hoverover
// 6. Click to select

var width = 900;
var height = 500;

var svg = d3.select("body")
  .append("svg")
  .attr("width",width)  // apply width,height to svg
  .attr("height",height);

var projection = d3.geoMercator();
var path = d3.geoPath().projection(projection);

d3.json("georgia_data.json", function(err, geojson) { 

      projection.fitSize([width,height],geojson); // adjust the projection to the features
      svg.append("path").attr("d", path(geojson)); // draw the features

})