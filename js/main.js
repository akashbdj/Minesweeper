// learning to implement Revealing Module Pattern

(function() {
	var minesweeper = (function(){
		var minesweep = {};

		function useGameInitials(){
			return minesweep;
		}

		function setGameInitials(rows, cols, mines){
			minesweep.rows = rows;
			minesweep.cols =  cols;
			minesweep.mines = mines;
		}

		return {
			setMs: setGameInitials,
			ms: useGameInitials
		};

	})();

	var beforeGame = (function(){
		function toggleOptions(){
			document.getElementById('game-options').addEventListener('click', function(){
				var menu = document.getElementById('options');
				menu.style.display = menu.style.display === "inline-block" ? "none" : "inline-block";
			});
		}

		function selectDifficulty(){
			var beginner = document.getElementById('beginner');
			var intermediate = document.getElementById('intermediate');
			var expert = document.getElementById('expert');
			if(beginner.checked){
				minesweeper.setMs(9,9,10);
			}
			else if(intermediate.checked){
				minesweeper.setMs(16,16,40);
			}
			else if(expert.checked){
				minesweeper.setMs(16,30,99);
			}
			console.log(minesweeper.ms());
		}

		function newGame(){
			var startGame = document.getElementById('start-game');
			startGame.addEventListener('click', function(){
				selectDifficulty();
			});
		}

		return {
				toggleMenu: toggleOptions,
				startGame: newGame
		};
	})();

	beforeGame.toggleMenu();
	beforeGame.startGame();

}());