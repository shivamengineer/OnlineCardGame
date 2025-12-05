class RepeatUntilBlock extends LoopBlock{
    execute(){
        while(!this.condition.execute()){
            this.loopBody.execute();
        }
    }
}