function mouseDownMoveBlock(mouseX, mouseY){
    createBlocksFromRect(mouseX, mouseY);
    moveBlock(mouseX, mouseY);
    moveFromImmovableBlock(mouseX, mouseY);
}

function mouseMoveRulesBlock(e){
    keepMovingBlock(e);
    draw();
}

function mouseUpRulesBlock(e){
    stopMovingBlock(e);
    draw();
}

function createBlocksFromRect(mouseX, mouseY){
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
            tempBreakRect.gotoType = true;
            tempBreakRect.count = gotoBlocksCount;
            var tempContinueRect = new Rect(continueRect.x, continueRect.y, continueRect.width, continueRect.height, continueRect.color);
            tempContinueRect.text = continueRect.text;
            tempContinueRect.gotoType = true;
            tempContinueRect.count = gotoBlocksCount;
            gotoBlocksCount++;
            var tempBlock = new CodeBlock(tempBreakRect);
            tempBlock.blocks.push(tempContinueRect);
            tempBlock.moving = true;
            tempBlock.differenceX = mouseX - createBreakContinueBlocks[i].x;
            tempBlock.differenceY = mouseY - createBreakContinueBlocks[i].y;
            allBlocks.push(tempBlock);
        }
    }
}

function moveBlock(mouseX, mouseY){
    for(const i in allBlocks){
        if(mouseCollides(mouseX, mouseY, allBlocks[i].blocks[0])){
            allBlocks[i].moving = true;
            allBlocks[i].differenceX = mouseX - allBlocks[i].blocks[0].x;
            allBlocks[i].differenceY = mouseY - allBlocks[i].blocks[0].y;
        } else if(allBlocks[i].blocks.length > 1){
            var index = allBlocks[i].mouseCollidesBlock(mouseX, mouseY);
            if(index != -1){
                var temp = [];
                while(allBlocks[i].blocks.length > index + 1){
                    temp.push(allBlocks[i].blocks.pop());
                }
                var tempBlock = new CodeBlock(allBlocks[i].blocks.pop());
                while(temp != -null){
                    tempBlock.blocks.push(temp.pop());
                }
                tempBlock.moving = true;
                tempBlock.differenceX = mouseX - tempBlock.x;
                tempBlock.differenceY = mouseY - tempBlock.y;
                allBlocks.push(tempBlock);
            }
        }
    }
}

function moveFromImmovableBlock(mouseX, mouseY){
    for(const i in immovableBlocks){
        if(immovableBlocks[i].blocks.length > 1){
            var index = immovableBlocks[i].mouseCollidesBlock(mouseX, mouseY);
            if(index != -1){
                var temp = [];
                while(immovableBlocks[i].blocks.length > index + 1){
                    temp.push(immovableBlocks[i].blocks.pop());
                }
                var tempBlock = new CodeBlock(immovableBlocks[i].blocks.pop());
                while(temp != -null){
                    tempBlock.blocks.push(temp.pop());
                }
                tempBlock.moving = true;
                tempBlock.differenceX = mouseX - tempBlock.x;
                tempBlock.differenceY = mouseY - tempBlock.y;
                allBlocks.push(tempBlock);
            }
        }
    }
}

function keepMovingBlock(e){
    for(const i in allBlocks){
        if(allBlocks[i].moving){
            var mouseX = e.clientX - allBlocks[i].differenceX;
            var mouseY = e.clientY - allBlocks[i].differenceY;
            allBlocks[i].moveWholeBlock(mouseX, mouseY);
        }
    }
}

function stopMovingBlock(e){
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
                        if(allBlocks[j].combineBlock(allBlocks[i])){
                            added = true;
                        }
                    }
                }
            }
            if(added || !collides(allBlocks[i].blocks[0], createRulesPage)){
                var temp = [];
                while(allBlocks.length > i + 1){
                    temp.push(allBlocks.pop());
                }
                var temp2 = allBlocks.pop();
                while(temp != -null){
                    allBlocks.push(temp.pop());
                }
                
                for(j = 0; j < temp2.blocks.length; j++){
                    if(temp2.blocks[j].gotoType){
                        console.log(temp2.blocks[j].count);
                        if(removedGotoSet.has(temp2.blocks[j].count)){
                            removedGotoSet.delete(temp2.blocks[j].count);
                        } else {
                            removedGotoSet.add(temp2.blocks[j].count);
                        }
                    }
                }
                removeGotoBlocks(removedGotoSet);
            }
        }
    }
}

function removeGotoBlocks(removeSet){
    var toRemove = [];
    for(const i in allBlocks){
        for(j = 0; j < allBlocks[i].blocks.length; j++){
            if(removeSet.has(allBlocks[i].blocks[j].count)){
                toRemove.push([i, j])
                removeSet.delete(allBlocks[i].blocks[j].count);
            }
        }
    }
    for(i = 0; i < toRemove.length; i++){
        var temp = [];
        while(allBlocks[toRemove[i][0]].blocks.length > toRemove[i][1] + 1){
            temp.push(allBlocks[toRemove[i][0]].blocks.pop());
        }
        allBlocks[toRemove[i][0]].blocks.pop();
        while(temp != -null){
            allBlocks[toRemove[i][0]].blocks.push(temp.pop());
        }
        if(allBlocks[toRemove[i][0]].blocks.length == 0){
            var temp2 = [];
            while(allBlocks.length > toRemove[i][0] + 1){
                temp2.push(allBlocks.pop());
            }
            allBlocks.pop();
            while(temp2 != -null){
                allBlocks.push(temp2.pop());
            }
        }
    }
}