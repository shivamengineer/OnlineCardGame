class StartSetup {
    constructor(){
        assert(blocks[index].type === "StartSetup");
        Scanner.index++;
        this.declaration = new Declaration();
    }

    execute(){
        this.declaration.execute();
    }
}