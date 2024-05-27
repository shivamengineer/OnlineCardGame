function mouseDownEvent(frontendCards, e){
    var mouseX = e.clientX;
    var mouseY = e.clientY;

    if(cardMenuOpen){
        useMenu(mouseX, mouseY);
        cardMenuOpen = false;
    } else {
        selectCardOrMenu(mouseX, mouseY);
    }

    draw();
}

function mouseMoveEvent(e){
    for(const i in frontendCards){
        if(frontendCards[i].moving){
            var mouseX = e.clientX - frontendCards[i].differenceX;
            var mouseY = e.clientY - frontendCards[i].differenceY;
            socket.emit('mousemove', mouseX, mouseY, i);
        }
    }
    draw();
}

function mouseUpEvent(e){
    for(const i in frontendCards){
        if(frontendCards[i].moving){
            var mouseX = e.clientX - frontendCards[i].differenceX;
            var mouseY = e.clientY - frontendCards[i].differenceY;
            socket.emit('mouseup', mouseX, mouseY, i);
            frontendCards[i].moving = false;
        }
    }

    draw();
}

function useMenu(mouseX, mouseY){
    for(const i in menuOptions){
        if(mouseCollides(mouseX, mouseY, menuOptions[i])){
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
}

function selectCardOrMenu(mouseX, mouseY){
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