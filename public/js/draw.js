function draw() {
    clearscreen();
    drawAlways();
    if(homescreen){
        drawHomeScreenButton();
    } else {
        drawGame();
    }
}

function drawHomeScreenButton(){
    homeScreenRect.render();
    homeScreenRect.renderText(homeScreenRect.text);
}

function clearscreen(){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawCards(){
    for(const i in frontendCards){
        frontendCards[i].renderCard(img);
    }
}

function drawPlayers(){
    for(const id in frontendPlayers){
        const newPlayer = frontendPlayers[id];
        newPlayer.render();
    }
}

function drawMenuOptions(){
    if(cardMenuOpen){
        for(const i in menuOptions){
          menuOptions[i].render();
          menuOptions[i].renderText(menuTitles[i]);
        }
    }
}

function drawGame(){
    drawHomeScreenButton();
    drawCards();
    drawPlayers();
    drawMenuOptions();
}

function drawHomeScreen(){
    drawHomeScreenButton();
}

function drawAlways(){
    rect2.render();
    ctx2.save();
    ctx2.rotate(degree * 40);
    ctx2.fillStyle = "green";
    var x7 = (rect2.x * Math.cos(degree * 40)) + (rect2.y * Math.sin(degree * 40));
    var y7 = -(rect2.x * Math.sin(degree * 40)) + (rect2.y * Math.cos(degree * 40));
    ctx2.fillRect(x7, y7, rect2.width, rect2.height);
    ctx2.restore();
}