// let vietnamBorders = d3.json('../data/vietnam_boundary.geojson')
// let vietnamDistricts = d3.json('../data/vietnam_districts.geojson')

let svgHeight = 550
let svgWidth = 500
const svg = d3.select("#map1").append("svg")

const projection = d3
    .geoIdentity()
    .reflectY(true)
    // .fitWidth(svgWidth, vietnamBorders);

const pathGenerator = d3.geoPath(projection);

const g = svg
    .append("g")


function drawBoundaries(groupElement, borderData){
    let boundary = groupElement
    .selectAll("path")
    .data(borderData.features)
    .enter()
    .append("path")
    .attr('opacity',0)
    .transition()  
    .duration(1000)
    .attr('opacity',1)
    .attr("d", pathGenerator)
    .attr("fill","#d1ae54")
    .attr("id", 'introMapBorders')
    .attr("stroke", "black")
    .attr("stroke-width", 1)
}
  

function drawPopulation(groupElement, districtData) {
    groupElement
    .selectAll("path")
    .data(districtData.features)
    .enter()
    .append("path")
    .attr('opacity',0)
    .attr("d", pathGenerator)
    .attr("fill","blue")
    .attr("id", 'mapPopulationDist')
    .attr("stroke", "black")
    .attr("stroke-width", 0.5)
    
  }

d3.json('../data/vietnam_boundary.geojson', function (vietnamBorders) {
    console.log(vietnamBorders)
    drawBoundaries(g, vietnamBorders)
})

// drawPopulation(g, vietnamDistricts)

