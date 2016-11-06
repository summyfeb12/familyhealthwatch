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
    drawlinegraph(results.bpheart, "timestamp", "heartRate", 1, "Cardinal", 1, "#heart-graph", 1, 1000, 160, "Heart Rate is ", " bpm ","#4FB6B2", "rgba(79, 182, 178,0.2)","#4FB6B2");
    drawlinegraph(results.sleepsum, "date", "timeAsleep", 1, "Cardinal", 1, "#sleep-graph", 1, 1000, 160, "You slept ", " hours ","#4FB6B2", "rgba(79, 182, 178,0.2)","#4FB6B2");
    drawlinegraph(results.activities, "startTime", "steps", 1, "Cardinal", 0, "#walk-graph", 0, 120, 20, "You took ", " steps ","#4FB6B2", "rgba(79, 182, 178,0.2)","#4FB6B2");
    drawlinegraph(results.activities, "startTime", "steps", 1, "Cardinal", 0, "#calorie-graph", 0, 120, 20, "You burned ", " calories! ","#4FB6B2", "rgba(79, 182, 178,0.2)","#4FB6B2");
    drawwaterfall(results.bpheart, "#blood-graph", 1000, 160,"#4FB6B2", "rgba(79, 182, 178,0.2)");
    
    });
    
