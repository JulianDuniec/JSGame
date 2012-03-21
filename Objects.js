var Particle = Class.extend({
	init : function(options) {
		//The mass of the particle
		this.mass = options.mass || 0;
		//the current velocity of the particle
		this.velocity = options.velocity || new Vector3(0, 0, 0);
		//The position of the particle
		this.position = options.position || new Vector3(0, 0, 0);
	},
	updatePosition : function() {
		this.position = this.position.add(this.velocity);
	}
});

/*
	Represents a spherical object.
*/
var Sphere = Particle.extend({
	init : function(options){
		this.radius = options.radius || 0;
		this.color = options.color || "#FFFFFF";
		this.stopColor = options.stopColor || "#CCCCCC";
		this._super(options);
	},
	collidesWith : function(other) {
		var distance = this.position.distanceTo(other.position);
		return distance <= this.radius + other.radius;
	},
	handleCollision : function(other) {
		var m1 = this.mass;
		var m2 = other.mass;
		var x = this.position.subtract(other.position).normalize();
		var v1 = this.velocity;
		var x1 = x.dot(v1);
		var v1x = x.multiply(x1);
		var v1y = v1.subtract(v1x);

		x = x.multiply(-1);
		var v2 = other.velocity;
		var x2 = x.dot(v2);
		var v2x = x.multiply(x2);
		var v2y = v2.subtract(v2x);

		this.velocity  = v1x.multiply( (m1 - m2)  / (m1 + m2)).add(v2x.multiply( (2 * m2) / (m1 + m2))).add(v1y);
		this.position = this.position.add(this.velocity);
		other.velocity = v1x.multiply( (2 * m1 )  / (m1 + m2)).add(v2x.multiply( (m2 - m1) / (m1 + m2))).add(v2y);
		other.position = other.position.add(other.velocity);
	}
})
