const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const img = document.getElementById("AceOfSpades");
var ctx2 = canvas.getContext('2d');

const socket = io();

canvas.width = innerWidth;
canvas.height = innerHeight;

const players = {};
const card = new Card(4, 1, true, 1);
const degree = Math.PI / 180;

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
  ctx2.drawImage(img, 400, 0);
  ctx2.rotate(45 * degree);
  ctx2.translate(400, 0);
  ctx2.translate(-100, -2 * 400 * Math.sin(45 * degree / 2));
  ctx2.drawImage(img, 0, 0);
  ctx2.restore();

  ctx2.save();
  ctx2.rotate(90 * degree);
  ctx2.translate(0, 0);
  ctx2.translate(0, -2 * 300 * Math.sin(90 * degree / 2));
  ctx2.drawImage(img, 0, 0);
  ctx2.restore();

  for(const id in players){
    const newPlayer = players[id];
    newPlayer.render();
  }

  console.log(card.value);
  console.log(card.visible);
  card.changeVisibility();

}