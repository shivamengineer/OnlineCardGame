function mouseDownMoveBlock(mouseX, mouseY){
    for(const i in createBlocks){
        if(mouseCollides(mouseX, mouseY, createBlocks[i])){
            var tempRect = new Rect(createBlocks[i].x, createBlocks[i].y, createBlocks[i].width, createBlocks[i].height, createBlocks[i].color);
            tempRect.text = createBlocks[i].text;
            var tempBlock = new CodeBlock(tempRect);
            tempBlock.moving = true;
            tempBlock.differenceX = mouseX - tempRect.x;
            tempBlock.differenceY = mouseY - tempRect.y;
            allBlocks.push(tempBlock);
        }
    }
    for(const i in createBreakContinueBlocks){
        if(mouseCollides(mouseX, mouseY, createBreakContinueBlocks[i])){
            var tempBreakRect = new Rect(breakRect.x, breakRect.y, breakRect.width, breakRect.height, breakRect.color);
            tempBreakRect.text = breakRect.text;
            var tempContinueRect = new Rect(continueRect.x, continueRect.y, continueRect.width, continueRect.height, continueRect.color);
            tempContinueRect.text = continueRect.text;
            var tempBlock = new CodeBlock(tempBreakRect);
            tempBlock.blocks.push(tempContinueRect);
            tempBlock.moving = true;
            tempBlock.differenceX = mouseX - createBreakContinueBlocks[i].x;
            tempBlock.differenceY = mouseY - createBreakContinueBlocks[i].y;
            allBlocks.push(tempBlock);
        }
    }
    for(const i in allBlocks){
        if(allBlocks[i].mouseCollidesBlock(mouseX, mouseY)){
            allBlocks[i].moving = true;
            allBlocks[i].differenceX = mouseX - allBlocks[i].x;
            allBlocks[i].differenceY = mouseY - allBlocks[i].y;
        }
    }
}

function mouseMoveRulesBlock(e){
    for(const i in allBlocks){
        if(allBlocks[i].moving){
            var mouseX = e.clientX - allBlocks[i].differenceX;
            var mouseY = e.clientY - allBlocks[i].differenceY;
            allBlocks[i].moveWholeBlock(mouseX, mouseY);
        }
    }
    draw();
}

function mouseUpRulesBlock(e){
    for(const i in allBlocks){
        if(allBlocks[i].moving){
            var mouseX = e.clientX - allBlocks[i].differenceX;
            var mouseY = e.clientY - allBlocks[i].differenceY;
            allBlocks[i].moveWholeBlock(mouseX, mouseY);
            allBlocks[i].moving = false;
            var added = false;
            for(const j in immovableBlocks){
                if(immovableBlocks[j].combineBlock(allBlocks[i])){
                    added = true;
                }
            }
            if(!added){
                for(const j in allBlocks){
                    if(i != j){
                        allBlocks[j].combineBlock(allBlocks[i]);
                    }
                }
            }
            if(added){
                delete allBlocks[i];
            }
            if(!collides(allBlocks[i].blocks[0], createRulesPage)){
                delete(allBlocks[i]);
            }
        }
    }
    draw();
}