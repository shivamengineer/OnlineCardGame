var suitValue = ["S", "C", "H", "D"];

class Card {
    constructor(cardValue, cardSuit, x, y){
        this.visible = {};
        this.value = cardValue;
        this.suit = cardSuit;
        this.moving = false;
        this.rotating = false;
        this.x = x;
        this.y = y;
        this.rotation = 0;
    }
    
    equal(c) {
        return this.value == c.value && this.suit == c.suit;
    }

}

class Deck {
    constructor(ID, x, y) {
        this.length = 0;
        this.deck = [];
        this.dID = ID;
        this.topCard = null;
        this.x = x;
        this.y = y;
    }

    addCard(card, pos){
        var tempDeck = [];
        while(this.deck.length > pos){
            tempDeck.push(this.deck.pop());
        }
        this.deck.push(card);
        while(tempDeck.length > 0){
            this.deck.push(tempDeck.pop());
        }
        this.length++;
    }

    addToTop(card) {
        this.deck.push(card);
        this.topCard = card;
        this.length++;
    }

    addCardSecondary(val, suit, pos){
        assert(pos<=this.length, "position is greater than length of deck");
        assert(pos>=0, "position is less than zero");
        var card = new Card(val, suit, 0, 0)
        if(pos == this.length) {
            this.deck.push(card);
        } else {
            c = this.deck.pop();
            this.add(card, pos);
            this.deck.push(c);
        } 
        this.length++;
    }

    addToTopSecondary(val, suit) {
        var c = new Card(val, suit, 0, 0);
        this.deck.push(c);
        this.topCard = c;
        this.length++;
    }

    removeTopCard(){
        this.length--;
        this.topCard = this.deck[this.length - 1];
        return this.deck.pop();
    }

    removeCardAtIndex(i) {
        assert(this.length > i, "index out of bounds");
        this.length--;
        if(i == this.length){
            this.topCard = this.deck[this.length - 1];
        }
        return this.deck.splice(i, i);
    }

    length() {
        return this.length;
    }

    seeCard(i) {
        assert(this.length > i, "index out of bounds");
        var c = this.deck.removeCard(i);
        this.deck.add(c, i);
        return c;
    }

    seeSuit(i) {
        assert(this.length > i, "index out of bounds");
        this.seeCard.suit();
    }

    hasCard(c) {
        for(i = 0; i < this.length; i++) {
            if(this.deck.seeCard(index).equal(c)) {
                return true;
            }
        }
        return false;
    }

    flip() {
        this.deck.reverse();
        this.setTopCard();
    }

    cut(start, end) {
        this.length -= (end - start);
        var cut = this.deck.splice(start, end);
        this.setTopCard();
        return cut;
    }

    addDeck(d) {
        while(d.deck.length > 0) {
            this.deck.push(d.deck.shift());
            this.length++;
            d.length--;
        }
        this.setTopCard();
    }

    shuffle() {
        for(i = this.length; i >= 0; i--) {
            r = Math.floor(Math.random() * i);
            c = this.removeCard(r);
            this.addToTop(c);
        }
        this.setTopCard();
    }

    clear(){
        while(this.deck.length > 0){
            this.deck.pop();
        }
        this.length = 0;
        this.topCard = null;
    }

    createFullDeck(){
        this.clear();
        for(let j = 10; j >= 1; j--){
            for(let k = 0; k < 4; k++){
                var c = new Card(j, k, 0, 0);
                this.addToTop(c);
            }
        }
    }

    setTopCard(){
        this.topCard = this.deck[this.length - 1];
    }
}

function updateDeckID(allDecks){
    if(allDecks.currentID === undefined){
        allDecks.currentID = 0;
    } else {
        allDecks.currentID++;
    }
}

function addEmptyDeck(allDecks, x, y){
    updateDeckID(allDecks);
    allDecks.push(new Deck(allDecks.currentID, x, y));
}

function addFullDeck(allDecks, x, y){
    updateDeckID(allDecks);
    var d = new Deck(allDecks.currentID, x, y);
    d.createFullDeck();
    allDecks.push(d);
}

function removeDeck(allDecks, deckID){
    var removedDeck;
    for(i = 0; i < allDecks.length; i++){
        var temp = allDecks.shift();
        if(temp.dID > deckID){
            temp.dID--;
        }
        if(i != deckID){
            allDecks.push(temp);
        } else {
            removedDeck = temp;
        }
    }
    return removedDeck;
}

function combineDecks(allDecks, i, j){
    allDecks[j].addDeck(allDecks[i]);
    allDecks.splice(i, 1);
}

function startDecks(allDecks){
    for(i = 0; i < 3; i++){
        addFullDeck(allDecks, 50 + (i * 100), 300);
    }
}

function endDecks(allDecks){
    while(allDecks.length > 0){
        allDecks.pop();
    }
}

function moveTopCard(x, y, i, allDecks){
    if(allDecks[i].length == 1){
        return i;
    }
    addEmptyDeck(allDecks, x, y);
    allDecks[allDecks.length - 1].addToTop(allDecks[i].removeTopCard());
    return allDecks.length - 1;
}

module.exports = {addEmptyDeck, removeDeck, combineDecks, startDecks, endDecks, moveTopCard};