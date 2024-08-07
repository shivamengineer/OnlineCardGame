class Card {
    constructor(cardValue, cardSuit, x, y){
        this.value = cardValue;
        this.suit = cardSuit;
        this.visible = [1, 2, 3, 4];
        this.moving = false;
        this.rotating = false;
        this.x = x;
        this.y = y;
        this.rotation = 0;
    }
    
    equal(c) {
        if(this.value != c.value || this.suit != c.suit) {
            return false;
        }
        return true;
    }

}

class Deck {
    constructor(ID) {
        this.length = 0;
        this.deck = {};
        this.dID = ID;
    }

    addCard(card, pos){
        assert(pos<=this.length, "position is greater than length of deck");
        assert(pos>=0, "position is less than zero");
        if(pos == this.length) {
            this.deck.push(card);
        }
        else {
            var c = this.deck.pop();
            this.add(card, pos);
            this.deck.push(c);
        } 
        this.length++;
    }

    addToTop(card) {
        this.deck.push(card);
        this.length++;
    }

    addCardSecondary(val, suit, vis, iD, pos){
        assert(pos<=this.length, "position is greater than length of deck");
        assert(pos>=0, "position is less than zero");
        var card = new Card(val, suit, vis, iD)
        if(pos == this.length) {
            this.deck.push(card);
        }
        else {
            c = this.deck.pop();
            this.add(card, pos);
            this.deck.push(c);
        } 
        this.length++;
    }

    addToTop(val, suit, vis, iD) {
        this.deck.push(new Card(val, suit, vis, iD));
        this.length++;
    }

    removeCardAtIndex(i) {
        assert(this.length > i, "index out of bounds");
        this.length--;
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
    }

    cut(start, end) {
        this.length -= (end - start);
        return this.deck.splice(start, end);
    }

    addDeck(d) {
        d.forEach(item =>{
            this.deck[this.length] = item;
            this.length++
        });
    }

    shuffle() {
        for(i = this.length; i >= 0; i--) {
            r = Math.floor(Math.random() * i);
            c = this.removeCard(r);
            this.addToTop(c);
        }
    }

    clear(){
        while(this.deck.length > 0){
            this.deck.pop();
        }
        this.length = 0;
    }

    createFullDeck(){
        this.clear();
        for(i = 2; i < 11; i++){
            for(j = 0; j < 4; j++){
                var c = new Card(i, j, i * j, 0, 0);
                this.addToTop(c);
            }
        }
    }
}

function addEmptyDeck(allDecks){
    allDecks.push(new Deck(allDecks.length));
}

function addFullDeck(allDecks){
    var d = new Deck(allDecks.length);
    d.createFullDeck();
    allDecks.push(d);
}

function removeDeck(allDecks, deckID){
    for(i = 0; i < allDecks.length; i++){
        var temp = allDecks.shift();
        if(temp.dID > deckID){
            temp.dID--;
        }
        if(i != deckID){
            allDecks.push(temp);
        }
    }
}

function combineDecks(allDecks, deckID1, deckID2){
    allDecks[deckID1].addDeck(allDecks[deckID2]);
    for(i = 0; i < allDecks.length; i++){
        var temp = allDecks.shift();
        if(temp.dID > deckID){
            temp.dID--;
        }
        if(i != deckID){
            allDecks.push(temp);
        }
    }
    allDecks.length--;
}

function startDecks(allDecks){
    for(i = 0; i < 3; i++){
        addFullDeck(allDecks);
    }
}

function endDecks(allDecks){
    while(allDecks.length > 0){
        allDecks.pop();
    }
}

module.exports = {addEmptyDeck, removeDeck, combineDecks, startDecks, endDecks};