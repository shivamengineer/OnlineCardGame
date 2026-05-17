class Block {
    type;
    next;
    right;

    AddNext(block){
        this.next = block;
    }

    AddRight(block){
        this.right = block;
    }
}