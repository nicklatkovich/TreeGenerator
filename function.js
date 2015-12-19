PI2 = Math.PI * 2;
hex_array = "0123456789ABCDEF";

function irandom(range) {
	return Math.random() * range >> 0;
}

function hex2(dec) {
	var str;
	dec = dec % 256 >> 0;
	str = "" + hex_array[dec / 16 >> 0] + hex_array[dec % 16];
	return str;
}

function color_random() {
	var color = "#", i;
	for (i = 0; i < 3; i++) {
		color += hex2(irandom(256));
	}
	return color;
}

function point_distance(x1, y1, x2, y2) {
	var xx = x1 - x2;
	xx = xx * xx;
	var yy = y1 - y2;
	yy = yy * yy;
	return Math.sqrt(xx + yy);
}

function redraw() {
	for (var i = 0; i < NUMBER_POINTS; i++) {
		drawPoint(Point[i].x, Point[i].y, 10, Point[i].color);
	}
}

function addEdge(a, b) {
	graph[a][b] = true;
	graph[b][a] = true;
	Point[a].edges++;
	Point[b].edges++;
	edges[num_edges] = {};
	edges[num_edges].v1 = a;
	edges[num_edges].v2 = b;
	num_edges++;
}

function create_tree() {
	var temp = new Array(NUMBER_POINTS);
	temp[0] = irandom(NUMBER_POINTS);
	var temp_l = 1;
	for (var t = 1; t < NUMBER_POINTS; t++) {
		min_i = -1;
		min_j = 0;
		min_dist = 0;
		for (i = 0; i < NUMBER_POINTS; i++) {
			if (Point[i].edges == 0) {
				for (j = 0; j < temp_l; j++) {
					if (temp[j] != i) {
						var dist = point_distance(Point[i].x, Point[i].y, Point[temp[j]].x, Point[temp[j]].y);
						if (dist < min_dist || min_i == -1) {
							min_dist = dist;
							min_i = i;
							min_j = temp[j];
						}
					}
				}
			}
		}
		addEdge(min_i, min_j);
		temp[temp_l] = min_i;
		temp_l++;
	}
}

function draw_tree() {
	for (var i = 0; i < num_edges; i++) {
		var v1 = edges[i].v1;
		var v2 = edges[i].v2;
		surf.beginPath();
		surf.moveTo(Point[v1].x, Point[v1].y);
		surf.lineTo(Point[v2].x, Point[v2].y);
		surf.closePath();
		surf.stroke();
	}
}

function drawPoint(x, y, r, c) {
	surf.fillStyle = c;
	surf.strokeStyle = "black";
	surf.beginPath();
	surf.arc(x, y, r, 0, PI2, true);
	surf.closePath();
	surf.fill();
	surf.stroke();
}

function rebuild() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	surf.lineWidth = 5;
	for (var i = 0; i < NUMBER_POINTS; i++) {
		Point[i] = {};
		Point[i].x = irandom(canvas.width);
		Point[i].y = irandom(canvas.height);
		Point[i].color = color_random();
		Point[i].edges = 0;
	}
	for (var i = 0; i < NUMBER_POINTS; i++) {
		for (var j = 0; j < NUMBER_POINTS; j++) {
			graph[i][j] = 0;
		}
	}
	num_edges = 0;
	create_tree();
	surf.clearRect(0, 0, canvas.width, canvas.height);
	draw_tree();
	redraw();
}