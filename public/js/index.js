const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
var img = document.getElementById("5S");
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
var cardRotating = false;

var suitValue = ["S", "C", "H", "D"];

//0 = game, 1 = homescreen, 2 = rules engine
var currentPage = 1;

var button1Rect = new Rect(400, 500, 100, 30, "white");
button1Rect.text = "Game";
var button2Rect = new Rect(550, 500, 100, 30, "white");
button2Rect.text = "Rules Engine";
const degree = Math.PI / 180;

var joinGameButton = new Rect(150, 300, 100, 30, "white");
joinGameButton.text = "Join Game";

const keypad = [];
keypad.x = joinGameButton.x, keypad.y = joinGameButton.y + 50;

for(i = 0; i < 10; i++){
  var num = new Rect(keypad.x + (25 * i), keypad.y, 15, 20, "white");
  num.text = i;
  keypad.push(num);
}

var openKeypad = false;

var createRulesPage = new Rect(250, 50, 500, 400, "white");
var gamePreviewPage = new Rect(800, 50, 500, 400, "white");

var whileBlock = new Rect(100, 80, 80, 30, "red");
whileBlock.text = "while";
var forBlock = new Rect(100, 150, 80, 30, "red");
forBlock.text = "for";
var startRect = new Rect(255, 55, 80, 30, "blue");
startRect.text = "start";
var startBlock = new CodeBlock(startRect);
var breakRect = new Rect(100, 220, 80, 30, "blue");
breakRect.text = "goto ";
var continueRect = new Rect(100, 250, 80, 30, "blue");
continueRect.text = "continue ";

var createBlocks = [];
var createBreakContinueBlocks = [];
var allBlocks = [];
var immovableBlocks = [];

var removedGotoSet = new Set();
var gotoBlocksCount = 1;

createBlocks.push(whileBlock);
createBlocks.push(forBlock);
createBreakContinueBlocks.push(breakRect);
createBreakContinueBlocks.push(continueRect);
immovableBlocks.push(startBlock);

for(i = 0; i < 2; i++){
  menuOptions[i] = new Rect(0, 0, menuAttribs[2], menuAttribs[3], menuAttribs[4]);
}

socket.on('updatePlayers', (backendPlayers, backendCards) => {
  connectPlayer(backendPlayers);
  removePlayer(backendPlayers);
  updateCards(backendCards);
  draw();
});