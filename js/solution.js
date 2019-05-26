
// SVG Size
var width = 700,
	height = 500;


// Load CSV file
d3.csv("data/houses.csv", function(data){

    data.sort(function (a, b) {
        return b.Population - a.Population;
    });

    data.forEach(function (x) {
        x.Mice = +x.Mice;
        x.SpicedChicken = +x.SpicedChicken;
        x.Population = +x.Population;
    });


    var padding = 30;

    var svg = d3.select("#chart-area").append("svg")
        .attr("width", width)
        .attr("height", height);


    var chickenScale = d3.scaleLog()
        .domain([
            d3.min(data, function(d){ return d.SpicedChicken }) - 50,
            d3.max(data, function(d){ return d.SpicedChicken }) + 50
        ])
        .range([padding, width - padding]);

    var miceScale = d3.scaleLinear()
        .domain([
            d3.max(data, function(d){ return d.Mice }),
            d3.min(data, function(d){ return d.Mice })
        ])
        .range([padding, height - padding]);


    var populationDependent = d3.scaleLinear()
        .domain([d3.min(data, function(d){ return d.Population }),
            d3.max(data, function(d){ return d.Population })])
        .range([4, 30]);

    var colorPalette = d3.scaleOrdinal(d3.schemeCategory10);

    svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("fill", function(d){
        	return colorPalette(d.Population);
		})
        .attr('r', function(d){
            return populationDependent(d.Population);
        })
        .attr("cy", function(d){ return miceScale(d.Mice); })
        .attr("cx", function(d){ return chickenScale(d.SpicedChicken); })
        .attr("class", "map")
		.attr("opacity", function(d){
        	if(d.Population == 0) return  "0"
		});

    var xAxis = d3.axisBottom()
        .scale(chickenScale)
        .ticks("10", "t")
        .tickSize(5, 0);


    svg.append("g")
        .attr("class", "axis x-axis")
        .attr("transform", "translate(0," + (height - padding) + ")")
        .call(xAxis);

    var yAxis = d3.axisLeft()
		.scale(miceScale);

    svg.append("g")
        .attr("class", "axis y-axis")
        .attr("transform", "translate("+ padding + ",0)")
        .call(yAxis);

    svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("y", padding + 4)
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .text("Red Spiced Chicken Consumed");

    svg.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", height - padding - 2)
        .text("Number of mice spotted");



});