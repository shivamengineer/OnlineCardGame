function mouseDownEvent(e){
    mouseDownAlways(e);
    if(currentPage == 0){
        mouseDownEventGame(e);
    } else if(currentPage == 2){
        mouseDownMoveBlock(e.clientX, e.clientY);
    }
}

function mouseDownAlways(e){
    mouseDownEventButtons(e);
}

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

function mouseMoveEvent(e){
    if(currentPage == 0){
        mouseMoveEventGame(e);
        if(cardRotating){
            for(const i in frontendCards){
                if(frontendCards[i].rotating){
                    var deltaX = e.clientX - frontendCards[i].startX;
                    var deltaY = e.clientY - frontendCards[i].startY;
                    frontendCards[i].rotation = Math.atan(deltaY / deltaX);
                }
            }
        }
    } else if(currentPage == 2){
        mouseMoveRulesBlock(e);
    }
}

function mouseUpEvent(e){
    if(currentPage == 0){
        mouseUpEventGame(e);
    } else if(currentPage == 2){
        mouseUpRulesBlock(e);
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
        if(frontendCards[i].rotating){
            var mouseX = e.clientX - frontendCards[i].startX;
            var mouseY = e.clientY - frontendCards[i].startY;
            socket.emit('rotateCard', i, mouseX, mouseY);
            frontendCards[i].rotating = false;
        }
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

function mouseDownMoveBlock(mouseX, mouseY){
    if(mouseCollides(mouseX, mouseY, whileBlock)){
        var tempBlock = new Rect(whileBlock.x, whileBlock.y, whileBlock.width, whileBlock.height, whileBlock.color);
        tempBlock.text = whileBlock.text;
        tempBlock.moving = true;
        tempBlock.differenceX = mouseX - tempBlock.x;
        tempBlock.differenceY = mouseY - tempBlock.y;
        codeBlocks.push(tempBlock);
    }
}

function mouseMoveRulesBlock(e){
    for(const i in codeBlocks){
        if(codeBlocks[i].moving){
            var mouseX = e.clientX - codeBlocks[i].differenceX;
            var mouseY = e.clientY - codeBlocks[i].differenceY;
            codeBlocks[i].x = mouseX;
            codeBlocks[i].y = mouseY;
        }
    }
    draw();
}

function mouseUpRulesBlock(e){
    for(const i in codeBlocks){
        if(codeBlocks[i].moving){
            var mouseX = e.clientX - codeBlocks[i].differenceX;
            var mouseY = e.clientY - codeBlocks[i].differenceY;
            codeBlocks[i].x = mouseX;
            codeBlocks[i].y = mouseY;
            codeBlocks[i].moving = false;
        }
    }
    draw();
}