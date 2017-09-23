$( document ).ready(function(){
//https://crossorigin.me/http://api.brewerydb.com/v2/locations/?key=
//api key" + cityState + "=" + where
//firebase data
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

//database.ref().on("child_added", function(snapshot) {
//var sv = snapshot.val();
//var queryURL = sv.val().queryURL();
///console.log(sv)
//
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

      var p = $("<p>").text("Rating: " + results[i].longitude);
      
     // var animalImage = $("<p>").attr({
       // "src": gifIMAGE,
        //"data-still": gifIMAGE,
        //"data-animate": gifACTION,
        //"data-state": "still",
        //"class": "GIFSTATE"
     // });
        
    //  animalDiv.append(p);
      //animalDiv.append(animalImage);
      

     // $("#animalGifs").prepend(animalDiv);
      
     }
    
    });

//tied to the .ready(function) at the top
});

 

    var map;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 8,
          center: new google.maps.LatLng(30.2672,-97.7431),
         mapTypeId: 'terrain'
       });

        // Create a <script> tag and set the USGS URL as the source.
        var script = document.createElement('script');
        // This example uses a local copy of the GeoJSON stored at
        // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
        // will want this to be th queryURL
        script.src = 'https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js';
        document.getElementsByTagName('head')[0].appendChild(script);
      }

       //Loop through the results array and place a marker for each
       //set of coordinates.
     window.eqfeed_callback = function(results) {
        for (var i = 0; i < results.features.length; i++) {
          var coords = results.features[i].geometry.coordinates;
          var latLng = new google.maps.LatLng(coords[1],coords[0]);
          var marker = new google.maps.Marker({
            position: latLng,
            map: map
          });
        }
      }