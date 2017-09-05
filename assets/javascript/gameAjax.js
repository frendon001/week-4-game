var data = [];

var game = {
	selectCharacter: false,
	selectOpponent: false,
	selectNext: false,
	opponentsDefeated: 0,
	player: {
		name: "",
		hp: 0,
		attack: 0,
		baseAttack: 0,
		counter: 0
	},
	opponent: {
		name: "",
		hp: 0,
		attack: 0,
		baseAttack: 0,
		counter: 0
	},
	superman: {
		name: "Superman",
		hp: 117,
		attack: 17,
		baseAttack: 17,
		counter: 27
	},
	wonderWoman: {
		name: "Wonder Woman",
		hp: 150,
		attack: 12,
		baseAttack: 12,
		counter: 24
	},
	batman: {
		name: "Batman",
		hp: 190,
		attack: 8,
		baseAttack: 8,
		counter: 16
	},
	flash: {
		name: "The Flash",
		hp: 165,
		attack: 10,
		baseAttack: 10,
		counter: 20
	},
	assignPlayer: function(character) {
		if (character === "Superman") {
			game.player = game.superman;

		}
		if (character === "Wonder Woman") {
			game.player = game.wonderWoman;

		}
		if (character === "Batman") {
			game.player = game.batman;

		}
		if (character === "The Flash") {
			game.player = game.flash;

		}

	},
	assignOpponent: function(character) {
		if (character === "Superman") {
			game.opponent = game.superman;

		}
		if (character === "Wonder Woman") {
			game.opponent = game.wonderWoman;

		}
		if (character === "Batman") {
			game.opponent = game.batman;

		}
		if (character === "The Flash") {
			game.opponent = game.flash;
		}
	},
	startGameFormat: function(character) {
		//set background based on selected character
		$("body").removeClass();
		//make the active game columns visible
		$(".active-game-col").removeClass("d-none");
		//reformat the rogue list
		$(".rogue-list").removeClass("icon-img").addClass("stand-by");
		//reformat the and add a new message at the top of the page
		$(".message-col").removeClass("col-md-8").addClass("col-md-5 text-center");
		$(".message-col p").text("Chose your first opponent from the list of rogues at the bottom of the page.");
		//set different background based on character selected
		//remove selected character from rogue list
		//add selected character to player area

// data = $.ajax({
// 	async: false,
// 	type: 'GET',
//     url: '/api/characters.json',
//     dataType: "JSON",
//     success: function(data) {
//         //myvar = data;
//     }
// }).responseJSON;

		$.getJSON( "assets/api/characters.json")
			.done(function( characters ) {
				$.each(characters, function(i, characterRef){

					if (characterRef.name === character) {
						$("body").addClass(characterRef.backgroundCSS);
						$(characterRef.colName).addClass("d-none");
						$("#player-character").attr("src", characterRef.playerImg);
						$("#player-attack").text(characterRef.attack);
						$("#player-hp").text(characterRef.hp);
						selected = characterRef;
					}
				});

			})
			.fail(function( jqxhr, textStatus, error ) {
				var err = textStatus + ", " + error;
				console.log( "Request Failed: " + err );
		});


		// $.ajax({
		// 	type: 'GET',
		// 	url: '/api/characters.json',
		// 	success: function(characters) {
		// 		$.each(characters, function(i, characterRef){

		// 			if (characterRef.name === character) {
		// 				$("body").addClass(characterRef.backgroundCSS);
		// 				$(characterRef.colName).addClass("d-none");
		// 				$("#player-character").attr("src", characterRef.playerImg);
		// 				game.player = characterRef;
		// 				console.log(game.player);
		// 				console.log("test");

		// 			}

		// 		});
		// 	},
		// 	error: function(){
		// 		console.log("Error loading characters.");
		// 	}
		// });


		// if (character === "Superman") {
		// 	$("body").addClass("background-superman");
		// 	$("#col-superman").addClass("d-none");
		// 	$("#player-character").attr("src", "assets/images/player_superman.png");
		// 	game.player = game.superman;
		// }
		// if (character === "Wonder Woman") {
		// 	$("body").addClass("background-wonder-woman");
		// 	$("#col-wonder-woman").addClass("d-none");
		// 	$("#player-character").attr("src", "assets/images/player_wonder_woman.png");
		// 	game.player = game.wonderWoman;
		// }
		// if (character === "Batman") {
		// 	$("body").addClass("background-batman");
		// 	$("#col-batman").addClass("d-none");
		// 	$("#player-character").attr("src", "assets/images/player_batman.png");
		// 	game.player = game.batman;
		// }
		// if (character === "The Flash") {
		// 	$("body").addClass("background-flash");
		// 	$("#col-flash").addClass("d-none");
		// 	$("#player-character").attr("src", "assets/images/player_flash.png");
		// 	game.player = game.flash;
		// }

		// $("#player-attack").text(game.player.attack);
		// $("#player-hp").text(game.player.hp);
	},
	newOpponent: function(character) {
		//display oppnent details
		$(".opponent").removeClass("d-none");
		//set background based on selected character
		$("body").removeClass();
		//new message at the top of the page
		$(".message-col p").text("Defeat " + character + " in a one on one match!");
		//add selected character to opponent section
		$.getJSON( "assets/api/characters.json")
			.done(function( characters ) {
				var selected = "";
				$.each(characters, function(i, characterRef){

					if (characterRef.name === character) {
						$("body").addClass(characterRef.backgroundCSS);
						$(characterRef.colName).addClass("d-none");
						$("#opponent-character").attr("src", characterRef.playerImg);
						$("#opponent-attack").text(characterRef.attack);
						$("#opponent-hp").text(characterRef.hp);
						selected = characterRef;
					}
				});
				//game.player = selected;

			})
			.fail(function( jqxhr, textStatus, error ) {
				var err = textStatus + ", " + error;
				console.log( "Request Failed: " + err );
		});
		// if (character === "Superman") {
		// 	$("body").addClass("background-superman");
		// 	$("#col-superman").addClass("d-none");
		// 	$("#opponent-character").attr("src", "assets/images/player_superman.png");
		// 	game.opponent = game.superman;
		// }
		// if (character === "Wonder Woman") {
		// 	$("body").addClass("background-wonder-woman");
		// 	$("#col-wonder-woman").addClass("d-none");
		// 	$("#opponent-character").attr("src", "assets/images/player_wonder_woman.png");
		// 	game.opponent = game.wonderWoman;
		// }
		// if (character === "Batman") {
		// 	$("body").addClass("background-batman");
		// 	$("#col-batman").addClass("d-none");
		// 	$("#opponent-character").attr("src", "assets/images/player_batman.png");
		// 	game.opponent = game.batman;
		// }
		// if (character === "The Flash") {
		// 	$("body").addClass("background-flash");
		// 	$("#col-flash").addClass("d-none");
		// 	$("#opponent-character").attr("src", "assets/images/player_flash.png");
		// 	game.opponent = game.flash;
		// }
		// $("#opponent-attack").text(game.opponent.attack);
		// $("#opponent-hp").text(game.opponent.hp);
	}

};






