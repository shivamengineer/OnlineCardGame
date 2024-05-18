class Rect {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.rotation = 0;
    this.color = color;
  }

  render() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  renderText(message){
    ctx.font = "16px serif";
    ctx.strokeText(message, this.x + 2, this.y + 17);
  }
}
