

var o = [];
for (var i = 0; i < 100; i++) {
	var m = Math.random() * (10000) + 5000;
	var x = 300 + Math.random() * 100000 - 50000;
	var y = 200 + Math.random() * 100000 - 50000;
	var z = 1000 + (100000 * Math.random() - 50000);


	var vx = Math.random() * 10;
	var vy = Math.random() * 10;
	var vz = Math.random() * 10;
	var color = ColorHelper.rcolor();
	var stopcolor = ColorHelper.colorLuminance(color, -0.9);
	var p = new Sphere({
		mass: m,
		radius : m / 15,
		color : color,
		stopColor : stopcolor,
		velocity: new Vector3(0, 0, 0),
		position: new Vector3(x, y, z)
	});
	o.push(p);
}

var playerMass = 600;
var ball = new Player({
	mass: playerMass,
	color : "#FFFFFF",
	stopColor : stopcolor,
	velocity: new Vector3(0, 0, 5),
	position: new Vector3(1, 100, 10),
	radius : 600,
	world : o
});
ball.ignoreGravity = true;
o.push(ball);
CanvasHelpers.setCanvas('game-area');
CanvasHelpers.setWidth(window.innerWidth);
CanvasHelpers.setHeight(window.innerHeight);
FollowingCamera.init(ball);
setTimeout(loop, 50);

function loop() {
	CanvasHelpers.clear();
	FollowingCamera.update();
	ball.update();
	for (var i = o.length - 1; i >= 0; i--) {
		var a = o[i];

		FollowingCamera.affectRotation(a);
		for (var j = o.length - 1; j >= 0; j--) {
			var b = o[j];
			if(i != j) {
				if(a.collidesWith(b) && i != j) {
					a.handleCollision(b);
					if(a instanceof Player) {
						a.looseControl();
					}
					else if(b instanceof Player) {
						b.looseControl();
					}
				} else {
					if(!a.ignoreGravity)
						Gravity.applyForceBetweenParticles(a, b, 50.22);
				}
 			}
		};
		a.updatePosition();
		
	};
	drawAll(o);
	setTimeout(loop, 20);
}

function drawAll(o) {
	var sort = function (a, b) {
		return (a.position.z - b.position.z);
	};	
	o.sort(sort);
	for (var i = o.length - 1; i >= 0; i--) {
		draw(o[i]);
	};
}
var currentZoffset = ball.radius * 10;
function draw(a) {
	x3d = FollowingCamera.get3dDeltaX(a);
	y3d = FollowingCamera.get3dDeltaY(a);
	z3d = FollowingCamera.get3dDeltaZ(a) + currentZoffset;
	if(!ball.inControl) {
		currentZoffset =  ball.radius * 10
	}
	if(currentZoffset > 0) {
		currentZoffset -=2;
		if(currentZoffset < 0) currentZoffset = 0;
	}
	var fov = 650;
	var scale = fov / (fov + z3d);
	var x2d = (x3d * scale) + window.innerWidth / 2;
	var y2d = (y3d * scale) + window.innerHeight / 2;
	if (scale > 0) {
		CanvasHelpers.drawCircle(x2d - scale, y2d - scale, scale * a.radius, a.color, a.stopColor);
	}
}
