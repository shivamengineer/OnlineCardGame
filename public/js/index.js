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
const x = 400;
const x2 = 500;
const x3 = 300;
const y = 0;
const y2 = 100;
const y3 = 300;

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

  console.log("width: " + img.naturalWidth);
  console.log("height: " + img.naturalHeight);

  ctx2.save();
  //bottom left
  ctx2.drawImage(img, x, y);
  ctx2.drawImage(img, x2, y2);

  //top right
  ctx2.drawImage(img, y, x);
  ctx2.drawImage(img, y2, x2);
  
  //middle
  ctx2.drawImage(img, x3, y3);

  //bottom left rotated
  ctx2.rotate(90 * degree);
  ctx2.drawImage(img, x, -img.naturalWidth);
  ctx2.drawImage(img, x2, -y2 - img.naturalWidth);
  ctx2.restore();

  //top right rotated
  ctx2.save();
  ctx2.rotate(90 * degree);
  ctx2.drawImage(img, 0, -x - img.naturalWidth);
  ctx2.drawImage(img, y2, -x2 - img.naturalWidth);
  //ctx2.drawImage(img, Math.sqrt((x2 * x2)+(y2 * y2)) - img.naturalWidth, 0);
  ctx2.restore();

  //middle rotated
  ctx2.save();
  ctx2.rotate(90 * degree);
  ctx2.drawImage(img, x3 , y3 - (2 * x3) - (img.naturalWidth));
  ctx2.restore();

  for(const id in players){
    const newPlayer = players[id];
    newPlayer.render();
  }

  console.log(card.value);
  console.log(card.visible);
  card.changeVisibility();

}