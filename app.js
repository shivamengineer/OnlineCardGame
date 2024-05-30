const ioEventsLib = require('./ioEvents');
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
    ioEventsLib.start(cards);
    started = true;
  }

  ioEventsLib.connectPlayer(socket.id, players);

  socket.on('disconnect', (reason) => {
    disconnectPlayer(socket.id);
  });

  socket.on('keydown', (keycode) => {
    ioEventsLib.keyDown(keycode);
  });

  socket.on('mousemove', (mouseX, mouseY, i) => {
    ioEventsLib.moveCard(mouseX, mouseY, i, cards);
    io.emit('updatePlayers', players, cards);
  });

  socket.on('mouseup', (mouseX, mouseY, i) => {
    ioEventsLib.moveCard(mouseX, mouseY, i, cards);
    io.emit('updatePlayers', players, cards);
  });

  //socket.emit for local, io.emit for everyone
  io.emit('updatePlayers', players, cards);

});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

function end(){
  for(i = 0; i < 5; i++){
      delete(cards[i]);
  }
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