/*
	Gravity
*/
var Gravity = {
	/* 
		Calculates the force applied to particle A from particle B 
	*/
	getForceBetweenParticles : function(particleA, particleB, g) {
		var distance = particleA.position.distanceTo(particleB.position);
		var m2 = particleB.mass;
		var distSquared = Math.pow(distance, 2);
		var gf =  g * m2;
		gf = gf / (distSquared);
		var direction = particleA.position.getDirectionalVector(particleB.position, distance).normalize();
		return new Vector3(
				direction.x * gf,
				direction.y * gf,
				direction.z * gf
			);
	},

	applyForceBetweenParticles : function(particleA, particleB, g) {
		var gravity = Gravity.getForceBetweenParticles(particleA, particleB, g);
		particleA.velocity = particleA.velocity.add(gravity);
	},

	applyForcesBetweenAllParticles : function(particles, g) {
		for (var i = particles.length - 1; i >= 0; i--) {
			var a = particles[i];
			for (var j = particles.length - 1; j >= 0; j--) {
				var b = particles[j];
				if(i != j) {
					Gravity.applyForceBetweenParticles(a, b, g);
				}
			};
		};

	}
};
