class CodeBlock {
    constructor(rect1){
        this.start = rect1;
        this.start.next = null;
    }

    addBlock(newRect){
        this.start.next = newRect;
        newRect.next = null;
    }

    renderCodeBlock(){
        var temp = this.start;
        while(temp.next != null){
            temp.render();
            temp.renderText(temp.message);
            temp = temp.next;
        }
    }
}