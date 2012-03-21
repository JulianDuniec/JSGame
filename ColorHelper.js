
/*
	Singleton class containing methods to generate and calculate colors
*/
var ColorHelper = {
	
	/*
		Returns a reandom-color
	*/
 	rcolor : function() {
		return (function (m, s, c) {
			return (c ? arguments.callee(m, s, c - 1) : '#') +
	  				s[m.floor(m.random() * s.length)]
					})(Math, '0123456789ABCDEF', 5);
	},

	/*
		Returns a luminated (lum == positive) or darkened (lum == negative) version of the same color
	*/
	colorLuminance : function(hex, lum) {
		// validate hex string  
		hex = String(hex).replace(/[^0-9a-f]/gi, '');
		if (hex.length < 6) {
			hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
		}
		lum = lum || 0;
		// convert to decimal and change luminosity  
		var rgb = "#", c, i;
		for (i = 0; i < 3; i++) {
			c = parseInt(hex.substr(i * 2, 2), 16);
			c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
			rgb += ("00" + c).substr(c.length);
		}
		return rgb;
	}
};