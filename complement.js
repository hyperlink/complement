
var complement = (function(){

	var canvas, context

	return {
		getComplementColor: getComplementColor,
		getComplementFromRgb: getComplementFromRgb,
		sampleColor: sampleColor,
		sampleColor2: sampleColor2,
		inverse: inverse
	}

	// http://stackoverflow.com/questions/7260989/how-to-pick-good-contrast-rgb-colors-programmatically
	function getComplementColor(config) {
		var rgb = inverse(sampleColor(config))
		return convertHSL2RGB(flipHue(convertRGB2HSL(rgb)))
	}

	function inverse(rgb) {
		return {
			r: 255-rgb.r,
			g: 255-rgb.g,
			b: 255-rgb.b
		}
	}

	function getComplementFromRgb(rgb) {
		return convertHSL2RGB(flipHue(convertRGB2HSL(rgb)))
	}

	function getImageData(config) {
		var image = config.image

		if (canvas == undefined) {
			canvas = document.createElement("canvas")
			context = canvas.getContext('2d')
		}
		context.drawImage(image, 0, 0)
		return context.getImageData(config.x, config.y, config.width, config.height)
	}


	function sampleColor2(config) {
		var data = getImageData(config)
		try {
			var data = context.getImageData(config.x, config.y, config.width, config.height)
		} catch(e){
			console.error(e) // cross origin issue?
			return
		}
		var blockSize = 10, count = 0, i = -4,
			rgb = {r:0,g:0,b:0},
			length = data.data.length

		while ( (i += blockSize * 4) < length ) {
			++count;
			rgb.r += data.data[i];
			rgb.g += data.data[i+1];
			rgb.b += data.data[i+2];
		}

		if (rgb.r == 0 && rgb.g == 0 && rgb.b == 0) {
			throw Error("sampleColor something's wrong") // this is a bug in Windows Chrome -26.0.1410.43 m
		}

		rgb.r = rgb.r/count;
		rgb.g = rgb.g/count;
		rgb.b = rgb.b/count;
		return rgb;
	}


	function sampleColor(config) {

		var data = getImageData(config)
		var image_data_array = data.data;
		var image_data_array_length = image_data_array.length;

		// Array to hold the average totals
		var a=[0,0,0];

		// Accumulate the pixel colours
		for (var i = 0; i < image_data_array_length; i += 4){
		a[0]+=image_data_array[i];
		a[1]+=image_data_array[i+1];
		a[2]+=image_data_array[i+2];
		}

		// Divide by number total pixels
		a[0] = Math.round(a[0]/=(image_data_array_length/3)); // R
		a[1] = Math.round(a[1]/=(image_data_array_length/3)); // G
		a[2] = Math.round(a[2]/=(image_data_array_length/3)); // B


		return {
			r:a[0],
			g:a[1],
			b:a[2]
		};
	}


	function convertRGB2HSL(rgb) {
		return tinycolor(rgb).toHsl()
	}

	function flipHue(hsl) {

		var h2 = hsl.h/360 + 0.5;

		if (h2 > 1) {
			h2 -= 1;
		}
		return {
			h: h2*360,
			s: hsl.s,
			l: hsl.l
		}
	}

	function convertHSL2RGB(hsl) {
		return tinycolor(hsl).toRgb()
	}
})();
