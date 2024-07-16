function mouseDownEventMenu(e){
    var mouseX = e.clientX;
    var mouseY = e.clientY;
    if(mouseCollides(mouseX, mouseY, joinGameButton)){
        openKeypad = !openKeypad;
        draw();
    } else if(openKeypad){
        for(i = 0; i < 10; i++){
            if(mouseCollides(mouseX, mouseY, keypad[i])){
                console.log(i);
            }
        }
    }
    
}