window.onload = function(){
	// get a select with number elements
	var select = document.getElementsByClassName('cardGameSize')[0],
	// get a container for the game
		containerForCards = document.getElementsByClassName('containerForCards')[0];
		// construct a field with cards when the page loads
		buildCardGame(6);
	
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
		var maxNumber = number*number,
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

	


	function CardAddClassSelected(elem){
		elem.classList.add('containerForCards__cards_selected');
	}

	function ifSelectedCards2RemoveClassSelected(selectedCard){
		viewingPermission = false;

		setTimeout(function() {
			for(var i=1;i>=0;i--){
				selectedCard[i].classList.remove('containerForCards__cards_selected');
			}
			viewingPermission = true;
		}, 700);
	}

	function ifIdenticalSelectedCards(){
		var selectedCard = document.getElementsByClassName('containerForCards__cards_selected');
		if(selectedCard.length == 2){
			if(selectedCard[0].getAttribute('data-elem-number') == selectedCard[1].getAttribute('data-elem-number')){
				for(var i=1;i>=0;i--){
					selectedCard[i].classList.add('containerForCards__cards_disabled');
				}
				ifSelectedCards2RemoveClassSelected(selectedCard);
			} else{
				ifSelectedCards2RemoveClassSelected(selectedCard);
			}
		}
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


