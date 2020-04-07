

const manufacturingNAICS = [311,3111,31111,311111,311119,3112,31121,311211,311212,311213,31122,311221,311224,311225,31123,311230,3113,31131,311313,311314,31134,311340,31135,311351,311352,3114,31141,311411,311412,31142,311421,311422,311423,3115,31151,311511,311512,311513,311514,31152,311520,3116,31161,311611,311612,311613,311615,3117,31171,311710,3118,31181,311811,311812,311813,31182,311821,311824,31183,311830,3119,31191,311911,311919,31192,311920,31193,311930,31194,311941,311942,31199,311991,311999,312,3121,31211,312111,312112,312113,31212,312120,31213,312130,31214,312140,3122,31223,312230,313,3131,31311,313110,3132,31321,313210,31322,313220,31323,313230,31324,313240,3133,31331,313310,31332,313320,314,3141,31411,314110,31412,314120,3149,31491,314910,31499,314994,314999,315,3151,31511,315110,31519,315190,3152,31521,315210,31522,315220,31524,315240,31528,315280,3159,31599,315990,316,3161,31611,316110,3162,31621,316210,3169,31699,316992,316998,321,3211,32111,321113,321114,3212,32121,321211,321212,321213,321214,321219,3219,32191,321911,321912,321918,32192,321920,32199,321991,321992,321999,322,3221,32211,322110,32212,322121,322122,32213,322130,3222,32221,322211,322212,322219,32222,322220,32223,322230,32229,322291,322299,323,3231,32311,323111,323113,323117,32312,323120,324,3241,32411,324110,32412,324121,324122,32419,324191,324199,325,3251,32511,325110,32512,325120,32513,325130,32518,325180,32519,325193,325194,325199,3252,32521,325211,325212,32522,325220,3253,32531,325311,325312,325314,32532,325320,3254,32541,325411,325412,325413,325414,3255,32551,325510,32552,325520,3256,32561,325611,325612,325613,32562,325620,3259,32591,325910,32592,325920,32599,325991,325992,325998,326,3261,32611,326111,326112,326113,32612,326121,326122,32613,326130,32614,326140,32615,326150,32616,326160,32619,326191,326199,3262,32621,326211,326212,32622,326220,32629,326291,326299,327,3271,32711,327110,32712,327120,3272,32721,327211,327212,327213,327215,3273,32731,327310,32732,327320,32733,327331,327332,32739,327390,3274,32741,327410,32742,327420,3279,32791,327910,32799,327991,327992,327993,327999,331,3311,33111,331110,3312,33121,331210,33122,331221,331222,3313,33131,331313,331314,331315,331318,3314,33141,331410,33142,331420,33149,331491,331492,3315,33151,331511,331512,331513,33152,331523,331524,331529,332,3321,33211,332111,332112,332114,332117,332119,3322,33221,332215,332216,3323,33231,332311,332312,332313,33232,332321,332322,332323,3324,33241,332410,33242,332420,33243,332431,332439,3325,33251,332510,3326,33261,332613,332618,3327,33271,332710,33272,332721,332722,3328,33281,332811,332812,332813,3329,33291,332911,332912,332913,332919,33299,332991,332992,332993,332994,332996,332999,333,3331,33311,333111,333112,33312,333120,33313,333131,333132,3332,33324,333241,333242,333243,333244,333249,3333,33331,333314,333316,333318,3334,33341,333413,333414,333415,3335,33351,333511,333514,333515,333517,333519,3336,33361,333611,333612,333613,333618,3339,33391,333912,333914,33392,333921,333922,333923,333924,33399,333991,333992,333993,333994,333995,333996,333997,333999,334,3341,33411,334111,334112,334118,3342,33421,334210,33422,334220,33429,334290,3343,33431,334310,3344,33441,334412,334413,334416,334417,334418,334419,3345,33451,334510,334511,334512,334513,334514,334515,334516,334517,334519,3346,33461,334613,334614,335,3351,33511,335110,33512,335121,335122,335129,3352,33521,335210,33522,335220,3353,33531,335311,335312,335313,335314,3359,33591,335911,335912,33592,335921,335929,33593,335931,335932,33599,335991,335999,336,3361,33611,336111,336112,33612,336120,3362,33621,336211,336212,336213,336214,3363,33631,336310,33632,336320,33633,336330,33634,336340,33635,336350,33636,336360,33637,336370,33639,336390,3364,33641,336411,336412,336413,336414,336415,336419,3365,33651,336510,3366,33661,336611,336612,3369,33699,336991,336992,336999,337,3371,33711,337110,33712,337121,337122,337124,337125,337127,3372,33721,337211,337212,337214,337215,3379,33791,337910,33792,337920,339,3391,33911,339112,339113,339114,339115,339116,3399,33991,339910,33992,339920,33993,339930,33994,339940,33995,339950,33999,339991,339992,339993,339994,339995,339999];

