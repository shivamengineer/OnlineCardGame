class Deck extends Card {
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

    addToTop(val, suit, vis, iD) {
        this.deck.push(new Card(val, suit, vis, iD));
        this.length++;
    }

    removeCard(i) {
        return this.deck.splice(i, i);
    }

    removeCard(val, suit, vis, iD) {
        i = this.deck.indexOf(val, suit, vis, iD);
        return this.deck.splice(i, 1);
    }

    length() {
        return this.length;
    }

    index(card) {
        return this.deck.indexOf(card);
    }

    seeCard(i) {
        c = this.deck.removeCard(i);
        this.deck.add(c, i);
        return c;
    }

    hasCard(c) {
        this.deck.forEach((item, index) =>{
            if(this.deck.seeCard(index).equals(c)) {
                return true;
            }
        });
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



}