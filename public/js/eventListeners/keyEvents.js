function keyDownEvents(e){
    switch(e.keyCode){
        case 16:
            shift = true;
            break;
        case 18:
            alt = true;
            break;
        case 65:
            img = document.getElementById("5C");
            draw();
            socket.emit('keydown', 65);
            break;
    }
}

function keyUpEvents(e){
    switch(e.keyCode){
        case 16:
            shift = false;
            break;
        case 18:
            alt = false;
            break;
    }
}