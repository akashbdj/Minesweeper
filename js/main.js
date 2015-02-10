(function(){

  var Game = (function(){

    var model = {

      config: {
        rows: 9,
        cols: 9,
        mines: 10,
        tilesWithMines: [],

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
        if(mood === 'sad'){
          model.elements.smiley.setAttribute("src", "images/sad.png");
        }
        else if(mood === 'smile'){
          model.elements.smiley.setAttribute("src", "images/smile.png");
        }
        else if(mood === 'cool'){
          model.elements.smiley.setAttribute("src", "images/cool.png");
        }
      },

      setClassOfTile: function(){

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
          views.generateBoard(); // generates board with the chosen difficulty.
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
        controller.timer();
        controller.plantMines(tileId);
      },

      timer: function(){
        var counter = 0;
        time = setInterval(function(){
          if(counter < 999){
            counter++;
            model.elements.clock.innerHTML = counter;
          }
          else {
            clearInterval(time);
            views.setSmiley("sad");
          }
        }, 1000);
      },

      plantMines: function(tileId){
        var possibleMinePositions = [];
        var size = model.config.rows * model.config.cols;
        for(var i = 0; i < size; i++){
          if(tileId !== i){
            possibleMinePositions.push(i);
          }
        }
        model.config.tilesWithMines = controller.getMinePositions(possibleMinePositions).slice(0, model.config.mines);
        console.log("mines planted at these places: " + model.config.tilesWithMines);
      },

      getMinePositions: function(positions){
        var temp, i, random;
        for(i = positions.length; i > 0; i--){
          random = Math.floor(Math.random() * i);
          temp = positions[i];
          positions[i] = positions[random];
          positions[random] = temp;
        }
        return positions;
      }
    };

    return {
      init: function(){
        views.generateBoard(); // generates board with default config (9,9,10)
        controller.handleMenuToggle(); // handles hide/show mechanism of Menu
        controller.newGameInit(); // generates board if the player happens to choose difficulty and start a new game.
        controller.handleMouseEvents();
      }
    };

  })();

  Game.init();

}());
