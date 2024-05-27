function keyDownEvents(e){
    switch(e.keyCode){
        case 16:
            shift = true;
            break;
        case 65:
            console.log("A2");
            socket.emit('keydown', 65);
            break;
    }
}

function keyUpEvents(e){
    switch(e.keyCode){
        case 16:
            shift = false;
            break;
    }
}