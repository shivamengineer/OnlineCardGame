class BlockVisual {
    rectangle;
    text;
    block;
    next;
    right;

    AddBelow(block){
        if(!blockSets.CanAddBelow(block.type)) return;

        this.next = block;
        this.block.AddNext(block.block);
    }

    AddRight(block){
        if(!blockSets.CanAddRight(block.type)) return;

        this.right = block;
        this.block.AddRight(block.block);
    }
}