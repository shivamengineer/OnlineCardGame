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

io.on('connection', (socket) => {
  console.log('a user connected');
  const numPlayers = players.numPlayers;
  players[socket.id] = {
    x: 100,
    y: 100,
    index: numPlayers
  };
  players.numPlayers++;

  socket.on('disconnect', (reason) => {
    console.log(reason);
    delete players[socket.id];
    players.numPlayers--;
    io.emit('updatePlayers', players, cards);
  });

  socket.on('keydown', (keycode) => {
    switch(keycode){
      case 65:
        console.log(socket.id);
        console.log("A1");
        break;
    }
  })

  //socket.emit for local, io.emit for everyone
  io.emit('updatePlayers', players, cards);

});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});