/*
	Represents a three-dimensional vector
	x,y,z are floating point numbers.
*/
var Vector3 = Class.extend({
	init : function(x, y, z) {
		this.x = x;
		this.y = y;
		this.z = z;
	},
	
	magnitude : function() {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	},

	add : function(other) {
		return new Vector3(
			this.x + other.x,
			this.y + other.y,
			this.z + other.z
		);
	},

	subtract : function (other) {
		return new Vector3(
			this.x - other.x,
			this.y - other.y,
			this.z - other.z
		);
	},

	dot : function (other) {
		return this.x * other.x
			+ this.y * other.y
			+ this.z * other.z;
	},

	multiply : function (x) {
		return new Vector3(
			this.x * x,
			this.y * x,
			this.z * x
		);
	},

	divide : function (x) {
		return new Vector3(
			this.x / x,
			this.y / x,
			this.z / x
		);
	},
	
	distanceTo : function(other) {
		return this.subtract(other).magnitude();
	},

	getDirectionalVector : function (other, distance) {
		var x = this.x - other.x;
		var y = this.y - other.y;
		var z = this.z - other.z;
		
		return new Vector3(
			-(x / distance),
			-(y / distance),
			-(z / distance)
		);
	},

	normalize : function () {
		var length = this.magnitude();
		if (length == 0)
			return this;
		return new Vector3(
			this.x / length,
			this.y / length,
			this.z / length
		);
	},

	rotateX : function (angle) {
		var cosRY = Math.cos(angle);
		var sinRY = Math.sin(angle);

		return new Vector3(
				this.x,
				(this.y * cosRY) + (this.z * sinRY),
				(this.y * -sinRY) + (this.z * cosRY)
			);
	},

	rotateY : function (angle) {
		var cosRY = Math.cos(angle);
		var sinRY = Math.sin(angle);

		return new Vector3(
				(this.x * cosRY) + (this.z * sinRY),
				this.y,
				(this.x * -sinRY) + (this.z * cosRY)
			);
	}
});
