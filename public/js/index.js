const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const img = document.getElementById("AceOfSpades");
var ctx2 = canvas.getContext('2d');

const socket = io();

canvas.width = innerWidth;
canvas.height = innerHeight;

const players = {};
const cards = {};
const menuOptions = {};
var menuAttribs = [0, 0, 75, 20, "white"];
var menuTitles = ["rotate right", "rotate left"];
var cardMenuOpen = false;
var shift = false;
var numPlayers = 0;
var cardSelected = -1;

for(i = 0; i < 5; i++){
  cards[i] = new Card(4, 2, false, i, 20 + (70 * i), 150);
}

for(i = 0; i < 2; i++){
  menuOptions[i] = new Rect(0, 0, menuAttribs[2], menuAttribs[3], menuAttribs[4]);
}

const degree = Math.PI / 180;

socket.on('updatePlayers', (backendPlayers, backendCards) => {

  for(const id in backendPlayers){
    const backendPlayer = backendPlayers[id];
    if(!players[id]){
      players[id] = new Rect(backendPlayer.x + (50 * numPlayers), backendPlayer.y, 30, 30, "white");
      players[id].playerNum = numPlayers;
      numPlayers++;
    }
  }
  
  for(const id in players){
    if(!backendPlayers[id]){
      var temp = players[id].playerNum;
      delete players[id];
      if(temp < numPlayers){
        for(const id2 in players){
          if(players[id2].playerNum > temp){
            players[id2].playerNum--;
            players[id2].x -= 50;
          }
        }
      }
      numPlayers--;
    }
  }

  //console.log(players);

  draw();
});

function draw() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for(i = 0; i < 5; i++){
    cards[i].renderCard(img);
  }

  for(const id in players){
    const newPlayer = players[id];
    newPlayer.render();
  }

  if(cardMenuOpen){
    for(const i in menuOptions){
      menuOptions[i].render();
      menuOptions[i].renderText(menuTitles[i]);
    }
  }

}