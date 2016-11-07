//Configurable Values
var middle_seperator = '...';

//Re-used variables
var elide_canvas = document.createElement('canvas');
var elide_trackingList = {}

//Code
function elide_init() {
	elide_update();
	window.addEventListener("resize", elide_update);
}

function elide_update() {
	var targets = document.getElementsByClassName("elide")
	for(var i = 0; i < targets.length; i++) {
		if(targets[i].id) {
			if(elide_trackingList.hasOwnProperty(targets[i].id)) {
				elide_elideContainer(elide_trackingList[targets[i].id], targets[i]);
			}
			else {
				elide_trackingList[targets[i].id] = targets[i].innerText;
				elide_elideContainer(targets[i].innerHTML ,targets[i]);
			}
		}
	}
}

function elide_getTextWidth(text, font_style) {
	var context = elide_canvas.getContext('2d');
	context.font = font_style;
	return context.measureText(text).width
}

function elide_fits(text, container) {
	var container_styles = window.getComputedStyle(container, null);
	var font_style = container_styles.getPropertyValue("font-style");
	var font_size = container_styles.getPropertyValue("font-size");
	var font_family = container_styles.getPropertyValue("font-family");
	var font_string = font_style + " " + font_size + " " + font_family;
	var text_width = elide_getTextWidth(text, font_string);
	var container_width = container.offsetWidth;
	if(text_width < container_width)
		return true;
	else
		return false;
}

function elide_elideContainer(text, container) {
	if(elide_fits(text, container)) {
		container.innerText = text;
		return;
	}
	var min = 0;
	var max = text.length;
	var left = '';
	var right = '';
	var bestLength = 0;
	var bestLeft = '';
	var bestRight = '';
	while(min < max) {
		var length = Math.floor((max + min)/2);
		left = text.substr(0, length);
		right = text.substr(-length, length);
		if(elide_fits(left + middle_seperator + right, container)) {
			if(length > bestLength) {
				bestLength = length;
				bestLeft = left;
				bestRight = right;
			}
			min = (Math.floor((max + min)/2)) + 1;
		}
		else {
			max = (Math.floor((max + min)/2)) - 1;
		}
	}
	container.innerText = bestLeft + middle_seperator + bestRight;
}