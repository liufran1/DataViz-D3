// build the SVG 
svgwidth = 900;
svgheight = 600;
margin = {top: 12, right: -200, bottom: 50, left: 50};
mywidth = svgwidth-margin.left-margin.right;
myheight = svgheight-margin.top-margin.bottom;

svg2 = d3.select('.container_bottom')
    .append("svg")
    .attr("width",mywidth+margin.left+margin.right)
    .attr("height",myheight+margin.top+margin.bottom)
    .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

const plotDataTwo = function(manufacturing_data, year) {

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
    svg2.selectAll('.markers')
      .data(manufacturing_data)
      .enter()
        .append("circle")
            .attr("class","markers")
            .filter(function(d) { return d.Year == year && d["2012_NAICS_code"].length == 3}) 
            //.attr("cx", function(d){return posX(d.Total_cost_of_materials);})
            .attr("cx", function(d){return posX(d.Capital_expenditures_for_machinery_and_equipment);})
            .attr("cy", function(d){return posY(d.Number_of_employees);})
            .attr("r",  function(d){return sizeX(d.Total_value_of_shipments_and_receipts_for_services);})
            .attr("fill",function(d){return color(d.Meaning_of_2012_NAICS_code);});

    // Add data label

    svg2.selectAll("text")
        .data(manufacturing_data)
        .enter()
            .append("text")
            .filter(function(d) { return d.Year == 2016 && d["2012_NAICS_code"].length == 3}) 
            //.attr("x", function(d) { return posX(d.Total_cost_of_materials)-20; })
            .attr("x", function(d) { return posX(d.Capital_expenditures_for_machinery_and_equipment)-20; })
            .attr("y", function(d) { return posY(d.Number_of_employees)-10; })
            .text( function (d) { return d.Meaning_of_2012_NAICS_code; })
            .attr("font-family", "sans-serif")
            .attr("font-size", "10px")
            .attr("fill", "black");

    // make the axes

    svg2.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + myheight + ")")
        .call(d3.axisBottom(posX));
    svg2.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(posY));
    }
plotDataTwo(manufacturing_data_global, 2016)