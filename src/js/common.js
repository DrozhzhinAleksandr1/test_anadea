var controller = {
	// get a select with number elements
	select: document.getElementsByClassName('containerWithInformations__cardGameSize')[0],
	// get a select with style
	selectStyle: document.getElementsByClassName('containerWithInformations__cardGameStyle')[0],
	// pause and resume
	containerWithInformationsBtnPauseAndRemove: document.getElementsByClassName('containerWithInformations__btn')[0],
	// restart
	containerWithInformationsBtnRestart: document.getElementsByClassName('containerWithInformations__btn')[1],

		// create and add elem to card game
	appendDiv: function(number, divNumber){
		var numberWidth,
			numberHeight;
		// if size 6*6
		if(this.select.value == 6){
			numberWidth = divNumber % 6;
			if(divNumber <= 6){
				numberHeight = 0;
			} else if(divNumber > 6 && divNumber <= 12){
				numberHeight = 1;
			} else {
				numberHeight = 2;
			}
		}
		// if size 8*8
		if(this.select.value == 8){
			numberWidth = divNumber % 8;
			if(divNumber <= 8){
				numberHeight = 0;
			} else if(divNumber > 8 && divNumber <= 16){
				numberHeight = 1;
			} else if(divNumber > 16 && divNumber <= 24){
				numberHeight = 2;
			} else if(divNumber > 24 && divNumber <= 32){
				numberHeight = 3;
			} 
		}
		// if size 10*10
		if(this.select.value == 10){
			numberWidth = divNumber % 10;
			if(divNumber <= 10){
				numberHeight = 0;
			} else if(divNumber > 10 && divNumber <= 20){
				numberHeight = 1;
			} else if(divNumber > 20 && divNumber <= 30){
				numberHeight = 2;
			} else if(divNumber > 30 && divNumber <= 40){
				numberHeight = 3;
			} else if(divNumber > 40 && divNumber <= 50){
				numberHeight = 4;
			}
		}
		// if size 12*12
		if(this.select.value == 12){
			numberWidth = divNumber % 12;
			if(divNumber <= 12){
				numberHeight = 0;
			} else if(divNumber > 12 && divNumber <= 24){
				numberHeight = 1;
			} else if(divNumber > 24 && divNumber <= 36){
				numberHeight = 2;
			} else if(divNumber > 36 && divNumber <= 48){
				numberHeight = 3;
			} else if(divNumber > 48 && divNumber <= 60){
				numberHeight = 4;
			} else if(divNumber > 60 && divNumber <= 72){
				numberHeight = 5;
			} else if(divNumber > 72 && divNumber <= 84){
				numberHeight = 6;
			}
		}
		// create card
		var div = model.createCardElem(number,divNumber,numberWidth,numberHeight);
		// add elem to card container
		view.addElemToCardContainer(div);
	},
	buildCardGame: function(number){ 
		view.deleteWinMessageIfPresent();
		// clear card game container
		view.clearCardGameContainer();		
		
		var randomDivNumberArray = model.createRandomDivNumberArray(number);

		for (var i = 0; i < randomDivNumberArray.length; i++){
			this.appendDiv(number, randomDivNumberArray[i]);
		}		
		// Show all cards and after 3 seconds hide them
		this.showAllImg(model.maxNumber); 
	},
	showAllImg: function(maxNumber){
		view.disableContainerForCards();

		var cards = document.getElementsByClassName('containerForCards__cards');
		
		for(var i = 1; i<=(model.maxNumber);i++){
			view.cardAddClassSelected(cards[i - 1]);
		}
		
		setTimeout(function(){
			for(var i = 1; i<=(model.maxNumber);i++){
				view.cardRemoveClassSelected(cards[i - 1])
			}
			view.enableContainerForCards();
		},3000);
	},
	buildCardGameWhenClick: function(selectValue){
		this.buildCardGame(selectValue);
		// adds a class to start the timer
		if (!view.containerForCards.classList.contains('startTimer')) {
			view.addStartTimerClassInConteiner()
		}
		// reset the timer and time
		clearInterval(model.timer);
		model.timerCount = 1;
		view.zeroesThePointsInTheTable();
		// puts the button on the value of the pause
		if(this.containerWithInformationsBtnPauseAndRemove.classList.contains('containerWithInformations__btn_resume')){
		// changes the appearance of the button
			view.setsTheStyleOfThePauseButton();
		}
	},
	// if 2 cards are selected to remove the class select
	// Is there any point in continuing the game?
	ifSelectedCards2RemoveClassSelected: function(selectedCard){
		model.viewingPermission = false;
		setTimeout(function() {
			for(var i=1;i>=0;i--){
				view.cardRemoveClassSelected(selectedCard[i]);
			}
			model.viewingPermission = true;
			if(+model.maxNumber == +model.getNumberDisabledCards()){
				view.outputTheResultPerGame(model.countResultPerGame());
				view.transferTheResultToATable();
				view.showWinMessage();			
			} 
		}, 700);
	},
	// If the selected cards match, it removes them and adds points
	ifIdenticalSelectedCards: function(){
		var selectedCard = document.getElementsByClassName('containerForCards__cards_selected');
		if(selectedCard.length == 2){
			if(selectedCard[0].getAttribute('data-elem-number') == selectedCard[1].getAttribute('data-elem-number')){
				for(var i=1;i>=0;i--){
					view.disableCard(selectedCard[i]);
				}
				view.updateVictoryPoints(model.add1WinPoints());
				this.ifSelectedCards2RemoveClassSelected(selectedCard);
			} else{
				this.ifSelectedCards2RemoveClassSelected(selectedCard);
				view.updateLosePoints(model.add1LosePoints());
			}
		}
	},		
	startTimer: function(){
		if(view.containerForCards.classList.contains('startTimer')){
			view.removeStartTimerClassInConteiner();
			model.timer = setInterval(function(){
				view.updateElapsedTimePerGame(model.timerCount++);
			},1000);
		}
	},
	// Allows you to open the following cards
	allowsYouToOpenTheFollowingCards: function(containerTarget){
		if(model.viewingPermission){
			if(containerTarget.classList.contains('containerForCards__cards')){
				if(containerTarget.classList.contains('containerForCards__cards_inGame')){
					view.cardAddClassSelected(containerTarget);
				}
			}
			controller.ifIdenticalSelectedCards();
		}
	},
	clickPauseOrResume: function(){
		if(!view.containerForCards.classList.contains('startTimer')){
			if(controller.containerWithInformationsBtnPauseAndRemove.classList.contains('containerWithInformations__btn_pause')){
				view.setsTheStyleOfTheResumeButton();

				clearInterval(model.timer);

				view.disableContainerForCards();
			} else if(controller.containerWithInformationsBtnPauseAndRemove.classList.contains('containerWithInformations__btn_resume')){
				view.setsTheStyleOfThePauseButton();

				model.timer = setInterval(function(){
					view.updateElapsedTimePerGame(model.timerCount++);
				},1000);
				if (view.containerForCards.classList.contains('containerForCards_disabled')) {
					view.enableContainerForCards();
				}
			}
		}
	},
}
var model = {
	// take mux number iteration
	maxNumber: '',
	// time variable
	timerCount: 1,
	// variable for timer
	timer:'',
	// permission for the next card flipping
	viewingPermission: true,
	// create card elem
	createCardElem: function(number,divNumber,numberWidth,numberHeight){
		var div = document.createElement('div'),
			frontDiv = document.createElement('div'),
			backgroundPositionWidth,
			backgroundPositionHeight; 
		// add class for style css
		div.className = 'containerForCards__cards containerForCards__cards_inGame containerForCards__cards_number' + number;
		// add attributes to compare items
		div.setAttribute('data-elem-number', divNumber);
		// add class to element of card
		frontDiv.classList.add('containerForCards__frontOfCard');
		// create backgroundPositionWidth
		if(numberWidth == 0){
			backgroundPositionWidth = '0%';
		} else {
			backgroundPositionWidth = numberWidth*9 + '%';
		}
		// create backgroundPositionHeight
		if(numberHeight == 0){
			backgroundPositionHeight = '0%';
		} else {
			backgroundPositionHeight = numberHeight*9 + '%';
		}
		// add style to frontDiv
		frontDiv.style.cssText="background-position:" + backgroundPositionWidth + " " + backgroundPositionHeight + ";";
		// add elem to card		
		div.appendChild(frontDiv);
		return div;
	},
	// create randomDivNumberArray
	createRandomDivNumberArray: function(number){
		// take mux number iteration
		this.maxNumber = number*number,
		// take half from nax number
		halfMaxNumber = this.maxNumber/2;
		// create array for number cards
		var divNumberArray = [],
			randomDivNumberArray = [];
		// add all number cards into array
		for(var z = 1; z<=(this.maxNumber);z++ ){
			divNumberArray[z - 1] = z;
		}
		//  construct a field with cards
		for(var i = 1; i<=(this.maxNumber);i++){
			// we obtain the index of the random element of the array
			var rand = Math.floor(Math.random() * divNumberArray.length),
			// get elem number
			divNumber = divNumberArray[rand];
			// make the numbers duplicated
			if(divNumber>halfMaxNumber){
				divNumber = divNumber-halfMaxNumber;
			}
			// create randomDivNumberArray
			randomDivNumberArray[i - 1] = divNumber;
			// remove the element of the array that it was taken again
			divNumberArray.splice(rand, 1);
		}
		return randomDivNumberArray;
	},
	// count the result per game
	countResultPerGame: function(){
		var multiplier;
		if(+controller.select.value == 6){
			multiplier = 10;
		}
		if(+controller.select.value == 8){
			multiplier = 20;
		}
		if(+controller.select.value == 10){
			multiplier = 40;
		}
		if(+controller.select.value == 12){
			multiplier = 80;
		}
		return view.pointsPerGame.innerHTML*multiplier - view.losePointsPerGame.innerHTML - Math.floor(view.elapsedTimePerGame.innerHTML / 10);		
	},	
	// add 1 win points
	add1WinPoints:function(){
		return +view.pointsPerGame.innerHTML + 1;
	},	
	// add 1 lose points
	add1LosePoints:function(){
		return +view.losePointsPerGame.innerHTML + 1
	},
	// check for the number of cards disabled
	getNumberDisabledCards: function(){
		// present number of cards
		var disabledCards = document.getElementsByClassName('containerForCards__cards_disabled'),
			numberDisabledCards = disabledCards.length;
			return numberDisabledCards;
	},	
	ifGameOverStopTimer: function(){
		if(+this.maxNumber == +this.getNumberDisabledCards){
			clearInterval(this.timer);
		}
	},
}
window.onload = function(){
	runGame = {
		init: function(){
			this.main();
			this.event();
		},
		main: function(){
			// set game style
			view.setGameStyle(controller.selectStyle.value);
			// construct a field with cards when the page loads
			controller.buildCardGame(controller.select.value);
			// load info from localStorage
			view.loadLocalStarageInfoToATable();
			// Add a container class to start the timer on the first click
			view.addStartTimerClassInConteiner();
		},
		event: function(){
			// if select change run buildCardGame
			controller.select.addEventListener('change', function(){
				controller.buildCardGameWhenClick(+controller.select.value);	
			});
			// if click btn restart run buildCardGame
			controller.containerWithInformationsBtnRestart.addEventListener('click', function(){
				controller.buildCardGameWhenClick(+controller.select.value);	
			});
			// if selectStyle change run setGameStyle
			controller.selectStyle.addEventListener('change', function(){
				view.setGameStyle(+controller.selectStyle.value);
			});

			view.containerForCards.addEventListener('click', controller.startTimer);
			view.containerForCards.addEventListener('click', model.ifGameOverStopTimer);
			// Allows you to open the following cards
			view.containerForCards.addEventListener('click', function(event){
				var containerTarget = event.target;
				controller.allowsYouToOpenTheFollowingCards(containerTarget);
			});
			// pause and resume
			controller.containerWithInformationsBtnPauseAndRemove.addEventListener('click', controller.clickPauseOrResume);
		}
	}
	runGame.init();
}
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