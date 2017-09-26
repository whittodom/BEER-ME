$( document ).ready(function(){
 var config = {
    apiKey: "AIzaSyCW-h4JrfSKwJfOaknf-FO4_xOPu60ypck",
    authDomain: "phillip-s-timesheet.firebaseapp.com",
    databaseURL: "https://phillip-s-timesheet.firebaseio.com",
    projectId: "phillip-s-timesheet",
    storageBucket: "phillip-s-timesheet.appspot.com",
    messagingSenderId: "802821050139"
  };
  // initialize firebase
  firebase.initializeApp(config);

  var database = firebase.database();

  console.log("database " + database)
  
  var city = "";
  var zipcode = "";
 //NOTE will only do zipcode first.. pos. only
  $("#zipcodeSubmit").on("click", function(){
  zipcode = $("#zip_code").val().trim();
  console.log("zipcode " + zipcode)
});
  var postalCode = "postalCode";
  $("#zipcodeSubmit").on("click", function(){
  // where = $("#whereInput").val().trim();
  var queryURL = "http://api.brewerydb.com/v2/locations/?key=c756ef0b049ff96fde23bc1d0dd1abbc&" + postalCode + "=" + zipcode
  var bounds = new google.maps.LatLngBounds();
  console.log(queryURL)
  database.ref().push({
      postalCode: postalCode,
      queryURL: queryURL,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
  return false;
  });

//ajax call-not finished, may keep live so i can show the error or may grey out 
function jaxCall() {
  $("#map").empty();

  var postalCode = "postalCode";
  $("#zipcodeSubmit").on("click", function(){
  
  var queryURL = "http://api.brewerydb.com/v2/locations/?key=c756ef0b049ff96fde23bc1d0dd1abbc&" + postalCode + "=" + zipcode
});
}


 var queryURL = "http://api.brewerydb.com/v2/locations/?key=c756ef0b049ff96fde23bc1d0dd1abbc&postalCode=78736";
  $.ajax({
      url: queryURL,
      method: 'GET'
    }).done(function(response) {
      console.log(response);


     var results=response.data;
     for (var i = 0; i < results.length; i++) {
      
      var animalDiv = $("<div>");

      var lat = response.data[i].data.longitude.url;
      var lng = response.data[i].data.latitude.url;

      var p = $("<p>").text(results[i].longitude);

     }
    
    });

    //starting map js
      var map;
      var markers = [];
      var geocoder = new google.maps.Geocoder();
      var infowindow;
function geocodePosition(pos,box_no) {
  geocoder.geocode({
    latLng: pos
  }, function(responses) {
    if (responses && responses.length > 0) {
        if(box_no == '1'){
            updateMarkerAddress1(responses[0].formatted_address);
        }
        else{
            updateMarkerAddress2(responses[0].formatted_address);
        }
    } else {
        if(box_no == '1'){
            updateMarkerAddress1('Cannot determine address at this location.');
        }
        else{
            updateMarkerAddress2('Cannot determine address at this location.');
        }
    }
  });
}

function updateMarkerPosition(latLng) {
    var str =  latLng.lat() +" "+ latLng.lng();
  $('#info').val(str);
}
function updateMarkerAddress1(str) {
  $('#address1').val(str);
}
function updateMarkerAddress2(str) {
  $('#address2').val(str);
}
// drag end
    var mj;
    var directionsDisplay;
    var directionsService = new google.maps.DirectionsService();
    var rendererOptions = {
      draggable: false,
    };
function initialize() {
    directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
    var austin = new google.maps.LatLng(30.2672 , -97.7431);
    var mapOptions = {
      zoom: 11,
      center: austin
    }
  map = new google.maps.Map(document.getElementById('map-canvas'), {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoom: 11,
    center: austin
  });
// direction service code
directionsDisplay.setMap(map);
// search box defined here
  var input1 = $('.pac-input')[0];
  var input2 = $('.pac-input')[1];
  // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  var searchBox1 = new google.maps.places.SearchBox((input1));
  var searchBox2 = new google.maps.places.SearchBox((input2));
 // search function start here
  google.maps.event.addListener(searchBox1, 'places_changed', function() {
    console.log("searchbox 1");
    var places = searchBox1.getPlaces();
    if (places.length == 0) {
      return;
    }
    for (var i = 0, marker; marker = markers[i]; i++) {
      marker.setMap(null);
    }
    // For each place, get the icon, place name, and location.
    var bounds = new google.maps.LatLngBounds();

    for (var i = 0, place; place = places[i]; i++) {
      // Create a marker for each place.
       marker = new google.maps.Marker({
        map: map,
        title: place.name,
        position: place.geometry.location,
        draggable: false
      });

    $(".latitude").val(place.geometry.location.lat());
    $(".longitude").val(place.geometry.location.lng());
    updateMarkerPosition(marker.getPosition());
    geocodePosition(marker.getPosition(),'1');
    google.maps.event.addListener(marker, 'dragend', function() {
    geocodePosition(marker.getPosition(),'1');
    $(".latitude").val(marker.getPosition().lat());
    $(".longitude").val(marker.getPosition().lat());
  
  });
  markers.push(marker);
  bounds.extend(place.geometry.location);
    }


  });
google.maps.event.addListener(searchBox2, 'places_changed', function() {
    console.log("searchbox 2");
  var places1 = searchBox2.getPlaces();
  if (places1.length == 0) {
    return;
  }
  for (var i = 0, marker; marker = markers[i]; i++) {
    marker.setMap(null);
  }
  // For each place, get the icon, place name, and location.
  var bounds = new google.maps.LatLngBounds();
  for (var i = 0, place; place = places1[i]; i++) {
  // Create a marker for each place.
    marker = new google.maps.Marker({
          map: map,
          title: place.name,
          //this is pulling some data,, i am unable to get a window thoooo
          //title: place.title,
          
          position: place.geometry.location,
          draggable: false

    });

//CURRENT WORK AREA
    //for(var i = 0,title; title = place.name[i]; i++){
   // var title = place.name,
   // var infowindow = new google.maps.InfoWindow();
    //google.maps.event.addListener(marker, "click", function(){
     // infowindow.setContent(title);
      //infowindow.open(map, this);
    //})
  //};




    $(".latitude2").val(place.geometry.location.lat());
    $(".longitude2").val(place.geometry.location.lng());
    updateMarkerPosition(marker.getPosition());
    geocodePosition(marker.getPosition(),'2');
    google.maps.event.addListener(marker, 'dragend', function() {
      
      geocodePosition(marker.getPosition(),'2');
      $(".latitude2").val(marker.getPosition().lat());
      $(".longitude2").val(marker.getPosition().lat());
    
    });

    markers.push(marker);
    bounds.extend(place.geometry.location);
    }
    
});
}
//initial function close here
// calculate route function
function calcRoute() {
  var start = $('#address1').val();
  var end = $('#address2').val();
  var request = {
      origin: start,
      destination: end,
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.DRIVING
  };
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
      console.log("Done");
      var route = response.routes[0];
    }
  });
}
//to compute total distance function
function computeTotalDistance(result) {
  var total = 0;
  var myroute = result.routes[0];
  for (var i = 0; i < myroute.legs.length; i++) {
    total += myroute.legs[i].distance.value;
  }
  total = total / 1000.0;
  document.getElementById('total').innerHTML = total + ' km';
}
google.maps.event.addDomListener(window, 'load', initialize);
//tied to the .ready(function) at the top
});