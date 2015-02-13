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
        isOpened: false,
        hasMine: false
      }
    };

    // for ease of access!
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

    // User Interface
    var views = {
      // handles the actual logic of Game Menu hide/show mechanism
      menuToggle: function(){
        components.menu.style.display = components.menu.style.display === "inline-block" ? "none" : "inline-block";
      },

      generateBoard: function(){
        var rows = model.config.rows;
        var cols = model.config.cols;
        var mines = model.config.mines;
        var html= "",td, id =0;

        for(var i=0; i<rows; i++){
          html += '<tr>';
          for(var j=0; j<cols; j++){
            td = '<td class="tile" id="{id}"></td>';
            html += td.replace("{id}", id);
            id++;
          }
          html += '</tr>';
        }
        components.board.innerHTML = html;
        components.noOfMines.innerHTML = mines;
      },


    };

    // handles all the interactions/events - updates the model/views accordingly.
    var controller = {
      //  handles hide/show Menu EVENT!
      handleMenuToggle: function(){
        components.gameOptions.addEventListener('click', function(){
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
          controller.tileProp();
        });
      },

      // adds MODEL.TILE's properties(isOpened, hasMine, etc) to individual tile.
      tileProp: function(){
        model.config.tiles.length = 0; // ensures that tiles are pushed in an empty array on every refill.
        var tds = document.getElementsByClassName('tile');
        for(var i = 0; i < tds.length; i++){
          var eachTile = Object.create(model.tile);
          eachTile.td = tds[i]; // associates tile with properties!
          model.config.tiles.push(eachTile); // Tiles array contains all the tiles with properties.
          console.log(model.config.tiles[i]);
        }
      },

    };

    return{
      init: function(){
        views.generateBoard();
        controller.handleMenuToggle();
        controller.newGameInit();
        controller.tileProp();
      }
    };
  })();
  Game.init();
}());
