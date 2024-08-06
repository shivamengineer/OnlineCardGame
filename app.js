const ioEventsLib = require('./ioEvents');
const deckA = require('./public/js/classes/Deck');
const cardClass = require('./public/js/classes/Card');
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
const rooms = {};
const cards = {};
cards.length = 0;
players.numPlayers = 0;
var started = false;

const decks = {};

//checks events whenever any event is sent to server
io.on('connection', (socket) => {

  //creates 5 cards if the first player connects
  if(!started){
    ioEventsLib.start(cards);
    started = true;
  }

  //connects player
  ioEventsLib.connectPlayer(socket.id, players);

  //disconnects player
  socket.on('disconnect', (reason) => {
    disconnectPlayer(socket.id);
  });

  //updates based on keydown events
  socket.on('keydown', (keycode) => {
    ioEventsLib.keyDown(keycode);
  });

  //has player join new game
  socket.on('joinGame', (roomID) => {
    ioEventsLib.joinGame(rooms, roomID, socket.id);
  });

  //shifts card order for rendering
  socket.on('shiftCards', (i) => {
    ioEventsLib.shiftCards(cards, i);
    io.emit('updatePlayers', players, cards);
  });

  //updates based on the mouse moving
  socket.on('mousemove', (mouseX, mouseY, i) => {
    ioEventsLib.moveCard(mouseX, mouseY, i, cards);
    io.emit('updatePlayers', players, cards);
  });

  //updates from mouseUp event for moving cards
  socket.on('mouseup', (mouseX, mouseY, i) => {
    ioEventsLib.moveCard(mouseX, mouseY, i, cards);
    io.emit('updatePlayers', players, cards);
  });

  //updates from mouseUp event for rotating cards
  socket.on('rotateCard', (i, deltaX, deltaY) => {
    cards[i].rotation = Math.atan(deltaY / deltaX);
    io.emit('updatePlayers', players, cards);
  });

  //socket.emit for local, io.emit for everyone
  io.emit('updatePlayers', players, cards);

});

//starts server
server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

//function to disconnect player
function disconnectPlayer(socketID){
  delete players[socketID];
  players.numPlayers--;
  if(players.numPlayers == 0){
    ioEventsLib.end(cards);
    started = false;
  }
  io.emit('updatePlayers', players, cards);
}