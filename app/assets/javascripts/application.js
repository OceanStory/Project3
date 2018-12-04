// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require activestorage
//= require turbolinks
//= require_tree .

var app = app || {};
var colors = new Array([ 0, 100, 100 ], [ 0, 40, 100 ], [ 0, 35, 100 ], [ 0, 50, 100 ], [ 0, 20, 100 ], [ 0, 12, 0 ]);
var step = 0;
//color table indices for:
// current color left
// next color left
// current color right
// next color right
var colorIndices = [ 0, 1, 2, 3 ];
//transition speed
var gradientSpeed = 0.0;
window.onload = () => {
	$('div#gradient').hide();
	introDialogues();
	// $("div.ocean").hide();
	// $("div#gradient").show();
	// $("div.item").show();
	setTimeout(function() {
		$('div.first').hide();
		$('div#gradient').show();
		scene1();
		// app.testFunction();
		app.dispalyItems();
	}, 12000);
};
function introDialogues() {
	$('div.one').hide();
	$('div.two').hide();
	setTimeout(function() {
		$('#dialogue-1').show('slow');
	}, 2000);
	setTimeout(function() {
		$('#dialogue-1').hide('slow');
		$('#dialogue-2').show('slow');
	}, 4000);
	setTimeout(function() {
		$('#dialogue-2').hide('slow');
		$('#dialogue-3').show('slow');
	}, 6000);
	setTimeout(function() {
		$('#dialogue-3').hide('slow');
		$('#dialogue-4').show('slow');
	}, 8000);
	setTimeout(function() {
		$('#dialogue-4').hide('slow');
	}, 10000);
}

function updateGradient() {
	if ($ === undefined) return;

	var c0_0 = colors[colorIndices[0]];
	var c0_1 = colors[colorIndices[1]];
	var c1_0 = colors[colorIndices[2]];
	var c1_1 = colors[colorIndices[3]];

	var istep = 1 - step;
	var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
	var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
	var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
	var color1 = 'rgb(' + r1 + ',' + g1 + ',' + b1 + ')';

	var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
	var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
	var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
	var color2 = 'rgb(' + r2 + ',' + g2 + ',' + b2 + ')';

	$('#gradient')
		.css({
			background: '-webkit-gradient(linear, left top, right top, from(' + color1 + '), to(' + color2 + '))'
		})
		.css({
			background: '-moz-linear-gradient(left, ' + color1 + ' 0%, ' + color2 + ' 100%)'
		});

	step += gradientSpeed;
	if (step >= 1) {
		step %= 1;
		colorIndices[0] = colorIndices[1];
		colorIndices[2] = colorIndices[3];

		//pick two new target color indices
		//do not pick the same as the current one
		colorIndices[1] = (colorIndices[1] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;
		colorIndices[3] = (colorIndices[3] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;
	}
}

setInterval(updateGradient, 50);

$.fn.animateTo = function(cssProps, time = 100, easing = 'linear') {
	// Save the value of this (this represents the element that the method was called upon)

	const el = this;

	// Create a new Promise instance of Promise. Promises receive an "executor" function (a function that takes time). And the executor function will receive a resolve function (so that .then will be called), and a reject function (so that .catch will be called)

	const p = new Promise(function(resolve, reject) {
		// Select the element, and call the built-in animate method
		// The animate method receives an object of CSS to change, a time to take, an easing function and an on-complete function (called at the end of the animation)
		// We are using resolve to call the .then method

		$(el).animate(cssProps, time, easing, () => {
			resolve($(el));
		});
	});

	// Return the promise, so that we can use .then

	return p;
};

const animateBottle = () => {
	$('#bottle').animateTo({ right: '150px', top: '400px', left: '300px' }, 8000).then(function(el) {
		el.css('opacity', '0');
	});
};

var tl;
function scene1() {
	localStorage.setItem('currentScene', 1);
	animateBottle();
	// $('#bottle').animateTo({ right: '150px', top: '400px', left: '300px' }, 8000).then(function (el) {
	// el.css('transform', 'rotate(20deg)');

	tl = new TimelineLite();
	// Sequence multiple tweens
	//Show item
	//show dialouge
	//last dialouge with button link to post page
	//continue button
	// setTimeout(function s1() {
	tl
		.to($('#d-1'), 1, { autoAlpha: 1, delay: 5 })
		.to($('#d-1'), 1, { autoAlpha: 0 })
		.to($('#d-2'), 1, { autoAlpha: 1 })
		.to($('#d-2'), 1, { autoAlpha: 0 })
		.to($('#d-3'), 1, { autoAlpha: 1 })
		.to($('#d-3'), 1, { autoAlpha: 0 })
		.to($('#d-4'), 1, { autoAlpha: 1 });

	// }, 3000);
	// console.log('Scene 1 starting');
	// window.addEventListener('click', scene2);
	$('#btn').click(function() {
		tl.to($('#d-4'), 1, { autoAlpha: 0 });
		scene2();
	});
}

function scene2() {
	window.removeEventListener('click', scene2);
	localStorage.setItem('currentScene', 2);
	console.log('Scene 2 starting');
	window.addEventListener('click', scene3);
}

function scene3() {
	window.removeEventListener('click', scene3);
	localStorage.setItem('currentScene', 3);
	console.log('Scene 3 starting');
	window.addEventListener('click', scene4);
}

function scene4() {
	window.removeEventListener('click', scene4);
	localStorage.setItem('currentScene', 4);
	console.log('Scene 4 starting');
}

const currentScene = localStorage.getItem('currentScene');

if (currentScene === '2') {
	scene2();
} else if (currentScene === '3') {
	scene3();
} else if (currentScene === '4') {
	scene4();
} else {
	scene1();
}
