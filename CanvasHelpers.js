/*
	Helper methods for drawing objects on a canvas
*/
var CanvasHelpers = {

	//The canvas-object
	ctx: null,

	/*
		Sets the canvas to use from its element-id
	*/
	setCanvas : function(elementId) {
		this.ctx = document.getElementById(elementId).getContext("2d");
	},

	/*
		Sets the width of the canvas 
	*/
	setWidth : function(width) {
		this.ctx.canvas.width = width;
	},

	/* 
		Sets the height of the canvas
	*/	
	setHeight : function(height) {
		this.ctx.canvas.height = height;
	},

	/* 
		Draws a circle.
		If stopColor is supplied, it creates a radial gradient.
	*/
	drawCircle: function (x, y, width, color, stopColor) {
		if (width < 0) width = 0;
		this.ctx.beginPath();
		this.ctx.arc(x, y, width, 0, Math.PI * 2, true);
		this.ctx.closePath();
		if(stopColor) {
			var grd = this.ctx.createRadialGradient(x, y, width, x + width, y + width, Math.floor(width));
			grd.addColorStop(0, color);
			grd.addColorStop(1, stopColor);
			this.ctx.fillStyle = grd;
		} else {
			this.ctx.fillStyle = color;
		}
		
		this.ctx.fill();
	},

	/* 
		Clears the canvas.
	*/
	clear: function () {
		this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
	}
};