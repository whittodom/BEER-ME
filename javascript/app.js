var DEFAULT_IMAGE_URL = 'http://www.thewaterfrontbrewery.com/wp-content/uploads/2016/05/thebrewery.jpg';

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
  $(".parallax").parallax(); //initialize parallax
  $(".button-collapse").sideNav(); //initialize mobile format
  $('select').material_select(); //initialize drop-down menu
  $('.slider').slider();//initialize carousel

  //modal properties
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

    //prevent user from only entering in year of birth
    if (month === "null" ){
      console.log("Enter your birth month");
      return false;
    };
    if (day === "null"){
      console.log("Enter your birth day");
      return false;        
    };

    if (year === "null"){
      console.log("Enter your birth year");
      return false; 
    };

    if ((currentDate - birthDate) < 0){
      //do NOT close modal
      console.log("No beer for you!");
      return false;
    };
    console.log("Come on in!");
    return true;
  });

  //open modal on doc ready
  $("#modal1").modal("open"); 

  //Zomato API
  $.ajax({
    type: "GET",
    headers: {'X-Zomato-API-Key':'3188326edb571cb21760fac9ee7377f0'},//user-key
    url: 'https://developers.zomato.com/api/v2.1/search', //basic URL
    dataType: 'json', //wanted response data type
    data: { //search parameters
      q: "brewery",
      count: "5",    
      radius: 15,  
      sort: "rating",            
      lat: 30.2672,
      lon: -97.7431
    },
    processData: true,//data is an object; jQuery to construct URL params
    success: function(data) {
      var results = data;
      console.log(results); 
      if ( results.restaurants.length > 0 ){
        for (var d = 0; d < results.restaurants.length; d++){

              var zomatoName = results.restaurants[d].restaurant.name;
              console.log(zomatoName);

              var zomatoRating = results.restaurants[d].restaurant.user_rating.aggregate_rating;
              console.log(zomatoRating);

              var zomatoImage = results.restaurants[d].restaurant.featured_image;
              console.log(zomatoImage);

              if (!zomatoImage) {
                zomatoImage = DEFAULT_IMAGE_URL;
              }

              $("<li><img src=" + zomatoImage + " alt='Brewery Image'><div class='caption center-align'><h2>" + zomatoName + "</h2><p>" + zomatoRating + "</p></div></li>").appendTo("#add-content");

              $('.slider').slider();//initialize carousel
        };
      } else {
        console.log("else");
        for (var e = 0; e < backupImages.length; e++){

              $("<li><img src=" + backupImages[e] + " alt='Backup Image'></li>").appendTo("#add-content");

              $('.slider').slider();//initialize carousel              
        }           
      } //end else statement      
    } //end success function
  }); //end ajax

  //global variables 
  var zipCode;
  var lat;
  var long;
  var href = 0;
  var backupImages = [
    "https://i0.wp.com/centraltexasmurals.com/wp-content/uploads/2011/01/greetingsTOPPER_1462-copy.jpg",
    "http://48tx1q1rrcysi4t7l687xbtt.wpengine.netdna-cdn.com/wp-content/uploads/butter-half-mural.jpg", 
    "http://media.culturemap.com/crop/67/d4/633x475/Austin-City-Limits-ACL-Music-Festival-sign-2015_120427.jpg", 
    "http://7c869652befb31196935-4a29ef327f2ff20a96292ed0b00504aa.r10.cf1.rackcdn.com/XLGallery/wes3899wn-178941-Sixth-Street-Mural.jpg",
    "http://www.longhornhumor.com/wordpress/wp-content/uploads/2015/04/austin-3.jpg"
  ];

  //locationInput
  $("#zipCode").change(function(){
    zipCode = $(this).val();
    console.log("zip code: " + zipCode);
    switch (zipCode) {
      case '78759': //North Austin
        lat = 30.401356;
        long = -97.7525352;
        console.log(lat + " and " + long);
        break;
      case '78744': //South Austin
        lat = 30.196311;
        long = -97.730807;
        console.log(lat + " and " + long);
        break;
      case '78724': //East Austin
        lat = 30.2944269;
        long = -97.6222665;
        console.log(lat + " and " + long);
        break;
      case '78733': //West Austin
        lat = 30.33151879999999;
        long = -97.86671820000001;
        console.log(lat + " and " + long);
        break;
      case '78701': //Downtonw Austin
        lat = 30.2729209;
        long = -97.74438630000002;
        console.log(lat + " and " + long);
        break;
      default: // not sure
        console.log('no response');
    }

    //Zomato API (for zip codes)
    $.ajax({
        type: "GET",
        headers: {'X-Zomato-API-Key':'3188326edb571cb21760fac9ee7377f0'},//user-key
        url: 'https://developers.zomato.com/api/v2.1/search', //basic URL
        dataType: 'json', //wanted response data type
        data: { //search parameters
          q: "brewery",
          count: "5",    
          radius: 5,  
          sort: "rating",            
          lat: lat,
          lon: long
        },
        processData: true,//data is an object; jQuery to construct URL params
        success: function(data) {

          $("#add-content").empty(); //prevent repetition
          var results = data;
          console.log("lat: " + lat + "," + " long: " + long);
          console.log(results); 

          if ( results.restaurants.length > 0 ){
            for (var d = 0; d < results.restaurants.length; d++){
                  
                  var zomatoName = results.restaurants[d].restaurant.name;
                  console.log(zomatoName);

                  var zomatoRating = results.restaurants[d].restaurant.user_rating.aggregate_rating;
                  console.log(zomatoRating);

                  var zomatoImage = results.restaurants[d].restaurant.featured_image;
                  console.log(zomatoImage);
                  
                  if (!zomatoImage) {
                    zomatoImage = DEFAULT_IMAGE_URL;
                  }

                  $("<li><img src=" + zomatoImage + " alt='Brewery Image'><div class='caption center-align'><h2>" + zomatoName + "</h2><p>" + zomatoRating + "</p></div></li>").appendTo("#add-content");

                  $('.slider').slider();//initialize carousel
            };
          } else {
           // $("#add-content").empty(); //prevent repetition
            console.log("else");
            for (var e = 0; e < backupImages.length; e++){

                  $("<li><img src=" + backupImages[e] + " alt='Backup Image'></li>").appendTo("#add-content");

                  $('.slider').slider();//initialize carousel              
            }           
          } //end else statement      
        } //end success function
    }); //end ajax 

  });

//scroll functions
  $("#mars").on("click", function(){
    function scrollTo(){
      $("html, body").animate({scrollTop: $("#main-section").offset().top}, "slow");
      // return false;
    }
    scrollTo();
  });

  $("#coda").on("click", function(){
    function scrollTo2(){
      $("html, body").animate({scrollTop: $("#main-section").offset().top}, "slow");
      // return false;
    }
    scrollTo2();
  });

  //This function will run after user inputs beer quiz answers and clicks Submit
  function finalBeer () {

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

    for (var i = 0; i < questions.length; i++) {
      var selectValue = $(questions[i]).val();

      if (selectValue) {
        beerCounts[selectValue]++;
      };
    };

    var mostLikedBeer;

    var highestValue = 0;

    for (var beer in beerCounts) {
      var currentValue = beerCounts[beer]
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

  $("#quizSubmit").on("click", finalBeer);

});//end of doc ready wrapper

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
  };

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
    };
  }

