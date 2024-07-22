function mouseDownEventMenu(e){
    var mouseX = e.clientX;
    var mouseY = e.clientY;
    if(mouseCollides(mouseX, mouseY, enterRoomCode)){
        openKeypad = !openKeypad;
        newRoomEntry.text = "";
        draw();
    } else if(openKeypad){
        for(i = 0; i < 10; i++){
            if(mouseCollides(mouseX, mouseY, keypad[i])){
                if(newRoomEntry.text.length < 6){
                    newRoomEntry.text += i;
                }
                if(newRoomEntry.text.length == 6){
                    drawJoinGameButton();
                }
                drawNewRoomBox();
            }
        }
        if(newRoomEntry.text.length == 6 && mouseCollides(mouseX, mouseY, joinGameButton)){
            socket.emit('joinGame', newRoomEntry.text);
            console.log(newRoomEntry.text);
        }
    }
    
}