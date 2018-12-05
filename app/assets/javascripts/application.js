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

const DEBUG = false;
if (DEBUG) {
  localStorage.clear();
}

var app = app || {};
var colors = new Array(
  [0, 100, 100],
  [0, 40, 100],
  [0, 35, 100],
  [0, 50, 100],
  [0, 20, 100],
  [0, 12, 0]
);
var step = 0;
//color table indices for:
// current color left
// next color left
// current color right
// next color right
var colorIndices = [0, 1, 2, 3];
//transition speed
var gradientSpeed = 0.0;

function start() {
  $("div#gradient").hide();
  const currentScene = localStorage.getItem("currentScene");
  let time = 0;
  if (currentScene === "1" || !currentScene) {
    time = 11000;
    introDialogues();
  }
  //  these comments
  //  $("div.ocean").hide();
  // $("div#gradient").show();
  //  $("div.item").show();
  //  these end
  setTimeout(function() {
    $("div.first").hide();
    $("div#gradient").show();
    // debugger;
    if (currentScene === "2") {
      scene2();
    } else if (currentScene === "3") {
      scene3();
    } else if (currentScene === "4") {
      scene4();
    } else if (currentScene === "5") {
      scene5();
    } else {
      scene1();
    }
    // app.dispalyItems();
  }, time);
  // const currentScene = localStorage.getItem("currentScene");
}

// window.onload = start;
// window.addEventListener("turbolinks:load", start);
$(document).on("turbolinks:load", start);
// <<this we don't want => app.testFunction();