const formatCensusResponse = function(inputArray){
    let tempResults = {};
    var i;
    for (i = 0; i < inputArray[0].length; i++) {
        tempResults[inputArray[0][i]] = inputArray[1][i];
    };
    // console.log(tempResults)
    // console.log(`Done Formatting data`)
    return tempResults;
}

const retrieveCensusData = async (econVariables, naics, year, censusAPIKey) =>{ 
    let urlString = `https://api.census.gov/data/timeseries/asm/state?get=${econVariables.join()}&for=us:*&time=${year}&NAICS=${naics}&key=${censusAPIKey}`;
    // console.log(urlString);
    let request = await fetch(urlString);
    try {
        // Transform into JSON
        const allData = await request.json();
        // console.log(`Result length: ${allData[0].length}`)
        // console.log(`Formatting data for ${naics}`);
        let tempResults = formatCensusResponse(allData);
        return tempResults;
        // resolve(tempResults)
    }
    catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
};


const getData = function(manufacturingNAICS) {
    let censusAPIKey = '66c3f4184903067fac362bdc2b64803f4221442d'; //
    let year = '2016';
    let econVariables = [
        'NAICS_TTL', //NAICS Title
        'EMP', //Number of employees
        'CSTMTOT', //Total cost of materials ($1,000)
        //'CEXMCH', //Capital expenditures on machinery and equipment (new and used) ($1,000)
        'CEXTOT', //Total capital expenditures
        'RCPTOT' //Total value of shipments and receipts for services ($1,000)
    ];
    let promise_results = [];
    for (naics of manufacturingNAICS){
        if (naics.toString().length == 4) {
            console.log(`Getting data for NAICS ${naics}`);
            promise_results.push(retrieveCensusData(econVariables, naics, year, censusAPIKey));
        }
    }
    return promise_results
}



const plotData = function(manufacturing_data) {
    console.log("Data: \n")
    manufacturing_data.forEach(function(d){
      d.EMP = +d.EMP;
      d.CSTMTOT = +d.CSTMTOT;
      d.CEXTOT = +d.CEXTOT;
      d.RCPTOT = +d.RCPTOT;
      d.time = +d.time;
    });
    console.log(manufacturing_data)
    console.log(d3.extent(manufacturing_data,function(d){return d.EMP}))
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
    posX = d3.scaleLinear()
        .domain([0, 100])
        .domain(d3.extent(manufacturing_data,function(d){return d.CEXTOT}))
        .range([0, mywidth]);
    //posY = d3.scaleLinear()
    posY = d3.scaleLog()
        .domain([0, 100])
        .domain(d3.extent(manufacturing_data,function(d){return d.EMP}))
        .range([myheight, 0]);
    sizeX = d3.scaleLinear()
        .domain([0, 10000000]) 
        .range([0, 1]);
    // sizeY = d3.scaleLinear()
    //     .domain([0, 10000000]) 
    //     .range([0, 1]);
    color = d3.scaleOrdinal(d3.schemeCategory10);

    // Bubbles
    // use x = Capital_expenditures_for_machinery_and_equipment
    svg.selectAll('.markers')
      .data(manufacturing_data)
      .enter()
        .append("circle")
            .attr("class","markers")
            // .filter(function(d) { return d.Year == 2016 && d["2012_NAICS_code"].length == 4}) 
            //.attr("cx", function(d){return posX(d.Total_cost_of_materials);})
            .attr("cx", function(d){return posX(d.CEXTOT);})
            .attr("cy", function(d){console.log(posX(d.EMP)); return posY(d.EMP);})
            .attr("r",  function(d){return sizeX(d.RCPTOT);})
            .attr("fill",function(d){return color(d.NAICS_TTL);});


    svg.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + myheight + ")")
        .call(d3.axisBottom(posX));
    svg.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(posY));
}

const startingTime = performance.now();


Promise.all(getData(manufacturingNAICS)).then(function(data) {
    // console.log(data);
     plotData(data);
     const endingTime = performance.now();
     console.log('This code took ' + (endingTime - startingTime) + ' milliseconds.');

    //  function saveText(text, filename){  //Debug - save JSON to disk
    //   var a = document.createElement('a');
    //   a.setAttribute('href', 'data:text/plain;charset=utf-8,'+encodeURIComponent(text));
    //   a.setAttribute('download', filename);
    //   a.click()
    // }
    // saveText( JSON.stringify(data), "asm_2016.json" );
})


