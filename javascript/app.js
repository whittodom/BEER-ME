
$(document).ready(function(){

  //modal
  $(".modal").modal({
    dismissible: false, // Modal can't be dismissed by clicking outside of the modal
    opacity: .5, // Opacity of modal background
    inDuration: 300, // Transition in duration
    outDuration: 200, // Transition out duration
    startingTop: '4%', // Starting top style attribute
    endingTop: '10%', // Ending top style attribute
  });

  //modal user input validation
  $("#age-confirm").on("click", function(){
    var month = $("#age-select-month").val();//store user input month
    console.log(month);

    var day = $("#age-select-day").val();//store user input day
    console.log(day);

    var year = $("#age-select-year").val();//store user input year
    console.log(year);

    var age = 21; //age to enter
    var birthDate = new Date();
    birthDate.setFullYear(year, month-1, day);

    var currentDate = new Date();
    currentDate.setFullYear(currentDate.getFullYear() - age);
    if ((currentDate - birthDate) < 0){
      //Add paragraph that says they're not old enough to enter site
      //do NOT close modal
      console.log("Nope!");
      return false;
    }
      console.log("Come on in!");
      return true;
  })

  $(".modal").modal("open"); //open modal on doc ready


  //Materialize JS
	$(".button-collapse").sideNav(); //initialize mobile format

	$('select').material_select(); //initialize multiple selection drop-down menu


  //Zomato
$.ajax({
  type: "GET", //it's a GET request API
  headers: {
    'X-Zomato-API-Key': '3188326edb571cb21760fac9ee7377f0' //only allowed non-standard header
  },
  url: 'https://developers.zomato.com/api/v2.1/search', //what do you want
  dataType: 'json', //wanted response data type - let jQuery handle the rest...
  data: {
     //could be directly in URL, but this is more pretty, clear and easier to edit
     entity_id: '278',
     entity_type: 'city',
     count: '10',
     establishment_type: '283',
     category: 'Brewery',
     sort: 'rating',
     order: 'desc'
  },
  processData: true, //data is an object => tells jQuery to construct URL params from it
  success: function(data) {
    console.log(data); //what to do with response data on success
  }
});

	function finalBeer() {

		var beerCounts = {
			lager: 0,
			ale: 0,
			wheat: 0,
			stout: 0,
			ipa: 0,
			saison: 0,
			kolsch: 0,
			gose: 0,
			pils: 0,
			porter: 0,
			hefeweizen: 0,
		}

		var questions = $(".question");
		var numOfQuestions = questions.length;

		console.log(numOfQuestions);
		for (var i = 0; i < questions.length; i++) {
			var selectValue = $(questions[i]).val();

			if (selectValue) {
				beerCounts[selectValue]++;
			}
		}

		console.log(beerCounts);

		var mostLikedBeer;
		var highestValue = 0;
		for (var beer in beerCounts) {
			var currentValue = beerCounts[beer];

			if (currentValue > highestValue) {
				mostLikedBeer = beer;
				highestValue = currentValue;
			}
		}

		console.log(mostLikedBeer);
	};

	$("#quizSubmit").on("click", finalBeer);

});


//30.2672° N, 97.7431° W
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
  script.src = 'https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js';
  document.getElementsByTagName('head')[0].appendChild(script);
}

// Loop through the results array and place a marker for each
// set of coordinates.
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
