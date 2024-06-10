function draw() {
    clearscreen();
    drawAlways();
    if(currentPage == 0){
        drawGame();
    } else if(currentPage == 1){
        drawTesting();
    } else if(currentPage == 2){
        drawRulesEngine();
        drawCodeBlocks();
    }
}

function clearscreen(){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawAlways(){
    drawButtons(); 
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
    drawCards();
    drawPlayers();
    drawMenuOptions();
}

function drawButtons(){
    drawButton1Rect();
    drawButton2Rect();
}

function drawTesting(){
    //testing
    ctx2.save();
    ctx2.rotate(degree * 40);
    ctx2.fillStyle = "green";
    var x7 = (rect2.x * Math.cos(degree * 40)) + (rect2.y * Math.sin(degree * 40));
    var y7 = -(rect2.x * Math.sin(degree * 40)) + (rect2.y * Math.cos(degree * 40));
    ctx2.fillRect(x7, y7, rect2.width, rect2.height);
    ctx2.restore();
}

function drawRulesEngine(){
    createRulesPage.render();
    gamePreviewPage.render();
    drawWhileBlock();
    drawForBlock();
}

function drawButton1Rect(){
    button1Rect.render();
    button1Rect.renderText(button1Rect.text);
}

function drawButton2Rect(){
    button2Rect.render();
    button2Rect.renderText(button2Rect.text);
}

function drawWhileBlock(){
    whileBlock.render();
    whileBlock.renderText(whileBlock.text);
}

function drawForBlock(){
    forBlock.render();
    forBlock.renderText(forBlock.text);
}

function drawCodeBlocks(){
    for(const i in allBlocks){
        allBlocks[i].renderCodeBlock();
    }
}