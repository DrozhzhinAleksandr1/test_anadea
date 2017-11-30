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