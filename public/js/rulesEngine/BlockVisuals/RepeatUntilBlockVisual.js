class RepeatUntilBlockVisual extends BlockVisual {
    constructor(){
        this.rectangle = new Rect(100, 150, 80, 30, "red");
        this.text = "repeat";
        this.condition = null;
    }

    constructor(x, y){
        this.rectangle = new Rect(x, y, 80, 30, "red");
        this.text = "repeat";
        this.condition = null;
    }
}