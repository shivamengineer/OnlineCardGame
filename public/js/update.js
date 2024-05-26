function connectPlayer(backendPlayers, frontendPlayers){
    for(const id in backendPlayers){
      const backendPlayer = backendPlayers[id];
      if(!frontendPlayers[id]){
        backendPlayer.x += 50 * numPlayers;
        frontendPlayers[id] = new Rect(backendPlayer.x, backendPlayer.y, 30, 30, "white");
        frontendPlayers[id].playerNum = numPlayers;
        numPlayers++;
      }
    }
}

function removePlayer(backendPlayers, frontendPlayers){
    for(const id in frontendPlayers){
      if(!backendPlayers[id]){
        var temp = frontendPlayers[id].playerNum;
        delete frontendPlayers[id];
        if(temp < numPlayers){
          for(const id2 in frontendPlayers){
            if(frontendPlayers[id2].playerNum > temp){
              frontendPlayers[id2].playerNum--;
              frontendPlayers[id2].x -= 50;
            }
          }
        }
        numPlayers--;
      }
    }
}

function updateCards(backendCards, frontendCards){
    for(const i in backendCards){
      const backendCard = backendCards[i];
      if(!frontendCards[i]){
        frontendCards[i] = new Card(backendCard.value, backendCard.suit, backendCard.visible, backendCard.cardID, backendCard.x, backendCard.y);
      } else {
        frontendCards[i].x = backendCards[i].x;
        frontendCards[i].y = backendCards[i].y;
      }
    }
}