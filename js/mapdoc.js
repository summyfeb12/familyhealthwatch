
      var map;
      var infowindow;

      function initMap() {
        var stlouis = {lat:38.627003, lng:-90.199402};

        map = new google.maps.Map(document.getElementById('map'), {
          center: stlouis,
          zoom: 13
        });

        infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
          location: stlouis,
          radius: 10000,
          type: ['hospital']
        }, callback);
      }

      function callback(results, status) {
        console.log(results);
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
          }
        }
      }

      function createMarker(place) {
        var placeLoc = place.geometry.location;
		var doc_array = ['63.png','63-1.png','10.png','10-1.png','24.png','19.png','4.png','12.png','27.png','9.png','27-1.png','26.png'];
		var rand = doc_array[Math.floor(Math.random() * doc_array.length)];
        var marker = new google.maps.Marker({
          icon:'images/docs/'+rand,
          map: map,
          position: place.geometry.location
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name);
          infowindow.open(map, this);
        });
      }
