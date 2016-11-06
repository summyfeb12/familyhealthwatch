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
    drawlinegraph3(results.bpheart, "timestamp", "heartRate", 1, "Cardinal", 1, "#heart-graph3", 1, 1000, 160, "Heart Rate is ", " bpm ","#AC4EBB", "rgba(172, 78, 187,0.2)","#AC4EBB");
    drawlinegraph3(results.sleepsum, "date", "timeAsleep", 1, "Cardinal", 1, "#sleep-graph3", 1, 1000, 160, "Sleep duration is ", " hours ","#AC4EBB", "rgba(172, 78, 187,0.2)","#AC4EBB");
    drawlinegraph3(results.activities, "startTime", "steps", 1, "Cardinal", 0, "#walk-graph3", 0, 120, 20, "", " steps ","#AC4EBB", "rgba(172, 78, 187,0.2)","#AC4EBB");
    drawlinegraph3(results.activities, "startTime", "steps", 1, "Cardinal", 0, "#calorie-graph3", 0, 120, 20, "Spent ", " calories! ","#AC4EBB", "rgba(172, 78, 187,0.2)","#AC4EBB");
    drawwaterfall3(results.bpheart, "#blood-graph3", 1000, 160,"#AC4EBB", "rgba(172, 78, 187,0.2)");
    
    });
    
