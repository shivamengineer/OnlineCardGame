function mouseDownEvent(e){
    mouseDownAlways(e);
    if(currentPage == 0){
        mouseDownEventGame(e);
    } else if(currentPage == 1){
        mouseDownEventMenu(e);
    } else if(currentPage == 2){
        mouseDownMoveBlock(e.clientX, e.clientY);
    }
}

function mouseMoveEvent(e){
    if(currentPage == 0){
        mouseMoveEventGame(e);
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