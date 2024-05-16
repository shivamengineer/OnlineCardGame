function mouseCollides(mouseX, mouseY, obj){
    var collides = false;
    if(mouseX > obj.x && mouseX < obj.x + obj.width &&
        mouseY > obj.y && mouseY < obj.y + obj.height){
        collides = true;
    }
    return collides;
}

function mouseCollidesCard(mouseX, mouseY, card, img){
    var collides = false;
    if(mouseX > card.x && mouseX < card.x + img.naturalWidth &&
        mouseY > card.y && mouseY < card.y + img.naturalHeight){
            collides = true;
        }
    return collides;
}