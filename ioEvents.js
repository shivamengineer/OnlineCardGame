function start(cards){
    for(i = 0; i < 5; i++){
      cards[i] = {
        value: 1,
        suit: 2,
        visible: true,
        cardID: i,
        x: 20 + (70 * i),
        y: 150
      }
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
  
  function keyDown(keycodeValue){
    keyDownGame(keycodeValue);
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

  module.exports = {start, connectPlayer, keyDown, moveCard};