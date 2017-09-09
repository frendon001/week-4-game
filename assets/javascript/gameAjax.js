// Handler for .ready() called.
$(document).ready(function() {
	//Create object with required variables and methods
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
		startGameFormat: function(character) {
			//set background based on selected character
			$("body").removeClass();
			//make the active game columns visible
			$(".active-game-col").removeClass("d-none");
			//reformat the rogue list
			$(".rogue-list").removeClass("icon-img").addClass("stand-by");
			//move attribute characteristics for rogues
			$(".character-attributes").addClass("character-attributes-start");
			//reformat the and add a new message at the top of the page
			$(".message-col").removeClass("col-md-8").addClass("col-md-5 text-center");
			$(".message-col p").text("Chose your first opponent from the list of rogues at the bottom of the page.");
			//set different background based on character selected
			//remove selected character from rogue list
			//add selected character to player area
			$.getJSON('https://raw.githubusercontent.com/frendon001/week-4-game/master/assets/api/characters.json')
				.done(function(characters) {
					var player = "";
					$.each(characters, function(i, characterRef) {
						//change all character's column widths once character is selected
						$(characterRef.colName).removeClass("col-sm-3").addClass("col-sm-4");

						if (characterRef.name === character) {
							//change the background to selected character turf
							$("body").addClass(characterRef.backgroundCSS);
							//remove character from rofue list
							$(characterRef.colName).addClass("d-none");
							//add character to player section
							$("#player-character").attr("src", characterRef.playerImg);
							//give player attributes to display
							$("#player-attack").text(characterRef.attack);
							$("#player-hp").text(characterRef.hp);
							//assign player with character data
							player = characterRef;
						}
					});
					//asign the character data to the player variable for the game
					game.player = player;

				})
				.fail(function(jqxhr, textStatus, error) {
					var err = textStatus + ", " + error;
					console.log("Request Failed: " + err);
				});
		},
		newOpponent: function(character) {
			//display oppnent details
			$(".opponent").removeClass("d-none");
			//set background based on selected character
			$("body").removeClass();
			//new message at the top of the page
			$(".message-col p").text("Defeat " + character + " in a one on one match!");
			//add selected character to opponent section
			//$.getJSON( "assets/api/characters.json")
			$.getJSON('https://raw.githubusercontent.com/frendon001/week-4-game/master/assets/api/characters.json')
				.done(function(characters) {
					var selected = "";
					$.each(characters, function(i, characterRef) {

						if (characterRef.name === character) {
							//change the background to selected character turf
							$("body").addClass(characterRef.backgroundCSS);
							//remove selected character from rogue list
							$(characterRef.colName).addClass("d-none");
							//add the character image to oppoent section
							$("#opponent-character").attr("src", characterRef.playerImg);
							//add character data to display for opponent
							$("#opponent-counter").text(characterRef.counter);
							$("#opponent-hp").text(characterRef.hp);
							selected = characterRef;
						}
					});
					//asign the character data to the opponent variable for the game
					game.opponent = selected;
					//console.log(game.player);

				})
				.fail(function(jqxhr, textStatus, error) {
					var err = textStatus + ", " + error;
					console.log("Request Failed: " + err);
				});
		},
		animateAttack: function(element,type) {
			if(type === "player"){
				$( element ).animate({
				left: "+=90",
				},
				500
				).animate({
				left: "-=90",
				},
				500
			);
			}
			if(type === "opponent"){
				$( element ).animate({
				left: "-=90",
				},
				500
				).animate({
				left: "+=90",
				},
				500
			);
			}

		}

	};

	// create audio element and assign it to attack sound
	var audioAttack1 = document.createElement('audio');
	audioAttack1.setAttribute('src', 'assets/audio/attack1.mp3');
	var audioAttack2 = document.createElement('audio');
	audioAttack2.setAttribute('src', 'assets/audio/attack2.mp3');
	//create win/lose audio
	var audioWin = document.createElement('audio');
	audioWin.setAttribute('src', 'assets/audio/winFanFare.mp3');
	var audioLoss = document.createElement('audio');
	audioLoss.setAttribute('src', 'assets/audio/loss.mp3');
	//reset of audio to prevent delay
	audioAttack1.addEventListener("timeupdate", function() {
		if (parseInt(this.currentTime, 10) > 1) {
			this.pause();
			this.currentTime = 0;

		}
	});
	//reset of audio to prevent delay
	audioAttack2.addEventListener("timeupdate", function() {
		if (parseInt(this.currentTime, 10) > 1) {
			this.pause();
			this.currentTime = 0;
		}
	});

	//Execute upon page load
	//get character information from json file and add data to index.html
	$.ajax({
		type: 'GET',
		//url: 'assets/api/characters.json',
		url: 'https://raw.githubusercontent.com/frendon001/week-4-game/master/assets/api/characters.json',
		//type: "json",
		success: function(characters) {
			characters = JSON.parse(characters);
			//populate chancter information for each character
			$.each(characters, function(i, character) {
				var characterAttack = character.colName + " .character-attack";
				var characterCounter = character.colName + " .character-counter";
				var characterHp = character.colName + " .character-hp";

				$(characterAttack).text(character.attack);
				$(characterCounter).text(character.counter);
				$(characterHp).text(character.hp);
			});
		},
		error: function() {
			console.log("Error loading characters.");
		}
	});



	//Action when rogue list is selected
	$(".col-img").on("click", function() {
		var clickedCharacter = $(this).children(".rogue-list").attr("alt");
		var isDefeated = $(this).hasClass("defeated");
		if (game.selectCharacter === false) {
			//select character to start game
			$("#attack-btn").addClass("d-none");
			game.selectCharacter = true;
			game.startGameFormat(clickedCharacter);
			//game.assignPlayer(clickedCharacter);

		} else if (game.selectOpponent === false && !isDefeated) {
			$("#attack-btn").removeClass("d-none");
			game.selectOpponent = true;
			//select opponet to being attack if not already defeated
			game.newOpponent(clickedCharacter);
			//game.assignOpponent(clickedCharacter);
		}
	});

	//action when attack is selected
	$("#attack-btn").on("click", function() {


		if (game.player.hp > 0 && game.selectOpponent === true) {
			//play attack sound
			var randomNum = Math.floor(Math.random() * 2) + 1;
			console.log(randomNum)
			if (randomNum === 1) {
				audioAttack1.play();
			} else {
				audioAttack2.play();
			}

			//animate player attack
			game.animateAttack("#player-character","player");





			//update message
			$(".message-col p").text(game.player.name + " attacked with " +
				game.player.attack + " and " + game.opponent.name +
				" countered with " + game.opponent.counter);
			//apply attack
			game.opponent.hp -= game.player.attack;
			// check if opponent is defeated
			if (game.opponent.hp < 0) {
				audioWin.play();
				var character = game.opponent.name;
				game.selectOpponent = false;
				game.opponentsDefeated++;
				$("#attack-btn").addClass("d-none");
				$(".message-col p").text("You defeated " + game.opponent.name + "! Select another opponent.");
				//hide opponent details
				$(".opponent").addClass("d-none");
				$(game.opponent.colName).removeClass("d-none active-rogue").addClass("defeated");

				if (game.opponentsDefeated >= 3) {
					
					$(".message-col p").text("You have defeated all the rogues! Press reset to play again.");
				}
			} else {
				//animate opponent attack
				game.animateAttack("#opponent-character","opponent");

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
			//player has lost the game play audio for losing
			audioLoss.play();
			//display message to let player know of defeat
			$(".message-col p").text("You have been deafeated. Reset the game to play again.");
			//remove player and attack btn
			$("#attack-btn").addClass("d-none");
			$(".player").addClass("d-none");
		}
	});



});