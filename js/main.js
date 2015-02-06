(function() {
	var MS = (function(){
		var config = {
			rows: 9,
			cols: 9,
			mines: 10
		};

		function getGameConfig(){
			return config;
		}

		function setGameConfig(rows, cols, mines){
			config.rows = rows;
			config.cols =  cols;
			config.mines = mines;
		}

		return {
			setConfig: setGameConfig,
			getConfig: getGameConfig
		};

	})();

	var initialize = (function(){

		function toggleOptions(){
			var menu = document.getElementById('js-options');
			menu.style.display = menu.style.display === "inline-block" ? "none" : "inline-block";
		}

		function handleToggleEvent(){
			document.getElementById('game-options').addEventListener('click', function(){
				toggleOptions();
			});
		}

		function selectDifficulty(){
			var beginner = document.getElementById('beginner');
			var intermediate = document.getElementById('intermediate');
			var expert = document.getElementById('expert');
			if(beginner.checked){
				MS.setConfig(9,9,10);
			}
			else if(intermediate.checked){
				MS.setConfig(16,16,40);
			}
			else if(expert.checked){
				MS.setConfig(16,30,99);
			}
			console.log(MS.getConfig());
			generateBoard();
		}

		function newGameInit(){
			var newGame = document.getElementById('js-new-game');
			newGame.addEventListener('click', function(){
				selectDifficulty();
				toggleOptions();
			});
		}

		function generateBoard(){
			var board = document.getElementById('js-game-board');
			var noOfMines = document.getElementById('js-no-of-mines');

			var rows = MS.getConfig().rows;
			var cols = MS.getConfig().cols;
			var mines = MS.getConfig().mines;
			var html = "", td, id=1;

			for(var i=0; i<rows; i++){
				html += '<tr>';
				for(var j=0; j<cols; j++){
					td = '<td class="tile" id="{id}"></td>';
					html += td.replace("{id}", id);
					id++;
				}
				html += "</tr>";
			}
			board.innerHTML = html;
			noOfMines.innerHTML = mines;
		}

		return function(){
			handleToggleEvent();
			newGameInit();
			generateBoard();
		};

	})();

	initialize();

	var startGame = (function(){
		var emoticons = document.getElementById('js-play-mood');
		var clock = document.getElementById('js-clock');
		var board = document.getElementById("js-game-board");
		var mines = MS.getConfig().mines;
		var rows = MS.getConfig().rows;
		var cols = MS.getConfig().cols;
		var randomNos = [];
		var uniqueNos = [];
		var tilesWithMines = [];
		var firstTile = true;
		var time;

		function handleClickedTd(){
			board.addEventListener("click", function(e) {
				if(e.target && e.target.nodeName === "TD") {
					tileID = parseInt(e.target.id, 10);
					tile = document.getElementById(e.target.id);
					if(firstTile === true){
						play(tileID);
						tile.classList.add('opened-tile');
						firstTile = false;
					}
					else if(clickedMine(tileID)){
						lost();
					}
					else {
						tile.classList.add('opened-tile');
					}
				}
			});
		}

		function play(tileID){
			timer();
			placeMines(tileID);
		}

		function placeMines(tileID){
			var tilesWithMines = randomPlacesForMines(tileID);
			console.log("These are the places where mines are placed :=> " + tilesWithMines);
		}

		function randomPlacesForMines(tileID){
			for(var i=1; i<= mines; i++){
				var random = Math.floor((Math.random()* (rows*cols))+1);
				randomNos.push(random);
				var lengthBeforeCheck = tilesWithMines.length;
				tilesWithMines = uniqueAndNotFirstTile(random, i, tileID);
				var	lengthAfterCheck = tilesWithMines.length;
				if(lengthBeforeCheck >= lengthAfterCheck){
					console.log("Either Already present or Same index as of first Clicked tile! Not added!");
					i--;
				}
			}
			return tilesWithMines;
		}

		function uniqueAndNotFirstTile(random, i, tileID) {
			uniqueNos = randomNos.filter(function(no, index){
				return (randomNos.indexOf(no) === index && random !== tileID);
			});
			return uniqueNos;
		}

		function clickedMine(tileID){
			for(var k=0; k< tilesWithMines.length; k++){
				if(tileID === tilesWithMines[k]){
					return true;
				}
			}
		}

		function lost(){
			clearInterval(time);
			for(var i =0; i< tilesWithMines.length; i++){
				tileWithMine = document.getElementById(tilesWithMines[i]);
				tileWithMine.classList.add('mines');
			}
		}

		function timer(){
			var counter = 0;
			time = setInterval(function(){
				if(counter < 999){
					counter++;
					clock.innerHTML = counter;
				}
				else {
					clearInterval(time);
					emoticons.setAttribute("src", "images/sad.png");
				}
			}, 1000);
		}

		return {
			findClickedTd: handleClickedTd
		};

	})();
	startGame.findClickedTd();
}());