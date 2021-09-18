/**
 * author: Yayen Lin
 * netID: lin383
 * Fall 2021 CS 559 Assignment 01
 * files: hw01.html, hw01.js
 */
setup = () => {
  // getting elements from html
  var canvas = document.getElementById("hw01Canvas");
  var s1 = document.getElementById("slider1");
  var s2 = document.getElementById("slider2");
  s1.value = 0;
  s2.value = 0;

  draw = () => {
    var context = canvas.getContext("2d");
    canvas.width = canvas.width; // clear canvas before drawing

    var [startingX, startingY] = [s1.value, s2.value]; // starting points of (x, y) coords

    drawCube = () => {
      // settings of coordinate
      var [x, y] = [startingX, startingY];
      context.beginPath();

      // top of the cube
      context.moveTo(x, y);
      context.lineTo(100, 100);

      // context.closePath();

      // stroke the solid outline of the cube
      context.stroke();
    };
    context.save(); // save current state onto a stack
    context.translate(startingX, startingY);
    drawCube();
    context.restore();
  };
  s1.addEventListener("input", draw);
  s2.addEventListener("input", draw);
  draw();
};

window.onload = setup;
