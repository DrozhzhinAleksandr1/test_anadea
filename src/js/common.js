window.onload = function(){
	var select = document.getElementsByClassName('cardGameSize')[0],
		containerForCards = document.getElementsByClassName('containerForCards')[0];
		buildCardGame(6);
	
	select.addEventListener('change', function(){
		var selectValue = +select.value;
		buildCardGame(selectValue);
	});

	function appendDiv(number){
		var div = document.createElement('div');
		div.className = 'containerForCards__cards containerForCards__cards_number' + number;
		containerForCards.appendChild(div);
	}

	function buildCardGame(number){
		containerForCards.innerHTML = '';

		for(var i = 1; i<=(number*number);i++){
			appendDiv(number);
		}
			
	}
}


