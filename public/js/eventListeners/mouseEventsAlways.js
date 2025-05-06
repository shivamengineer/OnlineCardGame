function mouseDownAlways(e){
    mouseDownEventButtons(e);
}

function mouseDownEventButtons(e){
    var mouseX = e.clientX;
    var mouseY = e.clientY;
    if(mouseCollides(mouseX, mouseY, button1Rect)){
        switch(currentPage){
            case 0:
                currentPage = 1;
                button1Rect.text = "Game";
                button2Rect.text = "Rules Engine";
                break;
            case 1:
                currentPage = 0;
                button1Rect.text = "Home Screen";
                button2Rect.text = "Rules Engine";
                break;
            case 2:
                currentPage = 0;
                button1Rect.text = "Game";
                button2Rect.text = "Home Screen";
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
                button1Rect.text = "Game";
                button2Rect.text = "Home Screen";
                break;
            case 2:
                currentPage = 1;
                button1Rect.text = "Game";
                button2Rect.text = "Rules Engine";
                break;
        }
        draw();
    }
}