class Card {
    constructor(cardValue, cardSuit, visibility, ID){
        this.value = cardValue;
        this.suit = cardSuit;
        this.visible = visibility;
        this.deckID = ID;
    }

    changeVisibility(){
        this.visible = !(this.visible);
    }
}