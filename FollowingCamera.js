
/* 
	A singleton class that handles user input and
	calculates its affect on different objects
*/
var FollowingCamera = {
	
	init : function(follow) {
		FollowingCamera.follow = follow;
		FollowingCamera.x = 0;
		FollowingCamera.lastX = 0;
		FollowingCamera.y = 0;
		FollowingCamera.lastY = 0;
	},

	update : function() {
		FollowingCamera.x = FollowingCamera.follow.velocity.x;
		FollowingCamera.y = FollowingCamera.follow.velocity.y;
	},


	affectRotation : function(particle) {
			var deltaX = FollowingCamera.lastX - FollowingCamera.x;
			particle.position = particle.position.rotateY((deltaX) * 0.001);
			particle.velocity = particle.velocity.rotateY((deltaX) * 0.001);

			var deltaY = FollowingCamera.lastY - FollowingCamera.y;
			particle.position = particle.position.rotateX((deltaY) * 0.001);
			particle.velocity = particle.velocity.rotateX((deltaY) * 0.001);
	},

	get3dDeltaZ : function(particle) {
		return  particle.position.z - FollowingCamera.follow.position.z - (FollowingCamera.follow.radius * 2);
	},

	get3dDeltaX : function(particle) {
		return particle.position.x - FollowingCamera.follow.position.x;
	},

	get3dDeltaY : function(particle) {
		return particle.position.y - FollowingCamera.follow.position.y;
	}
};