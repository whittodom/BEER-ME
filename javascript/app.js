//google api AIzaSyA2JiaINU1ne0lx60F4HbMgKXZZbDtJraQ
$( document ).ready(function(){

	//Materialize JS

    //modal
  	$(".modal").modal({
      dismissible: false, // Modal can be dismissed by clicking outside of the modal
      opacity: .5, // Opacity of modal background
      inDuration: 300, // Transition in duration
      outDuration: 200, // Transition out duration
      startingTop: '4%', // Starting top style attribute
      endingTop: '10%', // Ending top style attribute
	});
	
	$(".modal").modal("open"); //open modal on doc ready


	$(".button-collapse").sideNav(); //initialize mobile format

	$('select').material_select(); //initialize multiple selection drop-down menu


});

//30.2672° N, 97.7431° W
//map options
var map;
function initMap(){
  var options = {
    zoom:8,
    center: {lat:30.2672, lng:-97.7431},
  }
  //New map
  var map = new google.maps.Map(document.getElementById("map"), options);
  //add marker
  var marker = new google.maps.Marker({
    position:{lat:30.2672, lng:-97.7431},
    map:map
  });
  var infoWindow = new google.maps.InfoWindow ({
    content: "<h1>Phillo</h1>"
  });
  marker.addListener("click", function(){
    infoWindow.open(map, marker);
  });
}

