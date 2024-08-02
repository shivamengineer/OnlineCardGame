function start(cards){
    for(i = 0; i < 5; i++){
      //suits: 0: S, 1: C, 2: H, 3: D
      cards[i] = {
        value: 2 + i,
        suit: 0 + (i % 4),
        visible: true,
        cardID: i,
        x: 50 + (100 * i),
        y: 200,
        rotation: 0
      }
      cards.length++;
    }
  }
  
  function connectPlayer(socketID, players){
    const numPlayers = players.numPlayers
    players[socketID] = {
      x: 100,
      y: 100,
      index: numPlayers
    };
    players.numPlayers++;
  }

  function end(cards){
    for(i = 0; i < 5; i++){
        delete(cards[i]);
        cards.length = 0;
    }
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
  
  function moveCard(x, y, i, cards){
    moveCardGame(x, y, i, cards);
  }
  
  function moveCardGame(x, y, i, cards){
    cards[i].x = x;
    cards[i].y = y;
  }

  module.exports = {start, end, connectPlayer, keyDown, joinGame, shiftCards, moveCard};