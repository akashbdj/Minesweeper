// learning to implement Revealing Module Pattern

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
			document.getElementById('game-options').addEventListener('click', function(){
				var menu = document.getElementById('js-options');
				menu.style.display = menu.style.display === "inline-block" ? "none" : "inline-block";
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
			var startGame = document.getElementById('js-start-game');
			startGame.addEventListener('click', function(){
				selectDifficulty();
				var menu = document.getElementById('js-options');
				menu.style.display = menu.style.display === "inline-block" ? "none" : "inline-block";
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
			toggleOptions();
			newGameInit();
			generateBoard();

		};

	})();

	initialize();

}());