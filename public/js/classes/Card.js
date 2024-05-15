class Card {
    constructor(cardValue, cardSuit, visibility, ID, xPos, yPos, rotated){
        this.value = cardValue;
        this.suit = cardSuit;
        this.visible = visibility;
        this.deckID = ID;
        this.x = xPos;
        this.y = yPos;
        this.rotation = rotated;
    }

    changeVisibility(){
        this.visible = !(this.visible);
    }
}