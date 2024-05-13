class Deck {
    constructor() {
        this.length = 0;
        this.deck = [];
    }
    constructor(cards){
        this.length = cards.length();
        this.deck = cards;
    }

    add(card, pos){
        assert(pos<=this.length, "position is greater than length of deck");
        assert(pos>=0, "position is less than zero");
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

    addToTop(card) {
        this.deck.push(card);
        this.length++;
    }

    add(val, suit, vis, iD, pos){
        assert(pos<=this.length, "position is greater than length of deck");
        assert(pos>=0, "position is less than zero");
        card = new Card(val, suit, vis, iD)
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

    addToTop(card) {
        this.deck.push(new Card(val, suit, vis, iD));
        this.length++;
    }

    removeCard(i) {
        return this.deck.splice(i, i);
    }

    // removeCard(val, suit, iD) {

    // }

    length() {
        return this.length;
    }
}