$(".col-img").on("click", function() {
	var clickedCharacter = $(this).children(".rogue-list").attr("alt");
	var isDefeated = $(this).hasClass("defeated");
	if (game.selectCharacter === false) {
		//select character to start game
		$("#attack-btn").addClass("d-none");
		game.selectCharacter = true;
		game.startGameFormat(clickedCharacter);
		game.assignPlayer(clickedCharacter);

	} else if (game.selectOpponent === false && !isDefeated) {
		$("#attack-btn").removeClass("d-none");
		game.selectOpponent = true;
		//select opponet to being attack if not already defeated
		game.newOpponent(clickedCharacter);
		game.assignOpponent(clickedCharacter);
	}

	console.log("log player");
	console.log(game.player);
	console.log("log opponent");
	console.log(game.opponent);
});


$("#attack-btn").on("click", function() {

	if (game.player.hp > 0 && game.selectOpponent === true) {
		//update message
		$(".message-col p").text(game.player.name + " attacked with " +
			game.player.attack + " and " + game.opponent.name +
			" countered with " + game.opponent.counter);
		//apply attack
		game.opponent.hp -= game.player.attack;
		// check if opponent is defeated
		if (game.opponent.hp < 0) {
			var character = game.opponent.name;
			game.selectOpponent = false;
			game.opponentsDefeated++;
			$("#attack-btn").addClass("d-none");
			$(".message-col p").text("You defeated " + game.opponent.name + "! Select another opponent.");
			//display opponent details
			$(".opponent").addClass("d-none");
			if (character === "Superman") {
				$("#col-superman").removeClass("d-none active-rogue").addClass("defeated");

			}
			if (character === "Wonder Woman") {
				$("#col-wonder-woman").removeClass("d-none active-rogue").addClass("defeated");

			}
			if (character === "Batman") {
				$("#col-batman").removeClass("d-none active-rogue").addClass("defeated");

			}
			if (character === "The Flash") {
				$("#col-flash").removeClass("d-none active-rogue").addClass("defeated");

			}

			if (game.opponentsDefeated >= 3) {
				$(".message-col p").text("You have defeated all the rogues! Press reset to play again.");
			}
		} else {
			//opponent is not defeated so player receives counter attack
			game.player.hp -= game.opponent.counter;
			game.player.attack += game.player.baseAttack;
		}


		//update attack and health for each character
		$("#opponent-hp").text(game.opponent.hp);
		$("#player-attack").text(game.player.attack);
		$("#player-hp").text(game.player.hp);
	}



	if (game.player.hp < 0) {
		$(".message-col p").text("You have been deafeated. Reset the game to play again.");
		$("#attack-btn").addClass("d-none");
	}
});


	$( document ).ready(function() {
	// Handler for .ready() called.
	// add attack and HP information from object
		// $("#col-superman .character-attack").text(game.superman.attack);
		// $("#col-superman .character-hp").text(game.superman.hp);

		// $("#col-wonder-woman .character-attack").text(game.wonderWoman.attack);
		// $("#col-wonder-woman .character-hp").text(game.wonderWoman.hp);

		// $("#col-batman .character-attack").text(game.batman.attack);
		// $("#col-batman .character-hp").text(game.batman.hp);

		// $("#col-flash .character-attack").text(game.flash.attack);
		// $("#col-flash .character-hp").text(game.flash.hp);


		$.ajax({
			type: 'GET',
			url: 'assets/api/characters.json',
			success: function(characters) {
				$.each(characters, function(i, character){
					var characterAttack = character.colName + " .character-attack";
					var characterHp = character.colName + " .character-hp";

					$(characterAttack).text(character.attack);
					$(characterHp).text(character.hp);
					//console.log(character);
				});
			},
			error: function(){
				console.log("Error loading characters.");
			}
		});



	});