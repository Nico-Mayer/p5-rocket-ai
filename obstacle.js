function Obstacle(mode, x, y, width, height) {
  this.mode = mode;
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.mouseOver = false;
  this.rezisable = false;
  this.dragabele = false;

  this.checkCollision = function (rocketX, rocketY) {
    var d = dist(rocketX, rocketY, this.x, this.y);
    if (
      this.mode == "RECT" &&
      rocketX > this.x &&
      rocketX < this.x + this.width &&
      rocketY > this.y &&
      rocketY < this.y + this.height
    ) {
      return true;
    } else if (this.mode == "ELLIPSE" && d < this.width / 2) {
      return true;
    }
  };

  this.render = function () {
    push();
    if (!editMode) {
      fill(255);
    } else if (addMode) {
      fill("#58D3F7");
    } else if (editPosMode) {
      fill("#F5A9F2");
    } else if (resizeMode) {
      fill("#F2F5A9");
    }
    if (this.mouseOver) {
      stroke(255, 0, 0);
    }

    if (this.mode == "RECT") {
      rect(this.x, this.y, this.width, this.height);
    } else if (this.mode == "ELLIPSE") {
      ellipse(this.x, this.y, this.width, this.height);
    }

    pop();
  };

  this.checkMouseOver = function () {
    if (
      mouseX > this.x &&
      mouseX < this.x + this.width &&
      mouseY > this.y &&
      mouseY < this.y + this.height
    ) {
      return true;
    }
  };
}
