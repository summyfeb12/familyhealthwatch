function overlaygraphs(datum, p1, p2, curveflag, curvetype, hoverflag, svgname, areaflag, xwidth, yheight, param, unit){
    
    // set the dimensions and margins of the graph
    var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = xwidth,
        height = yheight;

    // parse the date / time
    if(svgname!="#sleep-grapho")
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
    
    var temp1 = [];
    var temp2 = [];
    var temp3 = [];
    var temp4 = [];
    var count = 0;
    var s1count = 0;
    var s2count = 0;
    var s3count = 0;
    
    if((svgname=="#walk-grapho")|(svgname=="#calorie-grapho")){
        datum.forEach(function(d){
          if(count<7){
              temp1.push({"date":parseTime(eval("d."+p1)),"varvalue":eval("d."+p2)});
          }
          else if((count>=21)&(count<28)){
              temp2.push({"date":temp1[s1count++].date,"varvalue":eval("d."+p2)});
          }
          else if((count>=14)&(count<21)){
              temp3.push({"date":temp1[s2count++].date,"varvalue":eval("d."+p2)});
          }
          else if((count>=43)&(count<50)){
              temp4.push({"date":temp1[s3count++].date,"varvalue":eval("d."+p2)});
          }
          count+=1;
        });
        
    }
    
    else{
        datum.forEach(function(d){
          if(count%4==0){
              temp1.push({"date":parseTime(eval("d."+p1)),"varvalue":eval("d."+p2)});
          }
          else if(count%3==1){
              temp2.push({"date":parseTime(eval("d."+p1)),"varvalue":eval("d."+p2)});
          }
          else if(count%3==2){
              temp3.push({"date":parseTime(eval("d."+p1)),"varvalue":eval("d."+p2)});
          }
          else{
              temp4.push({"date":parseTime(eval("d."+p1)),"varvalue":eval("d."+p2)});
          }
          count+=1;
        });
        
        
    }
    
    y.domain([0, d3.max(datum, function(d) { return eval("d."+p2); })]);
    
    datum = temp1;
    
    // scale the range of the data
    x.domain(d3.extent(datum, function(d) { return d.date; }));
    
    datum.sort(function(a,b){ return new Date(a.date).getTime() - new Date(b.date).getTime();});
    temp2.sort(function(a,b){ return new Date(a.date).getTime() - new Date(b.date).getTime();});
    temp3.sort(function(a,b){ return new Date(a.date).getTime() - new Date(b.date).getTime();});
    temp4.sort(function(a,b){ return new Date(a.date).getTime() - new Date(b.date).getTime();});
    
    if(areaflag){
        svg.append("path")
           .data([datum])
           .attr("class", "area firstArea")
           .attr("d", area);
        svg.append("path")
           .data([temp2])
           .attr("class", "area secondArea")
           .attr("d", area);    
        svg.append("path")
           .data([temp3])
           .attr("class", "area thirdArea")
           .attr("d", area);
        svg.append("path")
           .data([temp4])
           .attr("class", "area fourthArea")
           .attr("d", area);
    }

    // add the valueline path
    svg.append("path")
      .data([datum])
      .attr("class", "line firstLine")
      .attr("d", valueline);
    svg.append("path")
      .data([temp2])
      .attr("class", "line secondLine")
      .attr("d", valueline);
    svg.append("path")
      .data([temp3])
      .attr("class", "line thirdLine")
      .attr("d", valueline);
    svg.append("path")
      .data([temp4])
      .attr("class", "line fourthLine")
      .attr("d", valueline);
    
    if((hoverflag)&&(curvetype!="Basis")){
        // add points
        svg.selectAll("dot")
            .data(datum)
            .enter().append("circle")
            .attr("r", 4)
            .attr("cx", function(d) { return x(d.date); })
            .attr("cy", function(d) { return y(d.varvalue); })
            .attr("style", "opacity: 1; fill: #4FB6B2")
            .on("mouseenter", function(){
               d3.select(this).attr("style", "opacity: 1; fill: #4FB6B2").attr("r", 6); })
            .on("mouseleave", function(){
               d3.select(this).attr("style", "opacity: 1; fill: #4FB6B2").attr("r", 4); });   
        
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
    
    else if((svgname!="#walk-grapho")&(svgname!="#calorie-grapho")){
        svg.selectAll("dot")
            .data(datum)
            .enter().append("circle")
            .attr("r", 4)
            .attr("cx", function(d) { return x(d.date); })
            .attr("cy", function(d) { return y(d.varvalue); })
            .attr("style", "opacity: 1; fill: #4FB6B2");
    }
    
    if((hoverflag)&&(curvetype!="Basis")){
        // add points
        svg.selectAll("dot")
            .data(temp2)
            .enter().append("circle")
            .attr("r", 4)
            .attr("cx", function(d) { return x(d.date); })
            .attr("cy", function(d) { return y(d.varvalue); })
            .attr("style", "opacity: 1; fill: #284e91")
            .on("mouseenter", function(){
               d3.select(this).attr("style", "opacity: 1; fill: #284e91").attr("r", 6); })
            .on("mouseleave", function(){
               d3.select(this).attr("style", "opacity: 1; fill: #284e91").attr("r", 4); });   
        
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
    
    else if((svgname!="#walk-grapho")&(svgname!="#calorie-grapho")){
        svg.selectAll("dot")
            .data(temp2)
            .enter().append("circle")
            .attr("r", 4)
            .attr("cx", function(d) { return x(d.date); })
            .attr("cy", function(d) { return y(d.varvalue); })
            .attr("style", "opacity: 1; fill: #284e91");
    }
    
    if((hoverflag)&&(curvetype!="Basis")){
        // add points
        svg.selectAll("dot")
            .data(temp3)
            .enter().append("circle")
            .attr("r", 4)
            .attr("cx", function(d) { return x(d.date); })
            .attr("cy", function(d) { return y(d.varvalue); })
            .attr("style", "opacity: 1; fill: #DC6100")
            .on("mouseenter", function(){
               d3.select(this).attr("style", "opacity: 1; fill: #DC6100").attr("r", 6); })
            .on("mouseleave", function(){
               d3.select(this).attr("style", "opacity: 1; fill: #DC6100").attr("r", 4); });   
        
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
    
    else if((svgname!="#walk-grapho")&(svgname!="#calorie-grapho")){
        svg.selectAll("dot")
            .data(temp3)
            .enter().append("circle")
            .attr("r", 4)
            .attr("cx", function(d) { return x(d.date); })
            .attr("cy", function(d) { return y(d.varvalue); })
            .attr("style", "opacity: 1; fill: #DC6100");
    }
    
    if((hoverflag)&&(curvetype!="Basis")){
        // add points
        svg.selectAll("dot")
            .data(temp4)
            .enter().append("circle")
            .attr("r", 4)
            .attr("cx", function(d) { return x(d.date); })
            .attr("cy", function(d) { return y(d.varvalue); })
            .attr("style", "opacity: 1; fill: #AC4EBB")
            .on("mouseenter", function(){
               d3.select(this).attr("style", "opacity: 1; fill: #AC4EBB").attr("r", 6); })
            .on("mouseleave", function(){
               d3.select(this).attr("style", "opacity: 1; fill: #AC4EBB").attr("r", 4); });   
        
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
    
    else if((svgname!="#walk-grapho")&(svgname!="#calorie-grapho")){
        svg.selectAll("dot")
            .data(temp4)
            .enter().append("circle")
            .attr("r", 4)
            .attr("cx", function(d) { return x(d.date); })
            .attr("cy", function(d) { return y(d.varvalue); })
            .attr("style", "opacity: 1; fill:"+"#AC4EBB");
    }
    
    
//    // add the X Axis
//    svg.append("g")
//      .attr("transform", "translate(0," + height + ")")
//      .call(d3.axisBottom(x).ticks(6));
//
//    // add the Y Axis
//    svg.append("g")
//      .call(d3.axisLeft(y).ticks(6));
    
}

function drawwaterfall(datum, svgname, xwidth, yheight){
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
          .attr("width", 3)
          .attr("y", function(d) { return y(d.systolic); })
          .attr("height", function(d) { return y(d.diastolic) - y(d.systolic); })
          .attr("rx", 1)
          .attr("ry", 1);

      // add the x Axis
      svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x).ticks(6));

      // add the y Axis
      svg.append("g")
          .attr("transform", "translate(" + -8 + ", 0)")
          .call(d3.axisLeft(y).ticks(6));

}