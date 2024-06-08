//mouse down events
function mouseDownEventGame(e){
    var mouseX = e.clientX;
    var mouseY = e.clientY;

    if(shift){
        mouseDownRotate(mouseX, mouseY);
    } else {
        mouseDownMove(mouseX, mouseY);
    }

    draw();
}

function mouseDownRotate(mouseX, mouseY){
    for(const i in frontendCards){
        if(mouseCollidesCard(mouseX, mouseY, frontendCards[i], img)){
            cardRotating = true;
            frontendCards[i].rotating = true;
            frontendCards[i].startX = mouseX;
            frontendCards[i].startY = mouseY;
        }
    }
}

function mouseDownMove(mouseX, mouseY){
    for(const i in frontendCards){
        if(mouseCollidesCard(mouseX, mouseY, frontendCards[i], img)){
            frontendCards[i].moving = true;
            frontendCards[i].differenceX = mouseX - frontendCards[i].x;
            frontendCards[i].differenceY = mouseY - frontendCards[i].y;
        }
    }
}

//mouse move events
function mouseMoveEventGame(e){
    for(const i in frontendCards){
        if(frontendCards[i].moving){
            var mouseX = e.clientX - frontendCards[i].differenceX;
            var mouseY = e.clientY - frontendCards[i].differenceY;
            socket.emit('mousemove', mouseX, mouseY, i);
        }
    }
    if(cardRotating){
        rotateCard(e);
    }
    draw();
}

function rotateCard(e){
    for(const i in frontendCards){
        if(frontendCards[i].rotating){
            var deltaX = e.clientX - frontendCards[i].startX;
            var deltaY = e.clientY - frontendCards[i].startY;
            frontendCards[i].rotation = Math.atan(deltaY / deltaX);
        }
    }
}

//mouse up events
function mouseUpEventGame(e){
    for(const i in frontendCards){
        if(frontendCards[i].moving){
            var mouseX = e.clientX - frontendCards[i].differenceX;
            var mouseY = e.clientY - frontendCards[i].differenceY;
            socket.emit('mouseup', mouseX, mouseY, i);
            frontendCards[i].moving = false;
        }
        if(frontendCards[i].rotating){
            var mouseX = e.clientX - frontendCards[i].startX;
            var mouseY = e.clientY - frontendCards[i].startY;
            socket.emit('rotateCard', i, mouseX, mouseY);
            frontendCards[i].rotating = false;
        }
    }
    draw();
}