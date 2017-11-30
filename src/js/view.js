var view = {
	// get a container for the game
	containerForCards: document.getElementsByClassName('containerForCards')[0],
	// results of this game
	pointsPerGame: document.getElementsByClassName('pointsForGames__text')[0].getElementsByTagName('span')[0],
	losePointsPerGame: document.getElementsByClassName('pointsForGames__text')[1].getElementsByTagName('span')[0],
	winPointsPerGame: document.getElementsByClassName('pointsForGames__text')[2].getElementsByTagName('span')[0],
 	elapsedTimePerGame: document.getElementsByClassName('pointsForGames__text')[3].getElementsByTagName('span')[0],
	// таблица
	// 6
	pointsForGames6LosePointsPerGame: document.getElementsByClassName('pointsForGames_6')[0].getElementsByTagName('span')[0],
	pointsForGames6WinPointsPerGame: document.getElementsByClassName('pointsForGames_6')[0].getElementsByTagName('span')[1],
	pointsForGames6ElapsedTimePerGame: document.getElementsByClassName('pointsForGames_6')[0].getElementsByTagName('span')[2],
	// 8
	pointsForGames8LosePointsPerGame: document.getElementsByClassName('pointsForGames_8')[0].getElementsByTagName('span')[0],
	pointsForGames8WinPointsPerGame: document.getElementsByClassName('pointsForGames_8')[0].getElementsByTagName('span')[1],
	pointsForGames8ElapsedTimePerGame: document.getElementsByClassName('pointsForGames_8')[0].getElementsByTagName('span')[2],
	// 10
	pointsForGames10LosePointsPerGame: document.getElementsByClassName('pointsForGames_10')[0].getElementsByTagName('span')[0],
	pointsForGames10WinPointsPerGame: document.getElementsByClassName('pointsForGames_10')[0].getElementsByTagName('span')[1],
	pointsForGames10ElapsedTimePerGame: document.getElementsByClassName('pointsForGames_10')[0].getElementsByTagName('span')[2],
	// 12
	pointsForGames12LosePointsPerGame: document.getElementsByClassName('pointsForGames_12')[0].getElementsByTagName('span')[0],
	pointsForGames12WinPointsPerGame: document.getElementsByClassName('pointsForGames_12')[0].getElementsByTagName('span')[1],
	pointsForGames12ElapsedTimePerGame: document.getElementsByClassName('pointsForGames_12')[0].getElementsByTagName('span')[2],
	// mark the selected cards
	cardAddClassSelected: function(elem){
		elem.classList.add('containerForCards__cards_selected');
	},
	// remove mark the selected cards
	cardRemoveClassSelected: function(elem){
		elem.classList.remove('containerForCards__cards_selected');
	},
	// creates a message of victory
	showWinMessage: function(){
		var winMessage = document.createElement('div');
		winMessage.classList.add('containerForCards__winMessage');
		winMessage.innerHTML = '<p class="containerForCards__pWinMessage">Вы успешно открыли все карточки!</p>';
		this.containerForCards.appendChild(winMessage);
	},
	// deletes the message of victory
	deleteWinMessageIfPresent: function(){
		var winMessage = this.containerForCards.getElementsByClassName('containerForCards__winMessage')
		if(winMessage.length > 0){
			winMessage[0].parentNode.removeChild(winMessage[0]);
		}
	},
	addStartTimerClassInConteiner: function(){
		view.containerForCards.classList.add('startTimer');
	},
	removeStartTimerClassInConteiner: function(){
		view.containerForCards.classList.remove('startTimer');
	},
	// add elem to card container
	addElemToCardContainer: function(div){
		this.containerForCards.appendChild(div);
	},	
	// clear card game container
	clearCardGameContainer: function(){
		this.containerForCards.innerHTML = '';
	},
	// disable containerForCards
	disableContainerForCards: function(){
		this.containerForCards.classList.add('containerForCards_disabled');
	},
	// enable containerForCards
	enableContainerForCards: function(){
		this.containerForCards.classList.remove('containerForCards_disabled');
	},
	// disable card
	disableCard: function(card){
		card.classList.add('containerForCards__cards_disabled');
	},	
	// update victory points
	updateVictoryPoints: function(value){
		this.pointsPerGame.innerHTML = value;
	},
	// update lose points
	updateLosePoints: function(value){
		this.losePointsPerGame.innerHTML = value;
	},
	// update elapsed time per game
	updateElapsedTimePerGame: function(value){
		this.elapsedTimePerGame.innerHTML = value;
	},
	// output the result per game
	outputTheResultPerGame: function(value){
		this.winPointsPerGame.innerHTML = value;
	},
	// zeroes the points in the table
	zeroesThePointsInTheTable: function(){
		this.pointsPerGame.innerHTML = 0;
		this.losePointsPerGame.innerHTML = 0;
		this.winPointsPerGame.innerHTML = 0;
		this.elapsedTimePerGame.innerHTML = 0;
	},
	// sets the style of the pause button
	setsTheStyleOfThePauseButton: function(){
		controller.containerWithInformationsBtnPauseAndRemove.classList.add('containerWithInformations__btn_pause');
		controller.containerWithInformationsBtnPauseAndRemove.classList.remove('containerWithInformations__btn_resume');
		controller.containerWithInformationsBtnPauseAndRemove.innerHTML = 'пауза';
	},
	// sets the style of the resume button
	setsTheStyleOfTheResumeButton: function(){
		controller.containerWithInformationsBtnPauseAndRemove.classList.add('containerWithInformations__btn_resume');
		controller.containerWithInformationsBtnPauseAndRemove.classList.remove('containerWithInformations__btn_pause');
		controller.containerWithInformationsBtnPauseAndRemove.innerHTML = 'возобновить';
	},
	// set game style function
	setGameStyle: function(style){
		var body = document.getElementsByTagName('body')[0];
		// style1 = default style
		// style 2 = body with className "style2"
		// style 3 = body with className "style3"
		if(body.classList.contains('style2')){
			body.classList.remove('style2');
		}
		if(body.classList.contains('style3')){
			body.classList.remove('style3');
		}
		if(style == 1){
			return;
		}
		if(style == 2){
			body.classList.add('style2');
		}
		if(style == 3){
			body.classList.add('style3');
		}
	},
	loadLocalStarageInfoToATable: function(){
		// 6
		if (localStorage["pointsForGames6WinPointsPerGame"] != undefined){
			this.pointsForGames6LosePointsPerGame.innerHTML = localStorage["pointsForGames6LosePointsPerGame"];
			this.pointsForGames6WinPointsPerGame.innerHTML = localStorage["pointsForGames6WinPointsPerGame"];
			this.pointsForGames6ElapsedTimePerGame.innerHTML = localStorage["pointsForGames6ElapsedTimePerGame"];
		}
			// 8
		if (localStorage["pointsForGames8WinPointsPerGame"] != undefined){
			this.pointsForGames8LosePointsPerGame.innerHTML = localStorage["pointsForGames8LosePointsPerGame"];
			this.pointsForGames8WinPointsPerGame.innerHTML = localStorage["pointsForGames8WinPointsPerGame"];
			this.pointsForGames8ElapsedTimePerGame.innerHTML = localStorage["pointsForGames8ElapsedTimePerGame"];
		}
			// 10
		if (localStorage["pointsForGames10WinPointsPerGame"] != undefined){
			this.pointsForGames10LosePointsPerGame.innerHTML = localStorage["pointsForGames10LosePointsPerGame"];
			this.pointsForGames10WinPointsPerGame.innerHTML = localStorage["pointsForGames10WinPointsPerGame"];
			this.pointsForGames10ElapsedTimePerGame.innerHTML = localStorage["pointsForGames10ElapsedTimePerGame"];
		}
			// 12
		if (localStorage["pointsForGames12WinPointsPerGame"] != undefined){
			this.pointsForGames12LosePointsPerGame.innerHTML = localStorage["pointsForGames12LosePointsPerGame"];
			this.pointsForGames12WinPointsPerGame.innerHTML = localStorage["pointsForGames12WinPointsPerGame"];
			this.pointsForGames12ElapsedTimePerGame.innerHTML = localStorage["pointsForGames12ElapsedTimePerGame"];
		}
	},
	// move result to table
	transferTheResultToATable: function(){
		var winPointsPerGameHTML = this.winPointsPerGame.innerHTML,
			losePointsPerGameHTML = this.losePointsPerGame.innerHTML,
			elapsedTimePerGameHTML = this.elapsedTimePerGame.innerHTML;

		if(+controller.select.value == 6){
			if(this.pointsForGames6WinPointsPerGame.innerHTML < winPointsPerGameHTML){
				this.pointsForGames6LosePointsPerGame.innerHTML = losePointsPerGameHTML;
				this.pointsForGames6WinPointsPerGame.innerHTML = winPointsPerGameHTML;
				this.pointsForGames6ElapsedTimePerGame.innerHTML = elapsedTimePerGameHTML;

				localStorage["pointsForGames6LosePointsPerGame"] = losePointsPerGameHTML;
				localStorage["pointsForGames6WinPointsPerGame"] = winPointsPerGameHTML;
				localStorage["pointsForGames6ElapsedTimePerGame"] = elapsedTimePerGameHTML;
			}
		}
		if(+controller.select.value == 8){
			if(this.pointsForGames8WinPointsPerGame.innerHTML < winPointsPerGameHTML){
				this.pointsForGames8LosePointsPerGame.innerHTML = losePointsPerGameHTML;
				this.pointsForGames8WinPointsPerGame.innerHTML = winPointsPerGameHTML;
				this.pointsForGames8ElapsedTimePerGame.innerHTML = elapsedTimePerGameHTML;

				localStorage["pointsForGames8LosePointsPerGame"] = losePointsPerGameHTML;
				localStorage["pointsForGames8WinPointsPerGame"] = winPointsPerGameHTML;
				localStorage["pointsForGames8ElapsedTimePerGame"] = elapsedTimePerGameHTML;
			}
		}
		if(+controller.select.value == 10){
			if(this.pointsForGames10WinPointsPerGame.innerHTML < winPointsPerGameHTML){
				this.pointsForGames10LosePointsPerGame.innerHTML = losePointsPerGameHTML;
				this.pointsForGames10WinPointsPerGame.innerHTML = winPointsPerGameHTML;
				this.pointsForGames10ElapsedTimePerGame.innerHTML = elapsedTimePerGameHTML;

				localStorage["pointsForGames10LosePointsPerGame"] = losePointsPerGameHTML;
				localStorage["pointsForGames10WinPointsPerGame"] = winPointsPerGameHTML;
				localStorage["pointsForGames10ElapsedTimePerGame"] = elapsedTimePerGameHTML;
			}
		}
		if(+controller.select.value == 12){
			if(this.pointsForGames12WinPointsPerGame.innerHTML < winPointsPerGameHTML){
				this.pointsForGames12LosePointsPerGame.innerHTML = losePointsPerGameHTML;
				this.pointsForGames12WinPointsPerGame.innerHTML = winPointsPerGameHTML;
				this.pointsForGames12ElapsedTimePerGame.innerHTML = elapsedTimePerGameHTML;

				localStorage["pointsForGames12LosePointsPerGame"] = losePointsPerGameHTML;
				localStorage["pointsForGames12WinPointsPerGame"] = winPointsPerGameHTML;
				localStorage["pointsForGames12ElapsedTimePerGame"] = elapsedTimePerGameHTML;
			}
		}
	}
}