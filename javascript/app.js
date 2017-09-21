
$(document).ready(function(){

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