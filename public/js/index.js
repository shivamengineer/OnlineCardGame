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
var homescreen = false;
var homeScreenRect = new Rect(300, 300, 200, 50, "white");
homeScreenRect.text = "Home Screen";


for(i = 0; i < 2; i++){
  menuOptions[i] = new Rect(0, 0, menuAttribs[2], menuAttribs[3], menuAttribs[4]);
}

const degree = Math.PI / 180;

socket.on('updatePlayers', (backendPlayers, backendCards) => {
  connectPlayer(backendPlayers);
  removePlayer(backendPlayers);
  updateCards(backendCards);
  draw();
});