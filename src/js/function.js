window.onload = function(){
	// get a select with number elements
	var select = document.getElementsByClassName('containerWithInformations__cardGameSize')[0],
	// get a container for the game
		containerForCards = document.getElementsByClassName('containerForCards')[0],
		// take mux number iteration
		maxNumber,
		// get a select with style
		selectStyle = document.getElementsByClassName('containerWithInformations__cardGameStyle')[0];

	// if Identical Selected Cards add class selected disabled
	// and add 1 points

	var pointsPerGame = document.getElementsByClassName('pointsForGames__text')[0].getElementsByTagName('span')[0];
	// or add 1 lose point
	var losePointsPerGame = document.getElementsByClassName('pointsForGames__text')[1].getElementsByTagName('span')[0];
	// очки за одну партию 
	var winPointsPerGame = document.getElementsByClassName('pointsForGames__text')[2].getElementsByTagName('span')[0];
	// таймер 
	var elapsedTimePerGame = document.getElementsByClassName('pointsForGames__text')[3].getElementsByTagName('span')[0];

	// переменная для времени
	var timerCount = 1;
	// переменная для таймера
	var timer;
	// пауза и продолжить
	var containerWithInformationsBtnPauseAndRemove = document.getElementsByClassName('containerWithInformations__btn')[0];
	// рестарт
	var containerWithInformationsBtnRestart = document.getElementsByClassName('containerWithInformations__btn')[1];

	// таблица
	// 6
	var pointsForGames6LosePointsPerGame = document.getElementsByClassName('pointsForGames_6')[0].getElementsByTagName('span')[0];
	var pointsForGames6WinPointsPerGame = document.getElementsByClassName('pointsForGames_6')[0].getElementsByTagName('span')[1];
	var pointsForGames6ElapsedTimePerGame = document.getElementsByClassName('pointsForGames_6')[0].getElementsByTagName('span')[2];
	// 8
	var pointsForGames8LosePointsPerGame = document.getElementsByClassName('pointsForGames_8')[0].getElementsByTagName('span')[0];
	var pointsForGames8WinPointsPerGame = document.getElementsByClassName('pointsForGames_8')[0].getElementsByTagName('span')[1];
	var pointsForGames8ElapsedTimePerGame = document.getElementsByClassName('pointsForGames_8')[0].getElementsByTagName('span')[2];
	// 10
	var pointsForGames10LosePointsPerGame = document.getElementsByClassName('pointsForGames_10')[0].getElementsByTagName('span')[0];
	var pointsForGames10WinPointsPerGame = document.getElementsByClassName('pointsForGames_10')[0].getElementsByTagName('span')[1];
	var pointsForGames10ElapsedTimePerGame = document.getElementsByClassName('pointsForGames_10')[0].getElementsByTagName('span')[2];
	// 12
	var pointsForGames12LosePointsPerGame = document.getElementsByClassName('pointsForGames_12')[0].getElementsByTagName('span')[0];
	var pointsForGames12WinPointsPerGame = document.getElementsByClassName('pointsForGames_12')[0].getElementsByTagName('span')[1];
	var pointsForGames12ElapsedTimePerGame = document.getElementsByClassName('pointsForGames_12')[0].getElementsByTagName('span')[2];

	// set game style
	setGameStyle(selectStyle.value);
	// construct a field with cards when the page loads
	buildCardGame(select.value);
	// load info from localStorage
	loadLocalStarageInfoToATable();

	// if select change run buildCardGame
	select.addEventListener('change', function(){
		var selectValue = +select.value;
		buildCardGameWhenClick(selectValue);	
	});

	// if selectStyle change run setGameStyle
	selectStyle.addEventListener('change', function(){
		var selectStyleValue = +selectStyle.value;
		setGameStyle(selectStyleValue);
	});

	// if select change run buildCardGame
	containerWithInformationsBtnRestart.addEventListener('click', function(){
		var selectValue = +select.value;
		buildCardGameWhenClick(selectValue);	
	});

	function buildCardGameWhenClick(selectValue){
		buildCardGame(selectValue);
		// добавляет клас для запуска таймера
		if (!containerForCards.classList.contains('startTimer')) {
			containerForCards.classList.add('startTimer');
		}
		// отключает блокировку поля с картами
		if (containerForCards.classList.contains('containerForCards_disabled')) {
			containerForCards.classList.remove('containerForCards_disabled');
		}
		// обнуляем таймер и время
		clearInterval(timer);
		timerCount = 1;
		// обнуляет очки в таблице
		pointsPerGame.innerHTML = 0;
		losePointsPerGame.innerHTML = 0;
		winPointsPerGame.innerHTML = 0;
		elapsedTimePerGame.innerHTML = 0;
		// ставит кнопку на значение пауза
		if(containerWithInformationsBtnPauseAndRemove.classList.contains('containerWithInformations__btn_resume')){
		// изменяет внешний вид кнопки
			containerWithInformationsBtnPauseAndRemove.classList.add('containerWithInformations__btn_pause');
			containerWithInformationsBtnPauseAndRemove.classList.remove('containerWithInformations__btn_resume');
			containerWithInformationsBtnPauseAndRemove.innerHTML = 'пауза';
		}
	}

	// create and add elem to card game
	function appendDiv(number, divNumber){
		// create card elem
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
		// if size 6*6
		if(select.value == 6){
			var numberWidth = divNumber % 6;
			var numberHeight;
			if(divNumber <= 6){
				numberHeight = 0;
			} else if(divNumber > 6 && divNumber <= 12){
				numberHeight = 1;
			} else {
				numberHeight = 2;
			}
			
		}
		// if size 8*8
		if(select.value == 8){
			var numberWidth = divNumber % 8;
			var numberHeight;
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
		if(select.value == 10){
			var numberWidth = divNumber % 10;
			var numberHeight;
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
		if(select.value == 12){
			var numberWidth = divNumber % 12;
			var numberHeight;

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
		// add elem to card container
		containerForCards.appendChild(div);
	}


	// set game style function
	function setGameStyle(style){
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
	}


	// build card game
	function buildCardGame(number){
		deleteWinMessageIfPresent();
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
		// показать все карты и через 3 секунды скрыть их
		showAllImg(maxNumber); 
	}

	function showAllImg(maxNumber){
		containerForCards.classList.add('containerForCards__disabled');
		var cards = document.getElementsByClassName('containerForCards__cards');
		for(var i = 1; i<=(maxNumber);i++){
			CardAddClassSelected(cards[i - 1]);
		}
		setTimeout(function(){
			for(var i = 1; i<=(maxNumber);i++){
				CardRemoveClassSelected(cards[i - 1])
			}
		containerForCards.classList.remove('containerForCards__disabled');
		},3000);
	}

	

	// mark the selected cards
	function CardAddClassSelected(elem){
		elem.classList.add('containerForCards__cards_selected');
	}
	// remove mark the selected cards
	function CardRemoveClassSelected(elem){
		elem.classList.remove('containerForCards__cards_selected');
	}
	// if 2 cards are selected to remove the class select

	// и после проверить есть ли смысл продолжать игру

	function ifSelectedCards2RemoveClassSelected(selectedCard){
		viewingPermission = false;

		setTimeout(function() {
			for(var i=1;i>=0;i--){
				CardRemoveClassSelected(selectedCard[i]);
			}
			viewingPermission = true;

			if(+maxNumber == +getNumberDisabledCards()){
				countResultPerGame();
				transferTheResultToATable();
				showWinMessage();			
			} 

		}, 700);
	}




	// count the result per game

	function countResultPerGame(){
		if(+select.value == 6){
			winPointsPerGame.innerHTML = pointsPerGame.innerHTML*10 - losePointsPerGame.innerHTML - Math.floor(elapsedTimePerGame.innerHTML / 10);
		}
		if(+select.value == 8){
			winPointsPerGame.innerHTML = pointsPerGame.innerHTML*20 - losePointsPerGame.innerHTML - Math.floor(elapsedTimePerGame.innerHTML / 10);
		}
		if(+select.value == 10){
			winPointsPerGame.innerHTML = pointsPerGame.innerHTML*40 - losePointsPerGame.innerHTML - Math.floor(elapsedTimePerGame.innerHTML / 10);
		}
		if(+select.value == 12){
			winPointsPerGame.innerHTML = pointsPerGame.innerHTML*80 - losePointsPerGame.innerHTML - Math.floor(elapsedTimePerGame.innerHTML / 10);
		}
	}

	// переносит результат в таблицу 


	function transferTheResultToATable(){
		if(+select.value == 6){
			if(pointsForGames6WinPointsPerGame.innerHTML < winPointsPerGame.innerHTML){
				pointsForGames6LosePointsPerGame.innerHTML = losePointsPerGame.innerHTML;
				pointsForGames6WinPointsPerGame.innerHTML = winPointsPerGame.innerHTML;
				pointsForGames6ElapsedTimePerGame.innerHTML = elapsedTimePerGame.innerHTML;
				localStorage["pointsForGames6LosePointsPerGame"] = losePointsPerGame.innerHTML;
				localStorage["pointsForGames6WinPointsPerGame"] = winPointsPerGame.innerHTML;
				localStorage["pointsForGames6ElapsedTimePerGame"] = elapsedTimePerGame.innerHTML;
			}
		}
		if(+select.value == 8){
			if(pointsForGames8WinPointsPerGame.innerHTML < winPointsPerGame.innerHTML){
				pointsForGames8LosePointsPerGame.innerHTML = losePointsPerGame.innerHTML;
				pointsForGames8WinPointsPerGame.innerHTML = winPointsPerGame.innerHTML;
				pointsForGames8ElapsedTimePerGame.innerHTML = elapsedTimePerGame.innerHTML;
				localStorage["pointsForGames8LosePointsPerGame"] = losePointsPerGame.innerHTML;
				localStorage["pointsForGames8WinPointsPerGame"] = winPointsPerGame.innerHTML;
				localStorage["pointsForGames8ElapsedTimePerGame"] = elapsedTimePerGame.innerHTML;
			}

		}
		if(+select.value == 10){
			if(pointsForGames10WinPointsPerGame.innerHTML < winPointsPerGame.innerHTML){
				pointsForGames10LosePointsPerGame.innerHTML = losePointsPerGame.innerHTML;
				pointsForGames10WinPointsPerGame.innerHTML = winPointsPerGame.innerHTML;
				pointsForGames10ElapsedTimePerGame.innerHTML = elapsedTimePerGame.innerHTML;
				localStorage["pointsForGames10LosePointsPerGame"] = losePointsPerGame.innerHTML;
				localStorage["pointsForGames10WinPointsPerGame"] = winPointsPerGame.innerHTML;
				localStorage["pointsForGames10ElapsedTimePerGame"] = elapsedTimePerGame.innerHTML;
			}

		}
		if(+select.value == 12){
			if(pointsForGames12WinPointsPerGame.innerHTML < winPointsPerGame.innerHTML){
				pointsForGames12LosePointsPerGame.innerHTML = losePointsPerGame.innerHTML;
				pointsForGames12WinPointsPerGame.innerHTML = winPointsPerGame.innerHTML;
				pointsForGames12ElapsedTimePerGame.innerHTML = elapsedTimePerGame.innerHTML;
				localStorage["pointsForGames12LosePointsPerGame"] = losePointsPerGame.innerHTML;
				localStorage["pointsForGames12WinPointsPerGame"] = winPointsPerGame.innerHTML;
				localStorage["pointsForGames12ElapsedTimePerGame"] = elapsedTimePerGame.innerHTML;
			}
		}

	}
	// создает сообщение о победе
	function showWinMessage(){
		var winMessage = document.createElement('div');
		winMessage.classList.add('containerForCards__winMessage');
		winMessage.innerHTML = '<p class="containerForCards__pWinMessage">Вы успешно открыли все карточки!</p>';
		containerForCards.appendChild(winMessage);
	}
	// удаляет сообщение о победе
	function deleteWinMessageIfPresent(){
		var winMessage = containerForCards.getElementsByClassName('containerForCards__winMessage')
		if(winMessage.length > 0){
			winMessage[0].parentNode.removeChild(winMessage[0]);
		}
	}
	// если выбранные карты совпадают то удаляет их и добавляет очки 
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






// интервал и все что с ним связано
	// добавим контейнеру класс для старта таймера при первом нажатии
	containerForCards.classList.add('startTimer');

	function startTimer(){
		if(containerForCards.classList.contains('startTimer')){
			containerForCards.classList.remove('startTimer');
			timer = setInterval(function(){
				elapsedTimePerGame.innerHTML = timerCount++;
			},1000);
		}
	}

	function ifGameOverStopTimer(){
		if(+maxNumber == +getNumberDisabledCards()){
			clearInterval(timer);
		}
	}
	// активация функций
	containerForCards.addEventListener('click', startTimer);
	containerForCards.addEventListener('click', ifGameOverStopTimer);

	// изменения кнопки
	
	containerWithInformationsBtnPauseAndRemove.addEventListener('click',function(){
		if(!containerForCards.classList.contains('startTimer')){
			// изменяет внешний вид кнопки
			if(containerWithInformationsBtnPauseAndRemove.classList.contains('containerWithInformations__btn_pause')){
				containerWithInformationsBtnPauseAndRemove.classList.add('containerWithInformations__btn_resume');
				containerWithInformationsBtnPauseAndRemove.classList.remove('containerWithInformations__btn_pause');
				containerWithInformationsBtnPauseAndRemove.innerHTML = 'возобновить';
				// останавливает таймер
				clearInterval(timer);
				// запрещает нажимать по полю
				containerForCards.classList.add('containerForCards_disabled');
			} else if(containerWithInformationsBtnPauseAndRemove.classList.contains('containerWithInformations__btn_resume')){
			// изменяет внешний вид кнопки
				containerWithInformationsBtnPauseAndRemove.classList.add('containerWithInformations__btn_pause');
				containerWithInformationsBtnPauseAndRemove.classList.remove('containerWithInformations__btn_resume');
				containerWithInformationsBtnPauseAndRemove.innerHTML = 'пауза';
				// запускает таймер
				timer = setInterval(function(){
					elapsedTimePerGame.innerHTML = timerCount++;
				},1000);
				// отключает блокировку поля с картами
				if (containerForCards.classList.contains('containerForCards_disabled')) {
					containerForCards.classList.remove('containerForCards_disabled');
				}
			}
		}
	});

	function loadLocalStarageInfoToATable(){
		// 6
		if (localStorage["pointsForGames6WinPointsPerGame"] != undefined){
			pointsForGames6LosePointsPerGame.innerHTML = localStorage["pointsForGames6LosePointsPerGame"];
			pointsForGames6WinPointsPerGame.innerHTML = localStorage["pointsForGames6WinPointsPerGame"];
			pointsForGames6ElapsedTimePerGame.innerHTML = localStorage["pointsForGames6ElapsedTimePerGame"];
		}
			// 8
		if (localStorage["pointsForGames8WinPointsPerGame"] != undefined){
			pointsForGames8LosePointsPerGame.innerHTML = localStorage["pointsForGames8LosePointsPerGame"];
			pointsForGames8WinPointsPerGame.innerHTML = localStorage["pointsForGames8WinPointsPerGame"];
			pointsForGames8ElapsedTimePerGame.innerHTML = localStorage["pointsForGames8ElapsedTimePerGame"];
		}
			// 10
		if (localStorage["pointsForGames10WinPointsPerGame"] != undefined){
			pointsForGames10LosePointsPerGame.innerHTML = localStorage["pointsForGames10LosePointsPerGame"];
			pointsForGames10WinPointsPerGame.innerHTML = localStorage["pointsForGames10WinPointsPerGame"];
			pointsForGames10ElapsedTimePerGame.innerHTML = localStorage["pointsForGames10ElapsedTimePerGame"];
		}
			// 12
		if (localStorage["pointsForGames12WinPointsPerGame"] != undefined){
			pointsForGames12LosePointsPerGame.innerHTML = localStorage["pointsForGames12LosePointsPerGame"];
			pointsForGames12WinPointsPerGame.innerHTML = localStorage["pointsForGames12WinPointsPerGame"];
			pointsForGames12ElapsedTimePerGame.innerHTML = localStorage["pointsForGames12ElapsedTimePerGame"];
		}
	}

	

}


