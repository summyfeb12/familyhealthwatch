async.parallel({
    sleepsum: function(callback) {
      d3.request('https://api.humanapi.co/v1/human/sleeps/summaries?access_token=demo').get(function(d){
        callback(null,JSON.parse(d.responseText));
      });
    },
    bpheart: function(callback) {
      d3.request('https://api.humanapi.co/v1/human/blood_pressure/readings?access_token=demo').get(function(d){
        callback(null,JSON.parse(d.responseText));
      });
    },
    humsum: function(callback) {
      d3.request('https://api.humanapi.co/v1/human?access_token=demo').get(function(d){
        callback(null,JSON.parse(d.responseText));
      });
    },
    allergies: function(callback) {
      d3.request('https://api.humanapi.co/v1/human/medical/allergies?access_token=demo').get(function(d){
        callback(null,JSON.parse(d.responseText));
      });
    },
    medication: function(callback) {
      d3.request('https://api.humanapi.co/v1/human/medical/medications?access_token=demo').get(function(d){
        callback(null,JSON.parse(d.responseText));
      });
    },
    vitals: function(callback) {
      d3.request('https://api.humanapi.co/v1/human/medical/vitals?access_token=demo').get(function(d){
        callback(null,JSON.parse(d.responseText));
      });
    },
    plansofcare: function(callback) {
      d3.request('https://api.humanapi.co/v1/human/medical/plans_of_care?access_token=demo').get(function(d){
        callback(null,JSON.parse(d.responseText));
      });
    },
   activities: function(callback) {
     d3.request('https://api.humanapi.co/v1/human/activities?access_token=demo').get(function(d){
       callback(null,JSON.parse(d.responseText));
     });
   }
},
    function(err, results) {
    
    //console.log(results);
    drawlinegraph2(results.bpheart, "timestamp", "heartRate", 1, "Cardinal", 1, "#heart-graph2", 1, 1000, 160, "Heart Rate is ", " bpm ","#FFF", "#2C3F51", "#2C3F51");
    drawlinegraph2(results.sleepsum, "date", "timeAsleep", 1, "Cardinal", 1, "#sleep-graph2", 1, 1000, 160, "You slept ", " hours ","#FFF", "#FF5024","#FF5024");
    drawlinegraph2(results.activities, "startTime", "steps", 1, "Cardinal", 0, "#walk-graph2", 0, 120, 20, "You took ", " steps ","blue", "#FF5024","blue");
    drawlinegraph2(results.activities, "startTime", "steps", 1, "Cardinal", 0, "#calorie-graph2", 0, 120, 20, "You burned ", " calories! ","blue", "#FF5024","blue");
    drawwaterfall2(results.bpheart, "#blood-graph2", 1000, 160);
    
    });
    
