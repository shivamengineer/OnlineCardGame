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
  
  function keyDownGame(keycodeValue){
    switch(keycodeValue){
      case 65:
        console.log("Test");
        break;
    }
  }
  
  function moveDeck(x, y, i, allDecks){
    moveDeckGame(x, y, i, allDecks);
  }
  
  function moveDeckGame(x, y, i, allDecks){
    allDecks[i].x = x;
    allDecks[i].y = y;
  }

  module.exports = {connectPlayer, keyDown, joinGame, moveDeck};