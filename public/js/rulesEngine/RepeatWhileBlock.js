class RepeatWhileBlock extends LoopBlock {
    execute(){
        while(this.condition.execute()){
            this.loopBody.execute();
        }
    }
}