//google api AIzaSyA2JiaINU1ne0lx60F4HbMgKXZZbDtJraQ
$.fn.parallax = function () {
    var window_width = $(window).width();
    // Parallax Scripts
    return this.each(function (i) {
      var $this = $(this);
      $this.addClass('parallax');

      function updateParallax(initial) {
        var container_height;
        if (window_width < 601) {
          container_height = $this.height() > 0 ? $this.height() : $this.children("img").height();
        } else {
          container_height = $this.height() > 0 ? $this.height() : 500;
        }
        var $img = $this.children("img").first();
        var img_height = $img.height();
        var parallax_dist = img_height - container_height;
        var bottom = $this.offset().top + container_height;
        var top = $this.offset().top;
        var scrollTop = $(window).scrollTop();
        var windowHeight = window.innerHeight;
        var windowBottom = scrollTop + windowHeight;
        var percentScrolled = (windowBottom - top) / (container_height + windowHeight);
        var parallax = Math.round(parallax_dist * percentScrolled);

        if (initial) {
          $img.css('display', 'block');
        }
        if (bottom > scrollTop && top < scrollTop + windowHeight) {
          $img.css('transform', "translate3D(-50%," + parallax + "px, 0)");
        }
      }

      // Wait for image load
      $this.children("img").one("load", function () {
        updateParallax(true);
      }).each(function () {
        if (this.complete) $(this).trigger("load");
      });

      $(window).scroll(function () {
        window_width = $(window).width();
        updateParallax(false);
      });

      $(window).resize(function () {
        window_width = $(window).width();
        updateParallax(false);
      });
    });
  };

$( document ).ready(function(){

	//Materialize JS

  $(".parallax").parallax();

// $("#beerQuizSection").hide();

  //modal
  $("#modal1").modal({
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
    };
      console.log("Come on in!");
      return true;
  });

  $("#modal1").modal("open"); //open modal on doc ready

  //Materialize JS
	$(".button-collapse").sideNav(); //initialize mobile format

	$('select').material_select(); //initialize multiple selection drop-down menu

  //BreweryDB
  $("#zipCode").change(function(){
    var zipCode = $(this).val();
    console.log(zipCode);
    // var lat = 30.2672
    // var lng = -97.7431
    var queryURL = "http://api.brewerydb.com/v2/locations?key=0b0c6173e7c109d3992ead7165d4dda1&locality=austin&q=";

    //AJAX request
    $.ajax({
      url:queryURL,
      method: "GET"
    })  
    .done(function(response){
      var results = response.data;
      console.log(results);

    //variable to hold info -- for loop?

    //store info

    //append info
    });
  });

    //This function will run after user inputs beer quiz answers and clicks Submit

function finalBeer() {

  		var beerCounts = {
  			Lager: 0,
  			Ale: 0,
  			Wheat: 0,
  			Stout: 0,
  			IPA: 0,
  			Saison: 0,
  			Kolsch: 0,
  			Gose: 0,
  			Pils: 0,
  			Porter: 0,
  			Hefeweizen: 0,
  		};

		var questions = $(".question");
		var numOfQuestions = questions.length;

		console.log(numOfQuestions);
		for (var i = 0; i < questions.length; i++) {
			var selectValue = $(questions[i]).val();

			if (selectValue) {
				beerCounts[selectValue]++;
			};
		};

		console.log(beerCounts);

		var mostLikedBeer;
		var highestValue = 0;
		for (var beer in beerCounts) {
			var currentValue = beerCounts[beer];

			if (currentValue > highestValue) {
				mostLikedBeer = beer;
				highestValue = currentValue;
			};
		};

		console.log(mostLikedBeer);

    $("#beerStyle").text(mostLikedBeer);
};

    $("#quizSubmit").on("click", finalBeer);

		$("#modal2").modal({
	
    		dismissible: true, // Modal can't be dismissed by clicking outside of the modal
    		opacity: .5, // Opacity of modal background
    		inDuration: 300, // Transition in duration
    		outDuration: 200, // Transition out duration
    		startingTop: '4%', // Starting top style attribute
    		endingTop: '10%', // Ending top style attribute

    });

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
      //http://api.brewerydb.com/v2/?key=abcdef
