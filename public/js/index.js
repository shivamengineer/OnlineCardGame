const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const img = document.getElementById("AceOfSpades");
var ctx2 = canvas.getContext('2d');

const socket = io();

canvas.width = innerWidth;
canvas.height = innerHeight;

const players = {};
const card = new Card(4, 1, true, 1);

socket.on('updatePlayers', (backendPlayers) => {
  for(const id in backendPlayers){
    const backendPlayer = backendPlayers[id];
    if(!players[id]){
      players[id] = new Rect(backendPlayer.x + (50 * backendPlayer.index), backendPlayer.y, 30, 30, "white");
    }
  }
  
  for(const id in players){
    if(!backendPlayers[id]){
      delete players[id];
    }
  }

  console.log(players);

  draw();
});

function draw() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx2.save();
  ctx2.drawImage(img, 400, 40);
  for(i = 0; i < 90; i++){
    ctx2.rotate(Math.PI / 180);
    ctx2.drawImage(img, 400, 40);
  }
  ctx2.restore();

  for(const id in players){
    const newPlayer = players[id];
    newPlayer.render();
  }

  console.log(card.value);
  console.log(card.visible);
  card.changeVisibility();

}