const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);

const { Server } = require('socket.io');
const io = new Server(server, { pingInterval: 2000, pingTimeout: 5000});

const port = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

const players = {};
const cards = {};
players.numPlayers = 0;
var started = false;

io.on('connection', (socket) => {

  console.log('a user connected');

  if(!started){
    start();
    started = true;
  }

  connectPlayer(socket.id);

  socket.on('disconnect', (reason) => {
    disconnectPlayer(socket.id);
  });

  socket.on('keydown', (keycode) => {
    keyDown(keycode);
  });

  socket.on('mousemove', (mouseX, mouseY, i) => {
    moveCard(mouseX, mouseY, i);
  });

  socket.on('mouseup', (mouseX, mouseY, i) => {
    moveCard(mouseX, mouseY, i);
  });

  //socket.emit for local, io.emit for everyone
  io.emit('updatePlayers', players, cards);

});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

function start(){
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

function end(){
  for(i = 0; i < 5; i++){
    delete cards[i];
  }
}

function connectPlayer(socketID){
  const numPlayers = players.numPlayers
  players[socketID] = {
    x: 100,
    y: 100,
    index: numPlayers
  };
  players.numPlayers++;
}

function disconnectPlayer(socketID){
  delete players[socketID];
  players.numPlayers--;
  if(players.numPlayers == 0){
    end();
    started = false;
  }
  io.emit('updatePlayers', players, cards);
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

function moveCard(x, y, i){
  moveCardGame(x, y, i);
}

function moveCardGame(x, y, i){
  cards[i].x = x;
  cards[i].y = y;
  io.emit('updatePlayers', players, cards);
}