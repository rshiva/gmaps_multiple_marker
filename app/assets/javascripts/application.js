// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require_tree .


$(function() {

 var coordinates_csv_values= $('#map-canvas').data('cord-values');
  var beaches = coordinates_csv_values;
  var infowindow = new google.maps.InfoWindow();

  function initialize() {
  var mapOptions = {
    zoom: 10,
    center: new google.maps.LatLng(0,0),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  var map = new google.maps.Map(document.getElementById('map-canvas'),
                                mapOptions);

  setMarkers(map, beaches);
}


function setMarkers(map, locations) {

  for (var i = 0; i < locations.length; i++) {
    var beach = locations[i];
    var myLatLng = new google.maps.LatLng(beach[0], beach[1]);
    setMarker(map, locations[i])    
  }
  
}

/*https://developers.google.com/maps/documentation/javascript/examples/icon-complex?hl=fr-FR */


function setMarker(map, cordinates) {  
    var bounds = new google.maps.LatLngBounds();   
    var p=cordinates;
    var lat = p[0]
    var lng = p[1]
    var latlng = new google.maps.LatLng(lat, lng);
    geocoder = new google.maps.Geocoder();

    geocoder.geocode( {'latLng': latlng}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);

            var marker = new google.maps.Marker({
                position: latlng,
                map: map
            });


            var contentString = "Some content";

            google.maps.event.addListener(marker, "click", function () {
                infowindow.setContent(results[0].formatted_address);
                infowindow.open(map, marker)
            });
        } 
        else {
            alert("Geocode was not successful for the following reason: " + status);
        }
    });  
}
google.maps.event.addDomListener(window, 'load', initialize);  


})