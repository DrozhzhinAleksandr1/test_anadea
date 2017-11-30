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