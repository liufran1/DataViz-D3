
// build the SVG 
let svgwidth = 900;
let svgheight = 600;

//Padding within the div
let margin = {top: 12, right: -500, bottom: 50, left: 50};
let mywidth = svgwidth-margin.left-margin.right;
let myheight = svgheight-margin.top-margin.bottom;
    
let svg = d3.select('.container_main')
    .append("svg")
    .attr("width",mywidth+margin.left+margin.right)
    .attr("height",myheight+margin.top+margin.bottom)
    .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    

const plotData = function(manufacturing_data, year, xdimension) {
    let filtered_data = manufacturing_data.filter(function(d) { return d["Year"] == year && d["2012_NAICS_code"].length == 4})

    // suspect the scaling isn't working because it's being based on the whole dataset
    // build the scales
    //posX = d3.scaleLinear()
    posX = d3.scaleLog()
        .domain(d3.extent(manufacturing_data,function(d){return d[xdimension]}))
        .range([0, mywidth]);
    //posY = d3.scaleLinear()
    posY = d3.scaleLog()
        .domain(d3.extent(manufacturing_data,function(d){return d.Number_of_employees}))
        .range([myheight, 0]);
    sizeX = d3.scaleLinear()
        .domain([0, 10000000]) 
        .range([0, 1]);
    sizeY = d3.scaleLinear()
        .domain([0, 10000000]) 
        .range([0, 1]);
    color = d3.scaleOrdinal(d3.schemeCategory10);

    // Bubbles
    // use x = Capital_expenditures_for_machinery_and_equipment
    let circles = svg.selectAll('.markers')
                     .data(filtered_data)

    circles.exit()
        .transition()
        .duration(1000)
        .attr("width", 0)
        .remove();

    circles.enter()
        .append("circle")
            .attr("class","markers")
            .merge(circles).transition()
            .attr("cx", function(d){return posX(d[xdimension]);})
            //.attr("cx", function(d){return posX(d.Total_cost_of_materials);})
            .attr("cy", function(d){return posY(d.Number_of_employees);})
            .attr("r",  function(d){return sizeX(d.Total_value_of_shipments_and_receipts_for_services);})
            .attr("fill",function(d){return color(d.Meaning_of_2012_NAICS_code);});



    // d3.transition(svg).select(".cy.axis")
    //         .transition()
    //         .duration(1000)
    //         .call(yAxis);
            
    d3.transition(svg).select(".cx.axis")
            .transition()
            .duration(1000)
            .call(posX);
    
    // make the axes - currently it replots the axis everytime
    svg.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + myheight + ")")
        .call(d3.axisBottom(posX));
    svg.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(posY));

}
// console.log(manufacturing_data_global)

plotData(manufacturing_data_global, 2015, 'Capital_expenditures_for_machinery_and_equipment')

document.addEventListener('DOMContentLoaded', function(){
    let buttons = document.getElementsByTagName('button')
    // console.log(buttons)
    for (const child of buttons) {
        child.addEventListener("click", function() {
            console.log(child.id)
            plotData(manufacturing_data_global, child.id, 'Capital_expenditures_for_machinery_and_equipment')
        });
    }

})
// buttons[0].addEventListener("click", function(item) {
//     console.log(item.id)
//   // plotData(manufacturing_data_global, 2016)
// });