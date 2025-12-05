class GotoBlock {
    constructor(continueBlock){
        this.continueBlock = continueBlock;
    }

    execute(){
        this.continueBlock.execute();
    }
}