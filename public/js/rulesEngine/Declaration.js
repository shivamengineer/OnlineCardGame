class Declaration {
    constructor(){
        this.statement = new StatementBlock();
        if(Scanner.blocks[Scanner.index].isDeclaration == true){
            this.declaration = new Declaration();
        }
    }

    execute(){
        this.statement.execute();
        if(this.declaration != null){
            this.declaration.execute();
        }
    }
}