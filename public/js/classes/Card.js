class Card {
    constructor(value, suit, visibile, deckID){
        this.value = value;
        this.suit = suit;
        this.visible = visible;
        this.deckID = deckID;
    }

    changeVisibility(){
        this.visible = !(this.visible);
    }
}