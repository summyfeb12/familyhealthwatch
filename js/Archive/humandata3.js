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
    drawlinegraph3(results.bpheart, "timestamp", "heartRate", 1, "Cardinal", 1, "#heart-graph3", 1, 1000, 160, "Heart Rate is ", " bpm ","#FFF", "#2C3F51", "#2C3F51");
    drawlinegraph3(results.sleepsum, "date", "timeAsleep", 1, "Cardinal", 1, "#sleep-graph3", 1, 1000, 160, "You slept ", " hours ","#FFF", "#FF5024","#FF5024");
    drawlinegraph3(results.activities, "startTime", "steps", 1, "Cardinal", 0, "#walk-graph3", 0, 120, 20, "You took ", " steps ","blue", "#FF5024","blue");
    drawlinegraph3(results.activities, "startTime", "steps", 1, "Cardinal", 0, "#calorie-graph3", 0, 120, 20, "You burned ", " calories! ","blue", "#FF5024","blue");
    drawwaterfall3(results.bpheart, "#blood-graph3", 1000, 160);
    
    });
    
