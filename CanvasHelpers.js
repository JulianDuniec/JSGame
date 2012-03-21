/*
	Helper methods for drawing objects on a canvas
*/
var CanvasHelpers = {

	ctx: document.getElementById('game-area').getContext("2d"),

	drawCircle: function (x, y, width, color, stopColor) {
		if (width < 0) width = 0;
		this.ctx.beginPath();
		this.ctx.arc(x, y, width, 0, Math.PI * 2, true);
		this.ctx.closePath();
		var grd = this.ctx.createRadialGradient(x, y, width, x + width, y + width, Math.floor(width));
		grd.addColorStop(0, color);
		grd.addColorStop(1, stopColor);
		this.ctx.fillStyle = grd;
		this.ctx.fill();
	},

	clear: function () {
		this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
		this.ctx.canvas.width = window.innerWidth;
		this.ctx.canvas.height = window.innerHeight;
	},

	
};