(function(){

  var Game = (function(){

    var model = {

      config: {
        rows: 9,
        cols: 9,
        mines: 10,

        setConfig: function(rows,cols, mines){
          this.rows = rows;
          this.cols = cols;
          this.mines = mines;
        }
      },

      tile: {
        isOpened: false,
        isMine: false,
        isEmpty: false,
        isFlagged: false,
        isFirstTile: true
      },

      status: {
        isGameOver: false,
        isTimeOut: false
      },

      elements: {
        clock: document.getElementById('js-clock'),
        smiley: document.getElementById('js-play-mood'),
        menu: document.getElementById('js-options'),
        board: document.getElementById('js-game-board'),
        noOfMines: document.getElementById('js-no-of-mines'),
        gameOptions: document.getElementById('game-options')
      }
    };

    var views = {

      menuToggle: function(){
        model.elements.menu.style.display = model.elements.menu.style.display === "inline-block" ? "none" : "inline-block";
      },

      generateBoard: function(){
        var rows = model.config.rows;
        var cols = model.config.cols;
        var mines = model.config.mines;
        var html= "",td, id =1;

        for(var i=0; i<rows; i++){
          html += '<tr>';
          for(var j=0; j<cols; j++){
            td = '<td class="tile" id="{id}"></td>';
            html += td.replace("{id}", id);
            id++;
          }
          html += '</tr>';
        }
        model.elements.board.innerHTML = html;
        model.elements.noOfMines.innerHTML = mines;
      },

      setSmiley: function(mood){

      }

    };

    var controller = {

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
          views.generateBoard(); // generates boards with the chosen difficulty.
          views.menuToggle(); // hide Menu after the new Game has been initialized.
        });
      },

      handleMouseEvents: function(){
        model.elements.board.addEventListener('click', function(e){
          if(e.target && e.target.nodeName === 'TD'){
            var tileId = parseInt(e.target.id, 10);
            var tile = document.getElementById(tileId);

            if(model.tile.isFirstTile === true){
              controller.playGame(tileId);
              model.tile.isFirstTile = false;
            }
          }
        });
      },

      playGame: function(tileId){

      }

    };

    return {
      init: function(){
        views.generateBoard(); // generates board with default config (9,9,10)
        controller.handleMenuToggle(); // handles hide/show mechanism of Menu
        controller.newGameInit(); // generates boards if the player happens to choose difficulty and start a new game.
        controller.handleMouseEvents();
      }
    };

  })();

  Game.init();

}());
