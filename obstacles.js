function createObstacles(w, h) {
	obstacles[0] = new Obstacle(
		'RECT',
		w / 2 - (w * 0.45) / 2,
		h * 0.35,
		w * 0.45,
		35
	)
	obstacles[1] = new Obstacle('RECT', w - 400, h * 0.55, 190, 35)
	obstacles[2] = new Obstacle('RECT', 200, h * 0.25, 270, 35)
	obstacles[3] = new Obstacle('RECT', 900, 50, 30, 190)
	obstacles[4] = new Obstacle('ELLIPSE', w / 2, h * 0.75, 70, 70)
}
