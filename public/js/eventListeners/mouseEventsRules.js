function mouseDownMoveBlock(mouseX, mouseY){
    if(mouseCollides(mouseX, mouseY, whileBlock)){
        var tempBlock = new Rect(whileBlock.x, whileBlock.y, whileBlock.width, whileBlock.height, whileBlock.color);
        tempBlock.text = whileBlock.text;
        tempBlock.moving = true;
        tempBlock.differenceX = mouseX - tempBlock.x;
        tempBlock.differenceY = mouseY - tempBlock.y;
        codeBlocks.push(tempBlock);
    } else if(mouseCollides(mouseX, mouseY, forBlock)){
        var tempBlock = new Rect(forBlock.x, forBlock.y, forBlock.width, forBlock.height, forBlock.color);
        tempBlock.text = forBlock.text;
        tempBlock.moving = true;
        tempBlock.differenceX = mouseX - tempBlock.x;
        tempBlock.differenceY = mouseY - tempBlock.y;
        codeBlocks.push(tempBlock);
    } else {
        for(const i in codeBlocks){
            if(mouseCollides(mouseX, mouseY, codeBlocks[i])){
                codeBlocks[i].moving = true;
                codeBlocks[i].differenceX = mouseX - codeBlocks[i].x;
                codeBlocks[i].differenceY = mouseY - codeBlocks[i].y;
            }
        }
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
            for(const j in codeBlocks){
                if(j != i && objCollidesBelow(codeBlocks[i], codeBlocks[j])){
                    codeBlocks[i].x = codeBlocks[j].x;
                    codeBlocks[i].y = codeBlocks[j].y + codeBlocks[j].height;
                    console.log("collides below");
                }
            }
            if(!collides(codeBlocks[i], createRulesPage)){
                delete codeBlocks[i];
            }
        }
    }
    draw();
}