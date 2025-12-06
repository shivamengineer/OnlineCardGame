class Statement {
    constructor(){
        if(Scanner.blocks[Scanner.index].type == "Loop"){
            this.statement = new LoopBlock();
        } else if(Scanner.blocks[Scanner.index].type == "Expression"){
            this.statement = new Expression();
        }
    }

    execute(){
        this.statement.execute();
    }
}