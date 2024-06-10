class CodeBlock {
    constructor(rect1){
        this.blocks = [rect1];
        this.height = rect1.height;
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
                    block1.blocks[0].x = this.blocks[0].x;
                    block1.blocks[0].y = this.blocks[0].y + (this.height * this.blocks.length);
                    this.blocks.push(block1.blocks.shift());
                }
                while(tempBlocks != -null){
                    this.blocks.push(tempBlocks.pop()); 
                }
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
        var collides = false;
        for(i = 0; i < this.blocks.length; i++){
            if(mouseCollides(mouseX, mouseY, this.blocks[i])){
                this.x = this.blocks[i].x;
                this.y = this.blocks[i].y;
                collides = true;
            }
        }
        return collides;
    }

    renderCodeBlock(){
        for(i = 0; i < this.blocks.length; i++){
            this.blocks[i].render();
            this.blocks[i].renderText(this.blocks[i].text);
        }
    }
}