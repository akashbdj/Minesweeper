(function(){
  var Game = (function(){

    // holds the data of the application.
    var model = {
      config: {
        rows: 9,
        cols: 9,
        mines: 10,
        tiles: [],
        setConfig: function(rows, cols, mines){
          this.rows = rows;
          this.cols = cols;
          this.mines = mines;
        }
      },
      tile: {
        isFlagged: false,
        isVisited: false,
        hasMine: false
      }
    };

    // for ease of reference!
    var components = {
      isGameOver: false,
      isTimeOut: false,
      clock: document.getElementById('js-clock'),
      smiley: document.getElementById('js-play-mood'),
      menu: document.getElementById('js-options'),
      board: document.getElementById('js-game-board'),
      noOfMines: document.getElementById('js-no-of-mines'),
      gameOptions: document.getElementById('game-options'),
      images: {
        sad: "images/sad.png",
        smile: "images/smile.png",
        cool: "images/cool.png",
        flag: "images/flag.png",
        mine: "images/mine.png"
      }
    };

    // User Interfaces
    var views = {

    };

    // handles all the interactions/events - updates the model/views accordingly.
    var controller = {
      //  handles hide/show Menu EVENT!
      handleMenuToggle: function(){
        model.elements.gameOptions.addEventListener('click', function(){
          views.menuToggle();
        });
      },

      selectDifficulty: function(){
        var beginner = document.getElementById('beginner');
        var intermediate = document.getElementById('intermediate');
        var expert = document.getElementById('expert');
        if(beginner.checked){
          model.config.setConfig(9,9,10);
        }
        else if(intermediate.checked){
          model.config.setConfig(16,16,40);
        }
        else if(expert.checked){
          model.config.setConfig(16,30,99);
        }
      },

      newGameInit: function(){
        var newGame = document.getElementById('js-new-game');
        newGame.addEventListener('click', function(){
          controller.selectDifficulty(); // On newGame - Select difficulty level and generate the game board.
          views.generateBoard(); // generates board with the chosen difficulty.
          views.menuToggle(); // hide Menu after the new Game has been initialized.
        });
      },

      // adds MODEL.TILE's properties(isOpened, hasMine, etc) to individual tile.
      tileProp: function(){
        var tds = document.getElementsByTagName('td');
        for(var i = 0; i < tds.length; i++){
          var eachTile = Object.create(model.tile);
          eachTile.td = tds[i]; // associates tile with properties!
          tiles.push(eachTile); // Tiles array contains all the tiles with properties.
        }
      },

    };

    return{
      init: function(){
        controller.tileProp();
      }
    };
  })();
}());
