addEventListener('mousedown', (event) => {
    if(!frontendPlayers[socket.id]) return;

    var mouseX = event.clientX;
    var mouseY = event.clientY;
    var card = -1;

    if(cardMenuOpen){
        for(const i in menuOptions){
            if(mouseCollides(mouseX, mouseY, menuOptions[i])){
                console.log("selected option" + i);
                if(i == 0){
                    frontendCards[cardSelected].rotation++;
                } else if(i == 1){
                    frontendCards[cardSelected].rotation--;
                    while(frontendCards[cardSelected].rotation < 0){
                        frontendCards[cardSelected].rotation += 4;
                    }
                }
            }
        }
        cardMenuOpen = false;
    } else {
        for(const i in frontendCards){
            if(mouseCollidesCard(mouseX, mouseY, frontendCards[i], img)){
                if(shift){
                    cardMenuOpen = true;
                    cardSelected = i;
                    for(j = 0; j < 2; j++){
                        menuOptions[j].x = mouseX;
                        menuOptions[j].y = mouseY + (j * 22);
                    }
                } else {
                    frontendCards[i].moving = true;
                    frontendCards[i].differenceX = mouseX - frontendCards[i].x;
                    frontendCards[i].differenceY = mouseY - frontendCards[i].y;
                }
            }
        }
    }

    draw();
});

addEventListener('mousemove', (event) => {
    if(!frontendPlayers[socket.id] ) return;

    for(const i in frontendCards){
        if(frontendCards[i].moving){
            var mouseX = event.clientX - frontendCards[i].differenceX;
            var mouseY = event.clientY - frontendCards[i].differenceY;
            frontendCards[i].x = mouseX;
            frontendCards[i].y = mouseY;
        }
    }

    draw();
});

addEventListener('mouseup', (event) => {
    if(!frontendPlayers[socket.id]) return;

    var mouseX = event.clientX - frontendCards[i].differenceX;
    var mouseY = event.clientY - frontendCards[i].differenceY;

    socket.emit('mouseup', frontendCards, mouseX, mouseY);

    for(const i in frontendCards){
        frontendCards[i].moving = false;
    }

    /*for(const i in frontendCards){
        if(frontendCards[i].moving){
            var mouseX = event.clientX - frontendCards[i].differenceX;
            var mouseY = event.clientY - frontendCards[i].differenceY;
            frontendCards[i].x = mouseX;
            frontendCards[i].y = mouseY;
            frontendCards[i].moving = false;
        }
    }*/

    draw();

});

addEventListener('keydown', (event) => {
    if(!frontendPlayers[socket.id]) return;

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