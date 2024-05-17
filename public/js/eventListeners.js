addEventListener('mousedown', (event) => {
    if(!players[socket.id]) return;

    var mouseX = event.clientX;
    var mouseY = event.clientY;
    var card = -1;
    for(const i in cards){
        if(mouseCollidesCard(mouseX, mouseY, cards[i], img)){
            //cards[i].rotation++;
            cards[i].moving = true;
            cards[i].differenceX = mouseX - cards[i].x;
            cards[i].differenceY = mouseY - cards[i].y;
        }
    }

    draw();
});

addEventListener('mousemove', (event) => {
    if(!players[socket.id] ) return;

    for(const i in cards){
        if(cards[i].moving){
            var mouseX = event.clientX - cards[i].differenceX;
            var mouseY = event.clientY - cards[i].differenceY;
            cards[i].x = mouseX;
            cards[i].y = mouseY;
        }
    }

    draw();
});

addEventListener('mouseup', (event) => {
    if(!players[socket.id]) return;

    for(const i in cards){
        if(cards[i].moving){
            var mouseX = event.clientX - cards[i].differenceX;
            var mouseY = event.clientY - cards[i].differenceY;
            cards[i].x = mouseX;
            cards[i].y = mouseY;
            cards[i].moving = false;
        }
    }

    draw();

});