function createObstacles() {
  obstacles[0] = new Obstacle(
    "RECT",
    windowWidth / 2 - (windowWidth * 0.45) / 2,
    windowHeight * 0.35,
    windowWidth * 0.45,
    35
  );
  obstacles[1] = new Obstacle(
    "RECT",
    windowWidth - 400,
    windowHeight * 0.55,
    190,
    35
  );
  obstacles[2] = new Obstacle("RECT", 200, windowHeight * 0.25, 270, 35);
  obstacles[3] = new Obstacle("RECT", 900, 50, 30, 190);
  obstacles[4] = new Obstacle(
    "ELLIPSE",
    windowWidth / 2,
    windowHeight * 0.75,
    70,
    70
  );

  /* obstacles[0] = new Obstacle(
      "RECT",
      0,
      windowHeight * 0.65,
      windowWidth - 400,
      35
    );
    obstacles[1] = new Obstacle(
      "RECT",
      0 + 400,
      windowHeight * 0.35,
      windowWidth - 400,
      35
    ); */
}
