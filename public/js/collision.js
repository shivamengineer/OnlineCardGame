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
    if(mouseX > card.x - (img.naturalWidth / 2) && mouseX < card.x + (img.naturalWidth / 2) &&
        mouseY > card.y - (img.naturalHeight / 2) && mouseY < card.y + (img.naturalHeight / 2)){
            collides = true;
        }
    return collides;
}