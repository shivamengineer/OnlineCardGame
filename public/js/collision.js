function mouseCollides(mouseX, mouseY, obj){
    var collides = false;
    if(mouseX > obj.x && mouseX < obj.x + obj.width &&
        mouseY > obj.y && mouseY < obj.y + obj.height){
        collides = true;
    }
    return collides;
}