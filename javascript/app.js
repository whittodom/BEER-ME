$( document ).ready(function(){
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


  //$(".modal").modal("open"); //open modal on doc ready

	$(".button-collapse").sideNav(); //initialize mobile format

	$('select').material_select(); //initialize multiple selection drop-down menu

});

   