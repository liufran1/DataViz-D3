

const plotData = function(manufacturing_data) {
    // build the SVG 
    svgwidth = 900;
    svgheight = 600;
    //Padding within the div
    margin = {top: 12, right: -500, bottom: 50, left: 50};
    mywidth = svgwidth-margin.left-margin.right;
    myheight = svgheight-margin.top-margin.bottom;
    svg = d3.select('.container_main')
      .append("svg")
      .attr("width",mywidth+margin.left+margin.right)
      .attr("height",myheight+margin.top+margin.bottom)
      .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // TODO: function to filter data

    // suspect the scaling isn't working because it's being based on the whole dataset
    // build the scales
    //posX = d3.scaleLinear()
    posX = d3.scaleLog()
        .domain([0, 100])
        .domain(d3.extent(manufacturing_data,function(d){return d.Total_cost_of_materials}))
        .range([0, mywidth]);
    //posY = d3.scaleLinear()
    posY = d3.scaleLog()
        .domain([0, 100])
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
    svg.selectAll('.markers')
      .data(manufacturing_data)
      .enter()
        .append("circle")
            .attr("class","markers")
            .filter(function(d) { return d.Year == 2016 && d["2012_NAICS_code"].length == 4}) 
            //.attr("cx", function(d){return posX(d.Total_cost_of_materials);})
            .attr("cx", function(d){return posX(d.Capital_expenditures_for_machinery_and_equipment);})
            .attr("cy", function(d){return posY(d.Number_of_employees);})
            .attr("r",  function(d){return sizeX(d.Total_value_of_shipments_and_receipts_for_services);})
            .attr("fill",function(d){return color(d.Meaning_of_2012_NAICS_code);});

    // Add data label
    /*
    svg.selectAll("text")
        .data(manufacturing_data)
        .enter()
            .append("text")
            .filter(function(d) { return d.Year == 2016 && d["2012_NAICS_code"].length == 4}) 
            //.attr("x", function(d) { return posX(d.Total_cost_of_materials)-20; })
            .attr("x", function(d) { return posX(d.Capital_expenditures_for_machinery_and_equipment)-20; })
            .attr("y", function(d) { return posY(d.Number_of_employees)-10; })
            .text( function (d) { return d.Meaning_of_2012_NAICS_code; })
            .attr("font-family", "sans-serif")
            .attr("font-size", "10px")
            .attr("fill", "black");
    */
    // make the axes

    svg.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + myheight + ")")
        .call(d3.axisBottom(posX));
    svg.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(posY));

}
console.log(manufacturing_data_global)

// fetch("manufacturing_data.json", {
//       headers : { 
//         'Content-Type': 'application/json',
//         'Accept': 'application/json'
//        }
//     }).then(function(data){
//     console.log(data.json())
//   }
// )
plotData(manufacturing_data_global)