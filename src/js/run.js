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