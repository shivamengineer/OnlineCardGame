const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const img = document.getElementById("AceOfSpades");
var ctx2 = canvas.getContext('2d');

const socket = io();

canvas.width = innerWidth;
canvas.height = innerHeight;

const frontendPlayers = {};
const frontendCards = {};
const menuOptions = {};
var menuAttribs = [0, 0, 75, 20, "white"];
var menuTitles = ["rotate right", "rotate left"];
var cardMenuOpen = false;
var shift = false;
var numPlayers = 0;
var cardSelected = -1;

for(i = 0; i < 2; i++){
  menuOptions[i] = new Rect(0, 0, menuAttribs[2], menuAttribs[3], menuAttribs[4]);
}

const degree = Math.PI / 180;

socket.on('updatePlayers', (backendPlayers, backendCards) => {

  for(const id in backendPlayers){
    const backendPlayer = backendPlayers[id];
    if(!frontendPlayers[id]){
      backendPlayer.x += 50 * numPlayers;
      frontendPlayers[id] = new Rect(backendPlayer.x, backendPlayer.y, 30, 30, "white");
      frontendPlayers[id].playerNum = numPlayers;
      numPlayers++;
    }
  }
  
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

  for(const i in backendCards){
    const backendCard = backendCards[i];
    if(!frontendCards[i]){
      frontendCards[i] = new Card(backendCard.value, backendCard.suit, backendCard.visible, backendCard.cardID, backendCard.x, backendCard.y);
    }
  }

  //console.log(players);

  draw();
});

socket.on('updateLocal', (backendPlayers, socketID) => {
  console.log("TEST");
});

function draw() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for(const i in frontendCards){
    frontendCards[i].renderCard(img);
  }

  for(const id in frontendPlayers){
    const newPlayer = frontendPlayers[id];
    newPlayer.render();
  }

  if(cardMenuOpen){
    for(const i in menuOptions){
      menuOptions[i].render();
      menuOptions[i].renderText(menuTitles[i]);
    }
  }

}