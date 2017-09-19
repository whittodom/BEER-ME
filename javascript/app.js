
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

if ()






});