function mouseDownEventMenu(e){
    var mouseX = e.clientX;
    var mouseY = e.clientY;
    if(mouseCollides(mouseX, mouseY, joinGameButton)){
        openKeypad = true;
        console.log("collides");
        drawKeypad();
    }
}