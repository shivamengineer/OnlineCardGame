function draw() {
    clearscreen();
    if(homescreen){
        drawHomeScreenButton();
    } else {
        drawGame();
    }
}

function drawHomeScreenButton(){
    homeScreenRect.render();
    homeScreenRect.renderText("Home Screen");
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