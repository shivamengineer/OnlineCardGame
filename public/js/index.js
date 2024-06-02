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
const distanceBetweenPlayers = 50;
var menuAttribs = [0, 0, 75, 20, "white"];
var menuTitles = ["rotate right", "rotate left"];
var cardMenuOpen = false;
var shift = false;
var numPlayers = 0;
var cardSelected = -1;

//0 = game, 1 = homescreen, 2 = rules engine
var currentPage = 0;

var button1Rect = new Rect(400, 300, 100, 30, "white");
button1Rect.text = "Home Screen";
var button2Rect = new Rect(550, 300, 100, 30, "white");
button2Rect.text = "Rules Engine";
const degree = Math.PI / 180;

var rect2 = new Rect(400, 600, 50, 50, "pink");


for(i = 0; i < 2; i++){
  menuOptions[i] = new Rect(0, 0, menuAttribs[2], menuAttribs[3], menuAttribs[4]);
}

socket.on('updatePlayers', (backendPlayers, backendCards) => {
  connectPlayer(backendPlayers);
  removePlayer(backendPlayers);
  updateCards(backendCards);
  draw();
});