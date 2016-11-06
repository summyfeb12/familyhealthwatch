function drawlinegraph(datum, p1, p2, curveflag, curvetype, hoverflag, svgname, areaflag){
    
    // set the dimensions and margins of the graph
    var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    // parse the date / time
    var parseTime = d3.timeParse("%Y-%m-%dT%H:%M:%S.%LZ");

    // set the ranges
    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);
    
    if(curveflag){
        if(areaflag){
            // define the area
            var area = d3.area()
                .curve(eval("d3.curve"+curvetype))
                .x(function(d) { return x(d.date); })
                .y0(height)
                .y1(function(d) { return y(d.varvalue); });
        }
        
        // define the line
        var valueline = d3.line()
            .curve(eval("d3.curve"+curvetype))
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d.varvalue); });
    }
    
    else{
        if(areaflag){
            // define the area
            var area = d3.area()
                //.curve(eval("d3.curve"+curvetype))
                .x(function(d) { return x(d.date); })
                .y0(height)
                .y1(function(d) { return y(d.varvalue); });
        }
        
        // define the line
        var valueline = d3.line()
            //.curve(d3.curveCardinal)
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d.varvalue); });
    }

    // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select("#hrsvg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    var count = 0;
    var temp = [];
    var randomarr = [];
    // parse the date and time from the json
    
    for(var k = 0; k<6; k++){
        randomarr.push(Math.floor(Math.random()*50));
    }
    
    datum.forEach(function(d){
      if(randomarr.indexOf(count)!=-1){
          temp.push({"date":parseTime(eval("d."+p1)),"varvalue":eval("d."+p2)})
      }  
      count+=1;
    });
    
    datum = temp;
    
    datum.sort(function(a,b){ return new Date(a.date).getTime() - new Date(b.date).getTime();});

    // scale the range of the data
    x.domain(d3.extent(datum, function(d) { return d.date; }));
    y.domain([0, d3.max(datum, function(d) { return d.varvalue; })]);

    
    if(areaflag){
        console.log("yes");
        // add the area
        svg.append("path")
           .data([datum])
           .attr("class", "area")
           .attr("d", area);    
    }

    // add the valueline path
    svg.append("path")
      .data([datum])
      .attr("class", "line")
      .attr("d", valueline);
    
    if((hoverflag)&(curvetype!="Basis")){
        // add points
        svg.selectAll("dot")
            .data(datum)
            .enter().append("circle")
            .attr("r", 6)
            .attr("cx", function(d) { return x(d.date); })
            .attr("cy", function(d) { return y(d.varvalue); })
            .attr("style", "opacity: 0")
            .on("mouseenter", function(){
               d3.select(this).attr("style", "opacity: 1"); })
            .on("mouseleave", function(){
               d3.select(this).attr("style", "opacity: 0"); });
    
    $('circle').tipsy({ 
        gravity: 's', 
        title: function() {
          var d = (this.__data__);
          return "Varvalue: "+ d.varvalue;}
    });
    
    }
    
    else{
        svg.selectAll("dot")
            .data(datum)
            .enter().append("circle")
            .attr("r", 6)
            .attr("cx", function(d) { return x(d.date); })
            .attr("cy", function(d) { return y(d.varvalue); })
            .attr("style", "opacity: 0");
    }

    // add the X Axis
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // add the Y Axis
    svg.append("g")
      .call(d3.axisLeft(y));
    
}