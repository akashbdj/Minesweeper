/*
 --------------------------------------------------------------------
          MINESWEEPER IN PURE JAVASCRIPT : Akash Bhardwaj :)
 --------------------------------------------------------------------
*/
//  -------------------- LOGIC STARTS HERE --------------------

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
      isFirstTile: true,
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
          controller.tileProp(); // sets properties to the tiles of newly generated board.
        });
      },

      // adds MODEL.TILE's properties(isOpened, hasMine, etc) to individual tile.
      tileProp: function(){
        model.config.tiles.length = 0; // ensures that tiles are pushed to an empty array on every refill.
        var tds = document.getElementsByClassName('tile');
        for(var i = 0; i < tds.length; i++){
          var eachTile = Object.create(model.tile); // model.tile is now a prototype of eachTile. Crockford \m/
          eachTile.td = tds[i]; // associates tile with properties!
          model.config.tiles.push(eachTile); // Tiles array contains all the tiles with properties.
          console.log(model.config.tiles[i]);
        }
      },

      // handles all the interaction with the tiles
      handleMouseEvents: function(){
        // disables Right Click (Context Menu) on the board; so that It should do the Flagging on right click.
        components.board.addEventListener('contextmenu', function(e){
          e.prevantDefault();
        });
        // finds target element through Event Delegation, i.e finds the clicked tile.
        component.board.addEventListener('mouseup', function(e){
          if(e.target && e.target.nodeName === 'TD'){
            var tileId = parseInt(e.target.id, 10);
            var tile = document.getElement(tileId);
            // if it's right Click --- DO THE FLAGGING!
            if(e.button === 2){
              console.log("Hello, Right Click");
              if(model.config.tiles[tileId].isOpened === false){
                views.doFlagging(tile);
              }
            }
            else{
              controller.playGame(tileId);
            }
          }
        });
      },

      playGame: function(){
        // if it's the first click of the game, initialize it - start timer, generate mines, and calculate values!
        if(components.isFirstTile === true){
          controller.timer();
          controller.plantMines(tileId);
          components.isFirstTile = false;
        }
        else if(controller.hasClickedMine()){

        }
      },

      timer: function(){
        var counter = 0;
        time = setInterval(function(){
          if(counter < 999){
            counter++;
            components.clock.innerHTML = counter;
          }
          else {
            clearInterval(time);
            views.setSmiley("sad");
            components.isTimeOut = true;
            components.isGameOver = true;
          }
        }, 1000);
      },
      // donot plant a mine at the position of the first Click!
      plantMines: function(tileId){
        var random, k;
        var rows = model.config.rows;
        var cols  = model.config.cols;
        var tiles = model.config.tiles;
        for(k = 0; k < model.config.mines; k++){
          random = Math.floor(Math.random() * (rows*cols));
          if(random === tileId && tiles[random].hasMine === true){
            console.log("Either Mine has already been planted here, or it's the id of first clicked tile");
            k--;
          }
          else{
            tiles[random].hasMine = true;
          }
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
