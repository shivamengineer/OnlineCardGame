   function connectPlayer(socketID, players){
    const numPlayers = players.numPlayers
    players[socketID] = {
      x: 100,
      y: 100,
      index: numPlayers
    };
    players.numPlayers++;
  }
  
  function keyDown(keycodeValue){
    keyDownGame(keycodeValue);
  }

  function joinGame(rooms, roomNum, socketID){
    //rooms[roomNum].addPlayer(socketID);
  }

  function shiftCards(backendCards, i){
    for(const j in backendCards){
      
    }
  }
  
  function keyDownGame(keycodeValue){
    switch(keycodeValue){
      case 65:
        console.log("Test");
        break;
    }
  }
  
  function moveDeck(x, y, i, decks){
    moveDeckGame(x, y, i, decks);
  }
  
  function moveDeckGame(x, y, i, decks){
    decks[i].x = x;
    decks[i].y = y;
  }

  module.exports = {connectPlayer, keyDown, joinGame, shiftCards, moveDeck};