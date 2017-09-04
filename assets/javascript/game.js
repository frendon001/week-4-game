var selectCharacter = false;
var selectOpponent = false;
var selectNext = false;



function startGameFormat(character) {
	//set background based on selected character
	$("body").removeClass();
	//make the active game columns visible
	$(".active-game-col").removeClass("d-none");
	//reformat the rogue list
	$(".rogue-list").removeClass("icon-img").addClass("stand-by");
	//reformat the and add a new message at the top of the page
	$(".message-col").removeClass("col-md-8").addClass("col-md-5");
	$(".message-col p").text("Chose your first opponent from the list of rogues at the bottom of the page.");
	//set different background based on character selected
	//remove selected character from rogue list
	//add selected character to player area
	if (character === "Superman") {
		$("body").addClass("background-superman");
		$("#col-superman").addClass("d-none");
		$("#player-character").attr("src", "assets/images/player_superman.png");
	}
	if (character === "Wonder Woman") {
		$("body").addClass("background-wonder-woman");
		$("#col-wonder-woman").addClass("d-none");
		$("#player-character").attr("src", "assets/images/player_wonder_woman.png");
	}
	if (character === "Batman") {
		$("body").addClass("background-batman");
		$("#col-batman").addClass("d-none");
		$("#player-character").attr("src", "assets/images/player_batman.png");
	}
	if (character === "The Flash") {
		$("body").addClass("background-flash");
		$("#col-flash").addClass("d-none");
		$("#player-character").attr("src", "assets/images/player_flash.png");
	}

}

function newOpponent(character) {
	//display oppnent details
	$(".opponent").removeClass("d-none");
	//set background based on selected character
	$("body").removeClass();
console.log(character);
	//new message at the top of the page
	$(".message-col p").text("Defeat " + character + " in a one on one match!");
	//add selected character to opponent section
	if (character === "Superman") {
		$("body").addClass("background-superman");
		$("#col-superman").addClass("d-none");
		$("#opponent-character").attr("src", "assets/images/player_superman.png");
	}
	if (character === "Wonder Woman") {
		$("body").addClass("background-wonder-woman");
		$("#col-wonder-woman").addClass("d-none");
		$("#opponent-character").attr("src", "assets/images/player_wonder_woman.png");
	}
	if (character === "Batman") {
		$("body").addClass("background-batman");
		$("#col-batman").addClass("d-none");
		$("#opponent-character").attr("src", "assets/images/player_batman.png");
	}
	if (character === "The Flash") {
		$("body").addClass("background-flash");
		$("#col-flash").addClass("d-none");
		$("#opponent-character").attr("src", "assets/images/player_flash.png");
	}

}


$(".col-img").on("click", function(){
	var clickedCharacter = $(this).children(".rogue-list").attr("alt");
	if (selectCharacter === false) {
		//select character to start game
		selectCharacter = true;
		startGameFormat(clickedCharacter);

	} else if (selectOpponent == false) {
		selectOpponent = true;
		//select opponet to being attack
		newOpponent(clickedCharacter);
	}
});