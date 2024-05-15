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

const testX = 300;
const testY = 200;
const rotateAmount = 3;

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
  //ctx2.drawImage(img, testX, testY);
  ctx2.rotate(90 * rotateAmount * degree);
  var newX = 0;
  var newY = 0;
  if(rotateAmount % 4 == 0){
    newX = testX;
    newY = testY;
  } else if(rotateAmount % 4 == 1){
    newX = testY;
    newY = -testX - img.naturalWidth;
  } else if(rotateAmount % 4 == 2){
    newX = -testX - img.naturalWidth;
    newY = -testY - img.naturalHeight;
  } else {
    newX = -testY - img.naturalHeight;
    newY = testX;
  }
  ctx2.drawImage(img, newX, newY);
  ctx2.restore();

  for(const id in players){
    const newPlayer = players[id];
    newPlayer.render();
  }

}