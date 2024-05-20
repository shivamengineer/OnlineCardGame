addEventListener('mousedown', (event) => {
    if(!players[socket.id]) return;

    var mouseX = event.clientX;
    var mouseY = event.clientY;
    var card = -1;

    if(cardMenuOpen){
        for(const i in menuOptions){
            if(mouseCollides(mouseX, mouseY, menuOptions[i])){
                console.log("selected option" + i);
                if(i == 0){
                    cards[cardSelected].rotation++
                } else if(i == 1){
                    cards[cardSelected].rotation--;
                }
            }
        }
        cardMenuOpen = false;
    } else {
        for(const i in cards){
            if(mouseCollidesCard(mouseX, mouseY, cards[i], img)){
                if(shift){
                    cardMenuOpen = true;
                    cardSelected = i;
                    for(j = 0; j < 2; j++){
                        menuOptions[j].x = mouseX;
                        menuOptions[j].y = mouseY + (j * 22);
                    }
                } else {
                    cards[i].moving = true;
                    cards[i].differenceX = mouseX - cards[i].x;
                    cards[i].differenceY = mouseY - cards[i].y;
                }
            }
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

addEventListener('keydown', (event) => {
    if(!players[socket.id]) return;

    switch(event.keyCode){
        case 16:
            shift = true;
            break;
        case 65:
            console.log("A2");
            socket.emit('keydown', 65);
            break;
    }
});

addEventListener('keyup', (event) => {
    switch(event.keyCode){
        case 16:
            shift = false;
            break;
    }
});