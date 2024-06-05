class Card extends Rect {
    constructor(cardValue, cardSuit, visibility, ID, x, y){
        super();
        this.value = cardValue;
        this.suit = cardSuit;
        this.visible = visibility;
        this.deckID = ID;
        this.moving = false;
        this.rotating = false;
        this.x = x;
        this.y = y;
        this.differenceX = 0;
        this.differenceY = 0;
        this.startX = 0;
        this.startY = 0;
        this.rotation = 0;
    }
    
    equal(c) {
        if(this.value != c.value) {
            return false;
        } else if (this.suit != c.suit) {
            return false;
        } 
        return true;
    }

    renderCard(image){
        ctx2.save();
        // this.rotation * degree * 90
        ctx2.rotate(this.rotation);
        var pos = {};
        pos[0] = (this.x * Math.cos(this.rotation)) + (this.y * Math.sin(this.rotation)) - (image.naturalWidth / 2);
        pos[1] = -(this.x * Math.sin(this.rotation)) + (this.y * Math.cos(this.rotation)) - (image.naturalHeight / 2);
        ctx2.drawImage(image, pos[0], pos[1]);
        ctx2.restore();
    }

    changeVisibility(){
        this.visible = !(this.visible);
    }
}