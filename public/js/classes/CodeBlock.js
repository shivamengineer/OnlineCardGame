class CodeBlock {
    constructor(rect1){
        this.blocks = [rect1];
        this.height = rect1.height;
        this.x = rect1.x;
        this.y = rect1.y;
    }

    combineBlock(block1){
        var added = false;
        for(i = 0; !added && i < this.blocks.length; i++){
            if(objCollidesBelow(block1.blocks[0], this.blocks[i])){
                var tempBlocks = [];
                while(this.blocks.length > i + 1){
                    tempBlocks.push(this.blocks.pop());
                }
                while(block1.blocks != -null){
                    this.blocks.push(block1.blocks.shift());
                }
                while(tempBlocks != -null){
                    this.blocks.push(tempBlocks.pop()); 
                }
                this.moveWholeBlock(this.blocks[0].x, this.blocks[0].y);
                added = true;
            }
        }
        return added;
    }

    moveWholeBlock(mouseX, mouseY){
        for(i = 0; i < this.blocks.length; i++){
            this.blocks[i].x = mouseX;
            this.blocks[i].y = mouseY + (this.height * i);
        }
    }

    mouseCollidesBlock(mouseX, mouseY){
        var index = -1;
        for(i = 1; i < this.blocks.length; i++){
            if(mouseCollides(mouseX, mouseY, this.blocks[i])){
                index = i;
            }
        }
        return index;
    }

    renderCodeBlock(){
        for(i = 0; i < this.blocks.length; i++){
            this.blocks[i].render();
            this.blocks[i].renderText(this.blocks[i].text);
        }
    }
}