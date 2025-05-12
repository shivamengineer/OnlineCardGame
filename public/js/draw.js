function draw() {
    clearscreen();
    drawAlways();
    if(currentPage == 0){
        drawGame();
    } else if(currentPage == 1){
        drawTesting();
        if(openKeypad){
            drawKeypad();
        }
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
    for(const i in frontendDecks){
        frontendDecks[i].renderDeck();
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
    enterRoomCode.render();
    enterRoomCode.renderText(enterRoomCode.text);
    if(openKeypad){
        drawKeypad();
        drawNewRoomBox();
        if(newRoomEntry.text.length == 6){
            drawJoinGameButton();
        }
    }
}

function drawRulesEngine(){
    createRulesPage.render();
    gamePreviewPage.render();
    drawWhileBlock();
    drawForBlock();
    drawBreakContinueRects();
}

function drawButton1Rect(){
    ctx.drawImage(joinGameButton.image, button1Rect.x, button1Rect.y);
    /*button1Rect.render();
    button1Rect.renderText(button1Rect.text);*/
}

function drawButton2Rect(){
    ctx.drawImage(newRoomEntry.image, button2Rect.x, button2Rect.y);
    /*button2Rect.render();
    button2Rect.renderText(button2Rect.text);*/
}

function drawWhileBlock(){
    whileBlock.render();
    whileBlock.renderText(whileBlock.text);
}

function drawForBlock(){
    forBlock.render();
    forBlock.renderText(forBlock.text);
}

function drawBreakContinueRects(){
    breakRect.render();
    breakRect.renderText(breakRect.text);
    continueRect.render();
    continueRect.renderText(continueRect.text);
}

function drawCodeBlocks(){
    var temp = -1;
    for(const i in allBlocks){
        allBlocks[i].renderCodeBlock();
        if(allBlocks[i].moving){
            temp = i;
        }
    }
    for(const i in immovableBlocks){
        immovableBlocks[i].renderCodeBlock();
    }
    if(temp != -1){
        allBlocks[temp].renderCodeBlock();
    }
}

function drawKeypad(){
    for(i = 0; i < 10; i++){
        keypad[i].render();
        keypad[i].renderText(keypad[i].text);
    }
}

function drawNewRoomBox(){
    newRoomEntry.render();
    newRoomEntry.renderText(newRoomEntry.text);
}

function drawJoinGameButton(){
    joinGameButton.render();
    joinGameButton.renderText(joinGameButton.text);
}