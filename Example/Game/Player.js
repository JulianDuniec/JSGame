var Player = Sphere.extend({
	
	mouseX : 0,
	mouseY : 0,
	world : null, 
	inControl : true,
	
	init : function(options){
		this.world = options.world;
		this._super(options);
		this.bindEvents();
	},

	update : function() {
		if(!this.inControl)
			return;
		var mouse = new Vector3(this.mouseX, this.mouseY, this.velocity.z);
		var dir = mouse.subtract(this.velocity);
		this.velocity = this.velocity.add(dir);
	},



	looseControl : function() {
		this.inControl = false;
		var elem = this;
		setTimeout(function() {
			elem.inControl = true;
		}, 3000);
	},

	bindEvents : function() {
		var elem = this;
		var width = window.innerWidth / 2;
		var height = window.innerHeight / 2;
		var speed = 10;
		document.onmousemove = function (e) {
			if(!elem.inControl)
				return;
			var newX = (e.pageX - width) / 10;
			
			if(Math.abs(newX) < 10)
				newX = newX / 10;

			elem.mouseX = newX;

			var newY = (e.pageY - height) / 10;
			if(Math.abs(newY) < 10)
				newY = newY / 10;
			elem.mouseY = newY;
		};
		document.onkeydown= function(e) {
			if(!elem.inControl)
				return;

			if(e.keyCode == 87) {
				elem.velocity.z = elem.velocity.z + speed;
			} else if(e.keyCode == 83) {
				elem.velocity.z = elem.velocity.z - (speed * 2);
			}
			else if(e.keyCode == 32) {
				var p = new Bullet({
					mass: 1000,
					radius : 5,
					color : "#FFFFFF",
					stopColor : "#FFFFFF",
					velocity: elem.velocity.multiply(5),
					position: elem.position.add(new Vector3(0,0,elem.radius * 2)).add(elem.velocity)
				});
				p.ignoreGravity = true;
				elem.world.push(p);
			}
		};

	}
});
