function connectPlayer(backendPlayers){
    for(const id in backendPlayers){
      const backendPlayer = backendPlayers[id];
      if(!frontendPlayers[id]){
        backendPlayer.x += distanceBetweenPlayers * numPlayers;
        frontendPlayers[id] = new Rect(backendPlayer.x, backendPlayer.y, 30, 30, "white");
        frontendPlayers[id].playerNum = numPlayers;
        numPlayers++;
      }
    }
}

function removePlayer(backendPlayers){
    for(const id in frontendPlayers){
      if(!backendPlayers[id]){
        var temp = frontendPlayers[id].playerNum;
        delete frontendPlayers[id];
        shiftPlayersLeft(temp);
        numPlayers--;
      }
    }
}

function updateDecks(backendDecks){
  for(const i in backendDecks){
    const backendDeck = backendDecks[i];
    if(!frontendDecks[i]){
      frontendDecks[i] = new Deck(backendDeck.topCard, backendDeck.length, backendDeck.visible, backendDeck.x, backendDeck.y, backendDeck.rotation);
    } else {
      frontendDecks[i].updateDeck(backendDeck.topCard, backendDeck.length, backendDeck.visible, backendDeck.x, backendDeck.y, backendDeck.rotation);
    }
  }
}

function shiftPlayersLeft(temp){
  if(temp < numPlayers){
    for(const id2 in frontendPlayers){
      if(frontendPlayers[id2].playerNum > temp){
        frontendPlayers[id2].playerNum--;
        frontendPlayers[id2].x -= distanceBetweenPlayers;
      }
    }
  }
}