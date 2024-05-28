class Deck{
    constructor() {
        this.length = 0;
        this.deck = [];
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
        assert(this.length > i, "index out of bounds");
        return this.deck.splice(i, i);
        this.length--;
    }

    removeCard(val, suit, vis, iD) {
        c = val, suit, vis, iD;
        assert(this.deck.hasCard(c), "card not in deck");
        i = this.deck.indexOf(val, suit, vis, iD);
        return this.deck.splice(i, 1);
        this.length--;
    }

    length() {
        return this.length;
    }

    seeCard(i) {
        assert(this.length > i, "index out of bounds");
        c = this.deck.removeCard(i);
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




}