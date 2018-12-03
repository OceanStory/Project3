var app = app || {};

app.testFunction = () => {
  console.log("test!");
};

app.dispalyItems = () => {
  getItems();
};

// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
function responseToJSON(response) {
  return response.json();
}
function dispalyItems(data) {
  console.log(data);
  itemsList = data.map(function(item) {
    return item.image;
  });
  (function(window, document) {
    "use strict";
    var init = function() {
      var canvas = document.querySelector(".items");
      var icon_template = document.querySelector("#template");
      var icon_width = 40;
      var icon_height = 30;
      var the_images = data.map(function(item) {
        return item.image;
      });
      var pickRandomImage = function() {
        var i = Math.floor(Math.random() * the_images.length);
        return the_images[i];
      };
      var total_number_of_images = 40;
      var max_height = canvas.offsetHeight - icon_height;
      var max_width = canvas.offsetWidth - icon_width;
      var randomCoordinate = function() {
        var r = [];
        var x = Math.floor(Math.random() * max_width);
        var y = Math.floor(Math.random() * max_height);
        r = [x, y];
        return r;
      };
      var createImage = function() {
        var node = icon_template.cloneNode(true);
        var xy = randomCoordinate();
        node.removeAttribute("id");
        node.removeAttribute("hidden");
        node.style.top = xy[1] + "px";
        node.style.left = xy[0] + "px";
        node.setAttribute("src", pickRandomImage());
        node.setAttribute("height", "50px");
        node.setAttribute("width", "50px");
        canvas.appendChild(node);
      };
      for (var i = 0; i < total_number_of_images; i++) {
        createImage();
      }
    };
    // window.addEventListener("load", init);
    init();
  })(window, document);
}
setInterval(function() {
  $("img.icon").toggleClass("down");
}, 1000);
function getItems() {
  fetch("/items", {
    headers: { "Content-Type": "application/json", Accept: "application/json" }
  })
    .then(responseToJSON)
    .then(dispalyItems);
}
