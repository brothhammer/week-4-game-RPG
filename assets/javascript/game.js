$(document).ready(function(){
	//global variable declaration
	var button1 = $("#button1");
 	var button2 = $("#button2");
 	var button3 = $("#button3");
 	var button4 = $("#button4");
 	var characterArray = ["aang", "katara", "toph", "zuko"]
 	var pictures = ["../images/aang.jpeg", "../images/katara.jpeg", "../images/toph.jpeg", "../images/zuko.jpeg"]
 	var characterChosen;
 	var defenderChosen;
 	var newDefHp;
 	var newPlayHp;
 	var attackCount = 0;
 	var winCount = 0;
 	chooseCharacter();

 	//add character info of starting health power (hp), attack power (ap), counter attack power (cap)
 	button1.attr({"data-hp": 100, "data-ap": 15, "data-cap": 50});
 	button2.attr({"data-hp": 120, "data-ap": 10, "data-cap": 8});
 	button3.attr({"data-hp": 150, "data-ap": 9, "data-cap": 12});
 	button4.attr({"data-hp": 140, "data-ap": 12, "data-cap": 15});

 	//function to select user character and then choose defender
 	function chooseCharacter() {
 		//click handler for character buttons
	 	$(document).on("click", ".character", function(){
	 		//if character button is in the starting area move all others to enemies area
	 		if ($(".firstClick").find(this).length > 0){

	 			console.log($(this).attr("data"));
	 			characterChosen = ($(this));
	 			$(".topTitle").text("Character Health Points "+($(this).attr("data-hp")));
	 			
	 			console.log(characterChosen.attr("data-hp"));
	 			//for loop to remove the user character from the characterArray
		 		for (i=0; i<4; i++){
		 			if (characterArray[i] === $(this).attr("data")){
		 				characterArray.splice(i, 1);
		 			}
		 		}
		 		//for loop to remove the non user characters from the start and append them to enemies area
		 		for (i=1; i<=4; i++){

		 			if (characterArray.indexOf($("#button"+i).attr("data")) !== -1){
		 				var enemiesButton = $("#button"+i);
		 				$("#button"+i).remove();
		 				$(".enemies").append(enemiesButton);

		 			}
	 			}	
	 		}
	 		//if character button no in the start area then a defender has been chosen and moves to the defender area
	 		else {
	 			console.log($(this).attr("data"));
	 			defenderChosen = $(this);
	 			console.log(defenderChosen.attr("data-hp"));

	 			$(this).remove();
	 			$(".defender").append(defenderChosen);
	 			$(document).off("click", ".character");
	 			console.log($(this).attr("data-hp"));
	 			$(".bottomTitle").text("Defender Health Points "+($(this).attr("data-hp")));
	 		}
	 		// console.log(characterArray);
	 	});
 	}

 	//click handler for attack button only active when defender selected
 	$(document).on("click", ".attack", function(){
 		//if statement to make sure there is a character in the defender area
 		if ($(".defender").find(".character").length > 0){

 			attackCount++;
 			console.log(attackCount);

 			newDefHp = parseInt(defenderChosen.attr("data-hp"))-(parseInt(characterChosen.attr("data-ap")))*attackCount;
 				defenderChosen.attr("data-hp", newDefHp);

 			newPlayHp = parseInt(characterChosen.attr("data-hp"))-parseInt(defenderChosen.attr("data-cap"));
 				characterChosen.attr("data-hp", newPlayHp);
 			console.log(defenderChosen.attr("data-hp"));
 			console.log(characterChosen.attr("data-hp"));

 			$(".topTitle").text("Character Health Points: "+characterChosen.attr("data-hp"));
 			$(".bottomTitle").text("Defender Health Points: "+defenderChosen.attr("data-hp"));

 			winLoss();
 		}
 	});
 	
 	//check if defender or user was defeated and log win/loss to console
 	function winLoss() {
 		if(newDefHp <= 0){
 			winCount++;
 			if (winCount === 3){
 				\
 			}
 			$(".defender").empty();
 			$(".defender").append("<h2 class = bottomTitle>Defender</h2>")
 			chooseCharacter();
 			defenderChosen = undefined;
 		}
 		else if(newPlayHp <= 0){
 			console.log("You Loose!");
 			$(document).off("click");
 		}
 	}

});	