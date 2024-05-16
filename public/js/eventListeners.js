addEventListener('mousedown', (event) => {
    if(!players[socket.id]) return;

    var mouseX = event.clientX;
    var mouseY = event.clientY;
    var collides = mouseCollides(mouseX, mouseY, players[socket.id]);
    console.log(collides);

});

addEventListener('mousemove', (event) => {
    if(!players[socket.id]) return;

});

addEventListener('mouseup', (event) => {
    if(!players[socket.id]) return;


});