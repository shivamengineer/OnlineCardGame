//mouse down events
function mouseDownEventGame(e){
    var mouseX = e.clientX;
    var mouseY = e.clientY;

    if(shift){
        mouseDownMove(mouseX, mouseY);
    } else if(alt){
        mouseDownRotate(mouseX, mouseY);
    } else {
        mouseDownTopCard(mouseX, mouseY);
    }
    draw();
}

function mouseDownRotate(mouseX, mouseY){
    for(const i in frontendDecks){
        if(mouseCollidesCard(mouseX, mouseY, frontendDecks[i], img)){
            cardRotating = true;
            frontendDecks[i].rotating = true;
            frontendDecks[i].startX = mouseX;
            frontendDecks[i].startY = mouseY;
        }
    }
}

function mouseDownMove(mouseX, mouseY){
    for(const i in frontendDecks){
        if(mouseCollidesCard(mouseX, mouseY, frontendDecks[i], img)){
            frontendDecks[i].moving = true;
            frontendDecks[i].differenceX = mouseX - frontendDecks[i].x;
            frontendDecks[i].differenceY = mouseY - frontendDecks[i].y;
        }
    }
}

function mouseDownTopCard(mouseX, mouseY){
    for(const i in frontendDecks){
        if(mouseCollidesCard(mouseX, mouseY, frontendDecks[i], img)){
            socket.emit('movetopcard', mouseX, mouseY, i);
        }
    }
}

//mouse move events
function mouseMoveEventGame(e){
    for(const i in frontendDecks){
        if(frontendDecks[i].moving){
            var mouseX = e.clientX - frontendDecks[i].differenceX;
            var mouseY = e.clientY - frontendDecks[i].differenceY;
            socket.emit('mousemove', mouseX, mouseY, i);
        }
    }
    if(cardRotating){
        rotateCard(e);
    }
    draw();
}

function rotateCard(e){
    for(const i in frontendDecks){
        if(frontendDecks[i].rotating){
            var deltaX = e.clientX - frontendDecks[i].startX;
            var deltaY = e.clientY - frontendDecks[i].startY;
            frontendDecks[i].rotation = Math.atan(deltaY / deltaX);
        }
    }
}

//mouse up events
function mouseUpEventGame(e){
    for(const i in frontendDecks){
        if(frontendDecks[i].moving){
            var mouseX = e.clientX - frontendDecks[i].differenceX;
            var mouseY = e.clientY - frontendDecks[i].differenceY;
            socket.emit('mouseup', mouseX, mouseY, i);
            frontendDecks[i].moving = false;
        }
        if(frontendDecks[i].rotating){
            var mouseX = e.clientX - frontendDecks[i].startX;
            var mouseY = e.clientY - frontendDecks[i].startY;
            socket.emit('rotateCard', i, mouseX, mouseY);
            frontendDecks[i].rotating = false;
        }
    }
    draw();
}