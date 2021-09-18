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

    var [x, y] = [s1.value, s2.value]; // starting points of (x, y) coords

    /**
     * Draw component (rectangle) of the creeper's head
     *
     * startingX: starting position on x-axis
     * startingY: starting position on y-axis
     * l: length of the component
     * c: color of the component
     */
    drawRect = (startingX, startingY, l, c) => {
      context.beginPath();
      console.log(`startingX = ${startingX}, startingY = ${startingY}`);
      context.moveTo(startingX, startingY);
      context.lineTo(startingX + l, startingY);
      context.lineTo(startingX + l, startingY + l);
      context.lineTo(startingX, startingY + l);
      context.closePath();
    };

    drawFace = () => {
      // settings of size and colors
      l = 15;
      colors = [null];
      componentNums = 1;

      x_ = parseInt(x);
      y_ = parseInt(y);
      context.beginPath();

      // top of the cube
      for (let i = 0; i < componentNums; i++) {
        for (let j = 0; j < componentNums; j++) {
          console.log(x_, y_);
          context.moveTo(x_, y_);
          drawRect(x_, y_, l, "red");
          x_ += l;
          context.stroke();
        }
        x_ = parseInt(x);
        y_ += l;
      }
    };
    context.save(); // save current state onto a stack
    context.translate(x, y);
    drawFace();
    context.restore();
  };
  s1.addEventListener("input", draw);
  s2.addEventListener("input", draw);
  draw();
};

window.onload = setup;
