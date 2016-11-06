var ev=[{
  "id":11,
  "className":"old",
  "title": "Chiropractic's Appointment",
  "start": "2016-11-07T01:00:32Z",
  "end": "2016-11-07T03:00:32Z"
}, {
  "id":12,
  "className":"old",
  "title": "Neuro Surgeon Appointment",
  "start": "2016-11-09T10:00:32Z",
  "end": "2016-11-06T12:00:32Z"
}, {
  "id": 21,
  "className":"mom",
  "title": " Family Doctor Appointment",
  "start": "2016-11-08T11:30:00Z",
  "end": "2016-11-08T12:30:00Z"
},{
  "id": 22,
  "className":"mom",
  "title": "Meet the dentist",
  "start": "2016-11-10T11:30:00Z",
  "end": "2016-11-10T12:30:00Z"
},{
  "id": 31,
  "className":"dad",
  "title": "Meet with family Doctor",
  "start": "2016-11-11T11:30:00Z",
  "end": "2016-11-11T12:30:00Z"
},{
  "id": 32,
  "className":"dad",
  "title": "Meet with family Doctor",
  "start": "2016-11-11T14:30:00Z",
  "end": "2016-11-11T15:30:00Z"
},{
  "id": 33,
  "className":"dad",
  "title": "Pediatrician Appointment",
  "start": "2016-11-14T13:30:00Z",
  "end": "2016-11-14T14:30:00Z"
}];

$(document).ready(function() {
    $('#calendar-embed').fullCalendar({
      // allow "more" link when too many events
      events:ev
    });
  });
