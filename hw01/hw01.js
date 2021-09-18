/**
 * author: Yayen Lin
 * netID: lin383
 * Fall 2021 CS 559 Assignment 01
 * files: hw01.html, hw01.js
 */

draw = () => {
  var canvas = document.getElementById("hw01Canvas");
  var s1 = document.getElementById("slider1");
  var s2 = document.getElementById("slider2");
  s1.value = 0;
  s2.value = 0;

  var context = canvas.getContext("2d");

  drawCube = () => {
    context.beginPath();

    // top of the cube
    var [x, y] = [50, 50]; // starting points of (x, y) coords
    context.moveTo(x, y);
    context.lineTo((x += 100), y);
    context.lineTo((x -= 50), (y += 30));
    context.lineTo((x -= 100), y);
    context.lineTo((x += 50), (y -= 30));

    // face of the cube
    context.moveTo((x -= 50), (y += 30));
    context.lineTo(x, (y += 100));
    context.lineTo((x += 100), y);
    context.lineTo(x, (y -= 100));

    // right side of the cube
    console.log(x, y);
    context.moveTo(x, (y += 100));
    context.lineTo((x += 50), (y -= 30));
    context.lineTo(x, (y -= 100));

    context.stroke();
  };

  drawCube();
};

window.onload = () => {
  draw();
};
