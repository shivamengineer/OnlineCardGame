addEventListener('mousedown', (event) => {
    if(!players[socket.id]) return;

    var mouseX = event.clientX;
    var mouseY = event.clientY;
    var card = -1;
    for(const i in cards){
        if(mouseCollidesCard(mouseX, mouseY, cards[i], img)){
            cards[i].rotation++;
        }
    }

    draw();
});

addEventListener('mousemove', (event) => {
    if(!players[socket.id] ) return;

});

addEventListener('mouseup', (event) => {
    if(!players[socket.id]) return;


});