class LoopBlock extends StatementBlock {
    constructor(){
        super();
         assert(Scanner.blocks[Scanner.index].type === "LoopBlock");
        Scanner.index++;
        this.condition = new ConditionBlock();
        this.body = new Declaration();
    }

    execute(){

    }
}