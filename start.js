canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
surf = canvas.getContext("2d");
surf.lineWidth = 5;
NUMBER_POINTS = NUMBER_POINTS >> 0;
if (NUMBER_POINTS < 1) {
	NUMBER_POINTS = canvas.width * canvas.height / 40000 >> 0;
}
Point = new Array(NUMBER_POINTS);
for (var i = 0; i < NUMBER_POINTS; i++) {
	Point[i] = {};
	Point[i].x = irandom(canvas.width);
	Point[i].y = irandom(canvas.height);
	Point[i].color = color_random();
	Point[i].edges = 0;
}
graph = new Array(NUMBER_POINTS);
for (var i = 0; i < NUMBER_POINTS; i++) {
	graph[i] = new Array(NUMBER_POINTS);
	for (var j = 0; j < NUMBER_POINTS; j++) {
		graph[i][j] = 0;
	}
}
edges = new Array();
num_edges = 0;

create_tree();
draw_tree();
redraw();
