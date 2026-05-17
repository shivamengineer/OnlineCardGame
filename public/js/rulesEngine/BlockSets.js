class BlockSets {
    HasRight = new Set();
    NotHasBelow = new Set();

    constructor(){
        this.InitializeSets();
    }

    InitializeSets(){
        this.InitializeRight();
        this.InitializeNotBelow();
    }

    InitializeRight(){
        this.HasRight.add(BlockTypes.REPEAT_UNTIL);
        this.HasRight.add(BlockTypes.REPEAT_WHILE);
        this.HasRight.add(BlockTypes.VARIABLE);
        this.HasRight.add(BlockTypes.AND);
        this.HasRight.add(BlockTypes.OR);
        this.HasRight.add(BlockTypes.XOR);
        this.HasRight.add(BlockTypes.NOT);
    }

    InitializeNotBelow(){
        this.NotHasBelow.add(BlockTypes.GOTO);
    }

    CanAddRight(type){
        return this.HasRight.has(type);
    }

    CanAddBelow(type){
        return !this.NotHasBelow.has(type);
    }
}