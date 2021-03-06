function drawlinegraph(datum, p1, p2, curveflag, curvetype, hoverflag, svgname, areaflag, xwidth, yheight, param, unit, linecolor, areafill, dotfill){
    
    // set the dimensions and margins of the graph
    var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = xwidth,
        height = yheight;

    // parse the date / time
    if(svgname!="#sleep-graph")
        var parseTime = d3.timeParse("%Y-%m-%dT%H:%M:%S.%LZ");    
    else
        var parseTime = d3.timeParse("%Y-%m-%d");

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
    var svg = d3.select(svgname)
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + 0 + "," + 0 + ")");
    
    var temp = [];
    var count = 0;
	
    if((svgname=="#walk-graph")|(svgname=="#calorie-graph")){
        count = 43;
        var den = 1;
    }
    else if(svgname=="#sleep-graph")
        var den = 8;
	else
		var den = 3;
    
    datum.forEach(function(d){
      if((count%den == 0)&(count<50)){
		  if(svgname!="#calorie-graph")
			  temp.push({"date":parseTime(eval("d."+p1)),"varvalue":eval("d."+p2)});
		  else 
			  temp.push({"date":parseTime(eval("d."+p1)),"varvalue":((eval("d."+p2)*0.044)+(Math.floor(Math.random()*250)))});
      }  
      count+=1;
    });

    datum = temp;
    
    datum.sort(function(a,b){ return new Date(a.date).getTime() - new Date(b.date).getTime();});
	
    // scale the range of the data
    x.domain(d3.extent(datum, function(d) { return d.date; }));
    y.domain([0, d3.max(datum, function(d) { return d.varvalue; })]);
	
	
    if(areaflag){
        svg.append("path")
           .data([datum])
           .attr("class", "area")
           .attr("d", area)
		   .attr("style", "fill:"+areafill);    
    }

    // add the valueline path
    svg.append("path")
      .data([datum])
      .attr("class", "line")
      .attr("d", valueline)
	  .attr("style","stroke:"+linecolor);
    
    if((hoverflag)&&(curvetype!="Basis")){
        // add points
        svg.selectAll("dot")
            .data(datum)
            .enter().append("circle")
            .attr("r", 4)
            .attr("cx", function(d) { return x(d.date); })
            .attr("cy", function(d) { return y(d.varvalue); })
            .attr("style", "opacity: 1; fill:"+dotfill)
            .on("mouseenter", function(){
               d3.select(this).attr("style", "opacity: 1; fill:"+dotfill).attr("r", 6); })
            .on("mouseleave", function(){
               d3.select(this).attr("style", "opacity: 1; fill:"+dotfill).attr("r", 4); });   
        
    $('circle').tipsy({ 
        gravity: 'w', 
        title: function() {
          var d = (this.__data__);
          if(unit!=" hours "){
              var formatTime = d3.timeFormat("%b %d, %Y at %H:%M:%S %p");
              return param + d.varvalue + unit + " on " + formatTime(d.date);
          }
          else{
              var formatTime = d3.timeFormat("%b %d, %Y");
              return param + Math.floor(d.varvalue/60) + ":" + d.varvalue%60 + unit + " on " + formatTime(d.date);
          }
        }
    });
    
    }
    
    else if((svgname!="#walk-graph")&(svgname!="#calorie-graph")){
        svg.selectAll("dot")
            .data(datum)
            .enter().append("circle")
            .attr("r", 4)
            .attr("cx", function(d) { return x(d.date); })
            .attr("cy", function(d) { return y(d.varvalue); })
            .attr("style", "opacity: 1; fill:"+dotfill);
    }

    // add the X Axis
//    svg.append("g")
//      .attr("transform", "translate(0," + height + ")")
//      .call(d3.axisBottom(x).ticks(6));
//
//    // add the Y Axis
//    svg.append("g")
//      .call(d3.axisLeft(y).ticks(6));
    
}

function drawwaterfall(datum, svgname, xwidth, yheight, linecolor, areafill){
    // set the dimensions and margins of the graph
    var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = xwidth,
        height = yheight;

    // set the ranges
    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height,0]);
    
    var parseTime = d3.timeParse("%Y-%m-%dT%H:%M:%S.%LZ");

    // append the svg object to the body of the page
    // append a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select(svgname)
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + 0 + "," + 0 + ")");
      
      var temp = [];
      var count = 0;
    
      // format the data
      datum.forEach(function(d){
          if(count%3 == 1){
              temp.push({"date": parseTime(d.timestamp),"systolic": d.systolic, "diastolic": d.diastolic });
          }  
          count+=1;
      });
      
      datum = temp;
      
      datum.sort(function(a,b){ return new Date(a.date).getTime() - new Date(b.date).getTime();});
    
      // scale the range of the data
      x.domain(d3.extent(datum, function(d) { return d.date; }));
      y.domain([0, d3.max(datum, function(d) { return d.systolic; })]);

      // append the rectangles for the bar chart
      svg.selectAll(".bar")
          .data(datum)
          .enter().append("rect")
          .attr("class", "bar")
          .attr("x", function(d) { return x(d.date); })
          .attr("width", 5)
          .attr("y", function(d) { return y(d.systolic); })
          .attr("height", function(d) { return y(d.diastolic) - y(d.systolic); })
          .attr("rx", 3)
          .attr("ry", 3)
          .style("stroke", linecolor)
          .style("fill", areafill)
	  	  .on("mouseenter", function(){
               d3.select(this).attr("width", 7).attr("x", function(d) { return x(d.date)-1; }).attr("y", function(d) { return y(d.systolic)-1; }).attr("height", function(d) { return y(d.diastolic) - y(d.systolic) + 2; }); })
          .on("mouseleave", function(){
               d3.select(this).attr("x", function(d) { return x(d.date); }).attr("width", 5).attr("y", function(d) { return y(d.systolic); }).attr("height", function(d) { return y(d.diastolic) - y(d.systolic); })
          });
    
        $('rect').tipsy({ 
            gravity: 'w', 
            title: function() {
              var d = (this.__data__);
              var formatTime = d3.timeFormat("%b %d, %Y at %H:%M:%S %p");
              return "Blood pressure is " + d.systolic + "/" + d.diastolic + " mmHg" + " on " + formatTime(d.date);
              }
        });

//      // add the x Axis
//      svg.append("g")
//          .attr("transform", "translate(0," + height + ")")
//          .call(d3.axisBottom(x).ticks(6));
//
//      // add the y Axis
//      svg.append("g")
//          .attr("transform", "translate(" + -8 + ", 0)")
//          .call(d3.axisLeft(y).ticks(6));

}