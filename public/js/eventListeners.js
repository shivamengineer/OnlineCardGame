addEventListener('mousedown', (event) => {
    if(!frontendPlayers[socket.id]) return;
    mouseDownEvent(event);
});

addEventListener('mousemove', (event) => {
    if(!frontendPlayers[socket.id] ) return;
    mouseMoveEvent(event);
});

addEventListener('mouseup', (event) => {
    if(!frontendPlayers[socket.id]) return;
    mouseUpEvent(event);
});

addEventListener('keydown', (event) => {
    if(!frontendPlayers[socket.id]) return;
    keyDownEvents(event);
});

addEventListener('keyup', (event) => {
    if(!frontendPlayers[socket.id]) return;
    keyUpEvents(event);
});