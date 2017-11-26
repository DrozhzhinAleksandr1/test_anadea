var view = {
	// get a container for the game
	containerForCards: document.getElementsByClassName('containerForCards')[0],
	// результаты данной игры
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

	buildCardGame: function(number){
		view.deleteWinMessageIfPresent();
		// take mux number iteration
		model.maxNumber = number*number,
		// take half from nax number
		halfMaxNumber = model.maxNumber/2;
		// clear card game container
		view.containerForCards.innerHTML = '';
		// create array for number cards
		var divNumberArray = [];
		// add all number cards into array
		for(var z = 1; z<=(model.maxNumber);z++ ){
			divNumberArray[z - 1] = z;
		}
		//  construct a field with cards
		for(var i = 1; i<=(model.maxNumber);i++){
			// we obtain the index of the random element of the array
			var rand = Math.floor(Math.random() * divNumberArray.length),
			// get elem number
			divNumber = divNumberArray[rand];
			// make the numbers duplicated
			if(divNumber>halfMaxNumber){
				divNumber = divNumber-halfMaxNumber;
			}
			// run function for create and add elem to card game
			view.appendDiv(number, divNumber);
			// remove the element of the array that it was taken again
			divNumberArray.splice(rand, 1);
		}
		// показать все карты и через 3 секунды скрыть их
		view.showAllImg(model.maxNumber); 
	},

	// create and add elem to card game
	appendDiv: function(number, divNumber){
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
		if(controller.select.value == 6){
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
		if(controller.select.value == 8){
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
		if(controller.select.value == 10){
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
		if(controller.select.value == 12){
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
		view.containerForCards.appendChild(div);
	},

	// mark the selected cards
	cardAddClassSelected: function(elem){
		elem.classList.add('containerForCards__cards_selected');
	},
	// remove mark the selected cards
	cardRemoveClassSelected: function(elem){
		elem.classList.remove('containerForCards__cards_selected');
	},

	showAllImg: function(maxNumber){
		view.containerForCards.classList.add('containerForCards__disabled');
		var cards = document.getElementsByClassName('containerForCards__cards');
		for(var i = 1; i<=(model.maxNumber);i++){
			view.cardAddClassSelected(cards[i - 1]);
		}
		setTimeout(function(){
			for(var i = 1; i<=(model.maxNumber);i++){
				view.cardRemoveClassSelected(cards[i - 1])
			}
		view.containerForCards.classList.remove('containerForCards__disabled');
		},3000);
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
	// создает сообщение о победе
	showWinMessage: function(){
		var winMessage = document.createElement('div');
		winMessage.classList.add('containerForCards__winMessage');
		winMessage.innerHTML = '<p class="containerForCards__pWinMessage">Вы успешно открыли все карточки!</p>';
		view.containerForCards.appendChild(winMessage);
	},	
	// удаляет сообщение о победе
	deleteWinMessageIfPresent: function(){
		var winMessage = view.containerForCards.getElementsByClassName('containerForCards__winMessage')
		if(winMessage.length > 0){
			winMessage[0].parentNode.removeChild(winMessage[0]);
		}
	},

	loadLocalStarageInfoToATable: function(){
		// 6
		if (localStorage["pointsForGames6WinPointsPerGame"] != undefined){
			view.pointsForGames6LosePointsPerGame.innerHTML = localStorage["pointsForGames6LosePointsPerGame"];
			view.pointsForGames6WinPointsPerGame.innerHTML = localStorage["pointsForGames6WinPointsPerGame"];
			view.pointsForGames6ElapsedTimePerGame.innerHTML = localStorage["pointsForGames6ElapsedTimePerGame"];
		}
			// 8
		if (localStorage["pointsForGames8WinPointsPerGame"] != undefined){
			view.pointsForGames8LosePointsPerGame.innerHTML = localStorage["pointsForGames8LosePointsPerGame"];
			view.pointsForGames8WinPointsPerGame.innerHTML = localStorage["pointsForGames8WinPointsPerGame"];
			view.pointsForGames8ElapsedTimePerGame.innerHTML = localStorage["pointsForGames8ElapsedTimePerGame"];
		}
			// 10
		if (localStorage["pointsForGames10WinPointsPerGame"] != undefined){
			view.pointsForGames10LosePointsPerGame.innerHTML = localStorage["pointsForGames10LosePointsPerGame"];
			view.pointsForGames10WinPointsPerGame.innerHTML = localStorage["pointsForGames10WinPointsPerGame"];
			view.pointsForGames10ElapsedTimePerGame.innerHTML = localStorage["pointsForGames10ElapsedTimePerGame"];
		}
			// 12
		if (localStorage["pointsForGames12WinPointsPerGame"] != undefined){
			view.pointsForGames12LosePointsPerGame.innerHTML = localStorage["pointsForGames12LosePointsPerGame"];
			view.pointsForGames12WinPointsPerGame.innerHTML = localStorage["pointsForGames12WinPointsPerGame"];
			view.pointsForGames12ElapsedTimePerGame.innerHTML = localStorage["pointsForGames12ElapsedTimePerGame"];
		}
	},

	// переносит результат в таблицу 
	transferTheResultToATable: function(){
		if(+controller.select.value == 6){
			if(view.pointsForGames6WinPointsPerGame.innerHTML < view.winPointsPerGame.innerHTML){
				view.pointsForGames6LosePointsPerGame.innerHTML = view.losePointsPerGame.innerHTML;
				view.pointsForGames6WinPointsPerGame.innerHTML = view.winPointsPerGame.innerHTML;
				view.pointsForGames6ElapsedTimePerGame.innerHTML = view.elapsedTimePerGame.innerHTML;

				localStorage["pointsForGames6LosePointsPerGame"] = view.losePointsPerGame.innerHTML;
				localStorage["pointsForGames6WinPointsPerGame"] = view.winPointsPerGame.innerHTML;
				localStorage["pointsForGames6ElapsedTimePerGame"] = view.elapsedTimePerGame.innerHTML;
			}
		}
		if(+controller.select.value == 8){
			if(view.pointsForGames8WinPointsPerGame.innerHTML < view.winPointsPerGame.innerHTML){
				pointsForGames8LosePointsPerGame.innerHTML = view.losePointsPerGame.innerHTML;
				pointsForGames8WinPointsPerGame.innerHTML = view.winPointsPerGame.innerHTML;
				pointsForGames8ElapsedTimePerGame.innerHTML = view.elapsedTimePerGame.innerHTML;

				localStorage["pointsForGames8LosePointsPerGame"] = view.losePointsPerGame.innerHTML;
				localStorage["pointsForGames8WinPointsPerGame"] = view.winPointsPerGame.innerHTML;
				localStorage["pointsForGames8ElapsedTimePerGame"] = view.elapsedTimePerGame.innerHTML;
			}

		}
		if(+controller.select.value == 10){
			if(view.pointsForGames10WinPointsPerGame.innerHTML < view.winPointsPerGame.innerHTML){
				view.pointsForGames10LosePointsPerGame.innerHTML = view.losePointsPerGame.innerHTML;
				view.pointsForGames10WinPointsPerGame.innerHTML = view.winPointsPerGame.innerHTML;
				view.pointsForGames10ElapsedTimePerGame.innerHTML = view.elapsedTimePerGame.innerHTML;

				localStorage["pointsForGames10LosePointsPerGame"] = view.losePointsPerGame.innerHTML;
				localStorage["pointsForGames10WinPointsPerGame"] = view.winPointsPerGame.innerHTML;
				localStorage["pointsForGames10ElapsedTimePerGame"] = view.elapsedTimePerGame.innerHTML;
			}

		}
		if(+controller.select.value == 12){
			if(view.pointsForGames12WinPointsPerGame.innerHTML < view.winPointsPerGame.innerHTML){
				view.pointsForGames12LosePointsPerGame.innerHTML = view.losePointsPerGame.innerHTML;
				view.pointsForGames12WinPointsPerGame.innerHTML = view.winPointsPerGame.innerHTML;
				view.pointsForGames12ElapsedTimePerGame.innerHTML = view.elapsedTimePerGame.innerHTML;

				localStorage["pointsForGames12LosePointsPerGame"] = view.losePointsPerGame.innerHTML;
				localStorage["pointsForGames12WinPointsPerGame"] = view.winPointsPerGame.innerHTML;
				localStorage["pointsForGames12ElapsedTimePerGame"] = view.elapsedTimePerGame.innerHTML;
			}
		}

	}

}






var model = {
	// take mux number iteration
	maxNumber: '',
	// переменная для времени
	timerCount: 1,
	// переменная для таймера
	timer:'',
	// разрешение на следующий перреворот карты
	viewingPermission: true,

}








var controller = {
	// get a select with number elements
	select: document.getElementsByClassName('containerWithInformations__cardGameSize')[0],
	// get a select with style
	selectStyle: document.getElementsByClassName('containerWithInformations__cardGameStyle')[0],
	// пауза и продолжить
	containerWithInformationsBtnPauseAndRemove: document.getElementsByClassName('containerWithInformations__btn')[0],
	// рестарт
	containerWithInformationsBtnRestart: document.getElementsByClassName('containerWithInformations__btn')[1],
}




window.onload = function(){
	// set game style
	view.setGameStyle(controller.selectStyle.value);
	// construct a field with cards when the page loads
	view.buildCardGame(controller.select.value);
	// load info from localStorage
	view.loadLocalStarageInfoToATable();
	// добавим контейнеру класс для старта таймера при первом нажатии
	view.containerForCards.classList.add('startTimer');
}




function buildCardGameWhenClick(selectValue){

	view.buildCardGame(selectValue);
	// добавляет клас для запуска таймера
	if (!view.containerForCards.classList.contains('startTimer')) {
		view.containerForCards.classList.add('startTimer');
	}
	// отключает блокировку поля с картами
	if (view.containerForCards.classList.contains('containerForCards_disabled')) {
		view.containerForCards.classList.remove('containerForCards_disabled');
	}
	// обнуляем таймер и время
	clearInterval(model.timer);
	model.timerCount = 1;
	// обнуляет очки в таблице
	view.pointsPerGame.innerHTML = 0;
	view.losePointsPerGame.innerHTML = 0;
	view.winPointsPerGame.innerHTML = 0;
	view.elapsedTimePerGame.innerHTML = 0;
	// ставит кнопку на значение пауза
	if(controller.containerWithInformationsBtnPauseAndRemove.classList.contains('containerWithInformations__btn_resume')){
	// изменяет внешний вид кнопки
		controller.containerWithInformationsBtnPauseAndRemove.classList.add('containerWithInformations__btn_pause');
		controller.containerWithInformationsBtnPauseAndRemove.classList.remove('containerWithInformations__btn_resume');
		controller.containerWithInformationsBtnPauseAndRemove.innerHTML = 'пауза';
	}
}






// if 2 cards are selected to remove the class select

// и после проверить есть ли смысл продолжать игру

function ifSelectedCards2RemoveClassSelected(selectedCard){
	model.viewingPermission = false;

	setTimeout(function() {
		for(var i=1;i>=0;i--){
			view.cardRemoveClassSelected(selectedCard[i]);
		}
		model.viewingPermission = true;

		if(+model.maxNumber == +getNumberDisabledCards()){
			countResultPerGame();
			view.transferTheResultToATable();
			view.showWinMessage();			
		} 

	}, 700);
}




// count the result per game

function countResultPerGame(){
	// добавить функцию от обьекта отображения
	// добавить функцию от обьекта отображения
	// добавить функцию от обьекта отображения
	// добавить функцию от обьекта отображения
	if(+controller.select.value == 6){
		view.winPointsPerGame.innerHTML = view.pointsPerGame.innerHTML*10 - view.losePointsPerGame.innerHTML - Math.floor(view.elapsedTimePerGame.innerHTML / 10);
	}
	if(+controller.select.value == 8){
		view.winPointsPerGame.innerHTML = view.pointsPerGame.innerHTML*20 - view.losePointsPerGame.innerHTML - Math.floor(view.elapsedTimePerGame.innerHTML / 10);
	}
	if(+controller.select.value == 10){
		view.winPointsPerGame.innerHTML = view.pointsPerGame.innerHTML*40 - view.losePointsPerGame.innerHTML - Math.floor(view.elapsedTimePerGame.innerHTML / 10);
	}
	if(+controller.select.value == 12){
		view.winPointsPerGame.innerHTML = view.pointsPerGame.innerHTML*80 - view.losePointsPerGame.innerHTML - Math.floor(view.elapsedTimePerGame.innerHTML / 10);
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
			view.pointsPerGame.innerHTML = +view.pointsPerGame.innerHTML + 1;
			ifSelectedCards2RemoveClassSelected(selectedCard);
		} else{
			ifSelectedCards2RemoveClassSelected(selectedCard);
			view.losePointsPerGame.innerHTML = +view.losePointsPerGame.innerHTML + 1;
		}
	}
}

// check for the number of cards disabled
function getNumberDisabledCards(){
	// присутсвующее количесво карт
	var disabledCards = document.getElementsByClassName('containerForCards__cards_disabled'),
		numberDisabledCards = disabledCards.length;
		return numberDisabledCards;
}



// интервал и все что с ним связано


function startTimer(){
	if(view.containerForCards.classList.contains('startTimer')){
		view.containerForCards.classList.remove('startTimer');
		model.timer = setInterval(function(){
			view.elapsedTimePerGame.innerHTML = model.timerCount++;
		},1000);
	}
}

function ifGameOverStopTimer(){
	if(+model.maxNumber == +getNumberDisabledCards()){
		clearInterval(model.timer);
	}
}




// if select change run buildCardGame
controller.select.addEventListener('change', function(){
	var selectValue = +controller.select.value;
	buildCardGameWhenClick(selectValue);	
});

// if selectStyle change run setGameStyle
controller.selectStyle.addEventListener('change', function(){
	var selectStyleValue = +controller.selectStyle.value;
	view.setGameStyle(selectStyleValue);
});

// if select change run buildCardGame
controller.containerWithInformationsBtnRestart.addEventListener('click', function(){
	var selectValue = +controller.select.value;
	buildCardGameWhenClick(selectValue);	
});



view.containerForCards.addEventListener('click',function(event){
	var containerTarget = event.target;

	// containerTarget.style.opacity=0;
	if(model.viewingPermission){
		if(containerTarget.classList.contains('containerForCards__cards')){
			if(containerTarget.classList.contains('containerForCards__cards_inGame')){
				view.cardAddClassSelected(containerTarget)
			}
		}
		ifIdenticalSelectedCards();
	}

});


// активация функций
view.containerForCards.addEventListener('click', startTimer);
view.containerForCards.addEventListener('click', ifGameOverStopTimer);

// изменения кнопки

controller.containerWithInformationsBtnPauseAndRemove.addEventListener('click',function(){
	if(!view.containerForCards.classList.contains('startTimer')){
		// изменяет внешний вид кнопки
		if(controller.containerWithInformationsBtnPauseAndRemove.classList.contains('containerWithInformations__btn_pause')){
			controller.containerWithInformationsBtnPauseAndRemove.classList.add('containerWithInformations__btn_resume');
			controller.containerWithInformationsBtnPauseAndRemove.classList.remove('containerWithInformations__btn_pause');
			controller.containerWithInformationsBtnPauseAndRemove.innerHTML = 'возобновить';
			// останавливает таймер
			clearInterval(model.timer);
			// запрещает нажимать по полю
			view.containerForCards.classList.add('containerForCards_disabled');
		} else if(controller.containerWithInformationsBtnPauseAndRemove.classList.contains('containerWithInformations__btn_resume')){
		// изменяет внешний вид кнопки
			controller.containerWithInformationsBtnPauseAndRemove.classList.add('containerWithInformations__btn_pause');
			controller.containerWithInformationsBtnPauseAndRemove.classList.remove('containerWithInformations__btn_resume');
			controller.containerWithInformationsBtnPauseAndRemove.innerHTML = 'пауза';
			// запускает таймер
			model.timer = setInterval(function(){
				view.elapsedTimePerGame.innerHTML = model.timerCount++;
			},1000);
			// отключает блокировку поля с картами
			if (view.containerForCards.classList.contains('containerForCards_disabled')) {
				view.containerForCards.classList.remove('containerForCards_disabled');
			}
		}
	}
});


	


