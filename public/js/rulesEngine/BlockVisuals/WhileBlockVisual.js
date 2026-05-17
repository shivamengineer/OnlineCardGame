class WhileBlockVisual extends BlockVisual {
    constructor(){
        this.rectangle = new Rect(100, 80, 80, 30, "red");
        this.text = "while";
        this.condition = null;
    }

    constructor(x, y){
        this.rectangle = new Rect(x, y, 80, 30, "red");
        this.text = "while";
        this.condition = null;
    }
}