function collides(obj, obj2){
    var collides = false;
    if(obj != null && obj.x + obj.width > obj2.x &&
        obj.x < obj2.x + obj2.width &&
        obj.y + obj.height > obj2.y &&
        obj.y < obj2.y + obj2.height){
            collides = true;
        }
    return collides;
}

function objCollidesBelow(obj, obj2){
    var collides = false;
    if(obj != null && obj.x + obj.width > obj2.x &&
        obj.x < obj2.x + obj2.width &&
        obj.y + obj.height > obj2.y + (obj2.height / 2) &&
        obj.y < obj2.y + obj2.height){
            collides = true;
    }
    return collides;
}

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