function Target(x, y, size) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.mouseOver = false;
  this.dragabele = false;

  this.render = function () {
    push();
    fill("#4c4cff");
    if (this.mouseOver) {
      stroke(255, 0, 0);
    } else {
      noStroke();
    }
    ellipse(this.x, this.y, this.size, this.size);
    fill("#FF4C4C");
    ellipse(this.x, this.y, 45, 45);
    fill("#FFFF7F");
    ellipse(this.x, this.y, 25, 25);
    pop();
  };

  this.checkMouseOver = function () {
    var d = dist(this.x, this.y, mouseX, mouseY);
    if (d < size) {
      this.mouseOver = true;
      console.log("mouse over target");
    } else {
      this.mouseOver = false;
    }
  };
}
