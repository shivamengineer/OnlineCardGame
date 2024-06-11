function mouseDownMoveBlock(mouseX, mouseY){
    if(mouseCollides(mouseX, mouseY, whileBlock)){
        var tempRect = new Rect(whileBlock.x, whileBlock.y, whileBlock.width, whileBlock.height, whileBlock.color);
        tempRect.text = whileBlock.text;
        var tempBlock = new CodeBlock(tempRect);
        tempBlock.moving = true;
        tempBlock.differenceX = mouseX - tempRect.x;
        tempBlock.differenceY = mouseY - tempRect.y;
        allBlocks.push(tempBlock);
    } else if(mouseCollides(mouseX, mouseY, forBlock)){
        var tempRect = new Rect(forBlock.x, forBlock.y, forBlock.width, forBlock.height, forBlock.color);
        tempRect.text = forBlock.text;
        var tempBlock = new CodeBlock(tempRect);
        tempBlock.moving = true;
        tempBlock.differenceX = mouseX - tempRect.x;
        tempBlock.differenceY = mouseY - tempRect.y;
        allBlocks.push(tempBlock);
    } else {
        for(const i in allBlocks){
            if(allBlocks[i].mouseCollidesBlock(mouseX, mouseY)){
                allBlocks[i].moving = true;
                allBlocks[i].differenceX = mouseX - allBlocks[i].x;
                allBlocks[i].differenceY = mouseY - allBlocks[i].y;
            }
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
        }
    }
    draw();
}