function introDialogues() {
  $("div.one").hide();
  $("div.two").hide();
  setTimeout(function() {
    $("#dialogue-1").show("slow");
  }, 2000);

  setTimeout(function() {
    $("#dialogue-1").hide("slow");
    $("#dialogue-2").show("slow");
  }, 4000);
  setTimeout(function() {
    $("#dialogue-2").hide("slow");
    $("#dialogue-3").show("slow");
  }, 6000);
  setTimeout(function() {
    $("#dialogue-3").hide("slow");
    $("#dialogue-4").show("slow");
  }, 8000);
  setTimeout(function() {
    $("#dialogue-4").hide("slow");
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
  var color1 = "rgb(" + r1 + "," + g1 + "," + b1 + ")";

  var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
  var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
  var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
  var color2 = "rgb(" + r2 + "," + g2 + "," + b2 + ")";

  $("#gradient")
    .css({
      background:
        "-webkit-gradient(linear, left top, right top, from(" +
        color1 +
        "), to(" +
        color2 +
        "))"
    })
    .css({
      background:
        "-moz-linear-gradient(left, " + color1 + " 0%, " + color2 + " 100%)"
    });

  step += gradientSpeed;
  if (step >= 1) {
    step %= 1;
    colorIndices[0] = colorIndices[1];
    colorIndices[2] = colorIndices[3];

    //pick two new target color indices
    //do not pick the same as the current one
    colorIndices[1] =
      (colorIndices[1] + Math.floor(1 + Math.random() * (colors.length - 1))) %
      colors.length;
    colorIndices[3] =
      (colorIndices[3] + Math.floor(1 + Math.random() * (colors.length - 1))) %
      colors.length;
  }
}

// setInterval(updateGradient, 50);

$.fn.animateTo = function(cssProps, time = 100, easing = "linear") {
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
const animateCharacters = (time = 1000) => {
  $(".dive").animateTo({ right: "150px", top: "150px", left: "50px" }, time);
};

const animateBottle = (time = 10000) => {
  console.log("I'm a bottle");
  $("#bottle")
    .animateTo({ right: "150px", top: "400px", left: "300px" }, time)
    .then(function(el) {
      el.css("opacity", "0");
    });
};

var tl;

function scene1() {
  console.log("SCENE 1");
  animateCharacters();
  localStorage.setItem("currentScene", 1);
  setTimeout(animateBottle(), 90000);
  // animateBottle();

  // $('#bottle').animateTo({ right: '150px', top: '400px', left: '300px' }, 8000).then(function (el) {
  // el.css('transform', 'rotate(20deg)');

  tl = new TimelineLite();
  // Sequence multiple tweens
  //Show item
  //show dialouge
  //last dialouge with button link to post page
  //continue button
  // setTimeout(function s1() {
  // , delay: 5
  tl.to($("#d-1"), 5, { autoAlpha: 1, delay: 5 })
    .to($("#d-1"), 0, { autoAlpha: 0 })
    .to($("#d-2"), 5, { autoAlpha: 1 })
    .to($("#d-2"), 0, { autoAlpha: 0 })
    .to($("#d-3"), 5, { autoAlpha: 1 })
    .to($("#d-3"), 0, { autoAlpha: 0 })
    .to($("#d-4"), 5, { autoAlpha: 1 });

  // }, 3000);
  // console.log('Scene 1 starting');
  // window.addEventListener("click", scene2);

  $("#read-more").on("click", function() {
    console.log("E");
    tl.pause();
  });
  $("#back").on("click", function() {
    tl.play(scene2());
  });

  $("#btn").on("click", function() {
    tl.to($("#d-4"), 1, { autoAlpha: 0 });
    scene2();
  });
}

// tl.pause();
// const lastTime = parseFloat(localStorage.getItem('tl') || 0);
// localStorage.setItem('tl', lastTime);
// setInterval(() => {
// 	localStorage.setItem('tl', lastTime + performance.now());
// }, 1000);
// tl.play(lastTime / 1000);
// console.log(`The animation started ${lastTime / 1000} seconds in`);

// scene1

// Show a button
// If the user clicks the Continue button, play Scene 2
// IF the user clicks the other button, go to wherever that button says to go

// ---------------------------------------------------- END OF SCENE 1 -------------------------------------------------------//

function scene2() {
  animateBottle(0);

  // window.removeEventListener("click", scene2);
  $("#btn").off("click");
  // setTimeout(function() {
  //   $("#fishy").show();
  // }, 1000);

  tl = new TimelineLite();
  tl.to($("#octopus"), 1, {
    autoAlpha: 1,
    delay: 1
  })
    .to($("#d-1"), 1, { autoAlpha: 1 })
    .to($("#d-1"), 1, { autoAlpha: 0 })
    .to($("#d-4"), 1, { autoAlpha: 1 });

  // window.addEventListener("click", scene3);
  localStorage.setItem("currentScene", 2);
  console.log("Scene 2 starting");

  $("#btn").on("click", function() {
    tl.to($("#d-4"), 1, { autoAlpha: 0 });
    tl.to($("#octopus"), 0.3, { autoAlpha: 0 });
    scene3();
  });

  $("#read-more").on("click", function() {
    tl.pause();
  });
  $("#back").on("click", function() {
    tl.play(scene3());
  });
}

// ---------------------------------------------------- END OF SCENE 2 -------------------------------------------------------//

function scene3() {
  animateBottle(0);

  // window.removeEventListener("click", scene3);
  $("#btn").off("click");
  tl = new TimelineLite();
  tl.to($("#turt"), 1, {
    autoAlpha: 1,
    delay: 1
  })
    .to($("#d-1"), 1, { autoAlpha: 1 })
    .to($("#d-1"), 1, { autoAlpha: 0 })
    .to($("#d-4"), 1, { autoAlpha: 1 });

  localStorage.setItem("currentScene", 3);
  console.log("Scene 3 starting");

  $("#btn").on("click", function() {
    tl.to($("#d-4"), 1, { autoAlpha: 0 });
    tl.to($("#turt"), 0.3, { autoAlpha: 0 });
    scene4();
  });
  $("#read-more").on("click", function() {
    tl.pause();
  });
  $("#back").on("click", function() {
    tl.play(scene4());
  });

  // window.addEventListener("click", scene4);
}

// ---------------------------------------------------- END OF SCENE 3 -------------------------------------------------------//

function scene4() {
  animateBottle(0);

  // window.removeEventListener("click", scene3);
  $("#btn").off("click");
  tl = new TimelineLite();
  tl.to($("#grass"), 1, { autoAlpha: 1 })
    .to($("#coral"), 1, {
      autoAlpha: 1,
      delay: 0
    })
    .to($("#d-2"), 1, { autoAlpha: 1 })
    .to($("#d-2"), 1, { autoAlpha: 0 })
    .to($("#d-4"), 1, { autoAlpha: 1 });

  localStorage.setItem("currentScene", 4);
  console.log("Scene 4 starting");

  $("#btn").on("click", function() {
    tl.to($("#d-4"), 1, { autoAlpha: 0 });
    tl.to($("#coral"), 0.3, { autoAlpha: 0 });
    scene5();
  });

  $("#read-more").on("click", function() {
    tl.pause();
  });
  $("#back").on("click", function() {
    tl.play(scene5());
  });
}

// ---------------------------------------------------- END OF SCENE 4 -------------------------------------------------------//
function scene5() {
  animateBottle(0);

  // window.removeEventListener("click", scene3);
  $("#btn").off("click");
  tl = new TimelineLite();
  tl.to($("#dirt"), 1, { autoAlpha: 1 })
    .to($(".help-1"), 5, { autoAlpha: 1, ease: Bounce.easeOut })
    .to($(".help-1"), 0, { autoAlpha: 0, ease: Bounce.easeOut })
    .to($(".help-2"), 5, { autoAlpha: 1, ease: Bounce.easeOut })
    .to($(".help-2"), 0, { autoAlpha: 0, ease: Bounce.easeOut })
    .to($(".help-3"), 5, { autoAlpha: 1, ease: Bounce.easeOut })
    .to($(".help-3"), 0, { autoAlpha: 0, ease: Bounce.easeOut })
    .to($(".help-4"), 5, { autoAlpha: 1, ease: Bounce.easeOut })
    .to($(".help-4"), 0, { autoAlpha: 0, ease: Bounce.easeOut })
    .to($(".help-5"), 5, { autoAlpha: 1, ease: Bounce.easeOut })
    .to($(".help-5"), 0, { autoAlpha: 0, ease: Bounce.easeOut });

  localStorage.setItem("currentScene", 5);
  console.log("Scene 5 starting");
}
