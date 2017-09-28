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

    //starting map js    
function initialize() {
    var map = new google.maps.Map(document.getElementById("map-canvas"));
    var austin = new google.maps.LatLng(30.2672 , -97.7431);
    map = new google.maps.Map(document.getElementById("map-canvas"), {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoom: 11,
    center: austin
  });
  // search box defined here
  var input2 = $('.pac-input')[1];
  // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  var searchBox2 = new google.maps.places.SearchBox((input2));
  // search function start here
  google.maps.event.addListener(searchBox2, 'places_changed', function createMarkers() {

  var places1 = searchBox2.getPlaces();

  if (places1.length == 0) {
    return;
  }

  for (var i = 0, place; place = places1[i]; i++) {
  // Create a marker for each place.
  var  marker = new google.maps.Marker({
          map:map,
          position: place.geometry.location,
          draggable: false

    });
   
    //CURRENT WORK AREA
   infowindow = new google.maps.InfoWindow();
   let athingy = places1[i].name;

   google.maps.event.addListener(marker, "click", function(){
      infowindow.setContent(athingy);
      infowindow.open(map, this);
    })
 
  };

    });
     
};
google.maps.event.addDomListener(window, 'load', initialize);
//tied to the .ready(function) at the top
});

