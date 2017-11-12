window.onload = function(){
	// get a select with number elements
	var select = document.getElementsByClassName('cardGameSize')[0],
	// get a container for the game
		containerForCards = document.getElementsByClassName('containerForCards')[0],
		// take mux number iteration
		maxNumber;


		// construct a field with cards when the page loads
		buildCardGame(6),

	
	// if select change run buildCardGame
	select.addEventListener('change', function(){
		var selectValue = +select.value;
		buildCardGame(selectValue);
	});
	// create and add elem to card game
	function appendDiv(number, divNumber){
		// create card elem
		var div = document.createElement('div');
		// add class for style css
		div.className = 'containerForCards__cards containerForCards__cards_inGame containerForCards__cards_number' + number;
		// add attributes to compare items
		div.setAttribute('data-elem-number', divNumber);
		// add elem to card container
		div.innerHTML = divNumber;
		containerForCards.appendChild(div);
	}
	// build card game
	function buildCardGame(number){
		// take mux number iteration
		maxNumber = number*number,
		// take half from nax number
			halfMaxNumber = maxNumber/2;
		// clear card game container
		containerForCards.innerHTML = '';
		// create array for number cards
		var divNumberArray = [];
		// add all number cards into array
		for(var z = 1; z<=(maxNumber);z++ ){
			divNumberArray[z - 1] = z;
		}
		//  construct a field with cards
		for(var i = 1; i<=(maxNumber);i++){
			// we obtain the index of the random element of the array
			var rand = Math.floor(Math.random() * divNumberArray.length),
			// get elem number
			divNumber = divNumberArray[rand];
			// make the numbers duplicated
			if(divNumber>halfMaxNumber){
				divNumber = divNumber-halfMaxNumber;
			}
			// run function for create and add elem to card game
			appendDiv(number, divNumber);
			// remove the element of the array that it was taken again
			divNumberArray.splice(rand, 1);
		}			
	}

	

	// mark the selected cards
	function CardAddClassSelected(elem){
		elem.classList.add('containerForCards__cards_selected');
	}
	// if 2 cards are selected to remove the class select

	// и после проверить есть ли смысл продолжать игру

	function ifSelectedCards2RemoveClassSelected(selectedCard){
		viewingPermission = false;

		setTimeout(function() {
			for(var i=1;i>=0;i--){
				selectedCard[i].classList.remove('containerForCards__cards_selected');
			}
			viewingPermission = true;

			if(+maxNumber == +getNumberDisabledCards()){
				countResultPerGame();


























				
			} 

		}, 700);
	}


	// if Identical Selected Cards add class selected disabled


	// and add 1 points

	var pointsPerGame = document.getElementsByClassName('pointsForGames_text')[0];

	// or add 1 lose point
	var losePointsPerGame = document.getElementsByClassName('pointsForGames_text')[1];

	var winPointsPerGame = document.getElementsByClassName('pointsForGames_text')[2];

	// count the result per game

	function countResultPerGame(){
		winPointsPerGame.innerHTML = pointsPerGame.innerHTML*10 - losePointsPerGame.innerHTML;
	}

	function ifIdenticalSelectedCards(){
		var selectedCard = document.getElementsByClassName('containerForCards__cards_selected');
		if(selectedCard.length == 2){
			if(selectedCard[0].getAttribute('data-elem-number') == selectedCard[1].getAttribute('data-elem-number')){
				for(var i=1;i>=0;i--){
					selectedCard[i].classList.add('containerForCards__cards_disabled');
				}
				// add points
				pointsPerGame.innerHTML = +pointsPerGame.innerHTML + 1;
				ifSelectedCards2RemoveClassSelected(selectedCard);
			} else{
				ifSelectedCards2RemoveClassSelected(selectedCard);
				losePointsPerGame.innerHTML = +losePointsPerGame.innerHTML + 1;
			}
		}
	}

	// check for the number of cards disabled
	function getNumberDisabledCards(){
		// присутсвуюзее количесво карт
		var disabledCards = document.getElementsByClassName('containerForCards__cards_disabled'),
			numberDisabledCards = disabledCards.length;
			return numberDisabledCards;
	}


	// разрешение на следующий перреворот карты
	var viewingPermission = true;

	containerForCards.addEventListener('click',function(event){
		var containerTarget = event.target;

		// containerTarget.style.opacity=0;
		if(viewingPermission){
			if(containerTarget.classList.contains('containerForCards__cards')){
				if(containerTarget.classList.contains('containerForCards__cards_inGame')){
					CardAddClassSelected(containerTarget)
				}
			}
			ifIdenticalSelectedCards();
		}

		
	});

	

}


