function mouseDownEvent(e){
    mouseDownAlways(e);
    if(currentPage == 0){
        mouseDownEventGame(e);
    }
}

function mouseDownEventGame(e){
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

function mouseDownEventButtons(e){
    var mouseX = e.clientX;
    var mouseY = e.clientY;
    if(mouseCollides(mouseX, mouseY, button1Rect)){
        switch(currentPage){
            case 0:
                currentPage = 1;
                button1Rect.text = "Game";
                break;
            case 1:
                currentPage = 0;
                button1Rect.text = "Home Screen";
                break;
            case 2:
                currentPage = 0;
                button1Rect.text = "Home Screen";
                button2Rect.text = "Rules Engine";
                break;
        }
        draw();
    } else if(mouseCollides(mouseX, mouseY, button2Rect)){
        switch(currentPage){
            case 0:
                currentPage = 2;
                button1Rect.text = "Game";
                button2Rect.text = "Home Screen";
                break;
            case 1:
                currentPage = 2;
                button2Rect.text = "Home Screen";
                break;
            case 2:
                currentPage = 1;
                button2Rect.text = "Rules Engine";
                break;
        }
        draw();
    }
}

function mouseDownAlways(e){
    mouseDownEventButtons(e);
}

function mouseMoveEvent(e){
    if(currentPage == 0){
        mouseMoveEventGame(e);
    }
}

function mouseUpEvent(e){
    if(currentPage == 0){
        mouseUpEventGame(e);
    }
}

function mouseMoveEventGame(e){
    for(const i in frontendCards){
        if(frontendCards[i].moving){
            var mouseX = e.clientX - frontendCards[i].differenceX;
            var mouseY = e.clientY - frontendCards[i].differenceY;
            socket.emit('mousemove', mouseX, mouseY, i);
        }
    }
    draw();
}

function mouseUpEventGame(e){
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
            socket.emit('rotateCard', i, cardSelected);
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