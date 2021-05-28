function Obstacle(mode, x, y, width, height) {
  this.mode = mode;
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;

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
    fill(255);
    if (this.mode == "RECT") {
      rect(this.x, this.y, this.width, this.height);
    } else if (this.mode == "ELLIPSE") {
      ellipse(this.x, this.y, this.width, this.height);
    }

    pop();
  };
}
