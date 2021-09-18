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
  // s1.value = 70;
  // s2.value = 40;

  // sx = s1.value;
  // sy = s2.value;

  var context = canvas.getContext("2d");

  drawCube = (sx, sy) => {
    // settings of coordinate
    var [startingX, startingY] = [sx, sy]; // starting points of (x, y) coords
    var [x, y] = [startingX, startingY];
    context.beginPath();

    // top of the cube
    context.moveTo(x, y);
    context.lineTo((x += 100), y);
    context.lineTo((x -= 50), (y += 30));
    context.lineTo((x -= 100), y);
    context.lineTo((x += 50), (y -= 30));
    context.closePath();

    // face of the cube
    context.moveTo((x -= 50), (y += 30));
    context.lineTo(x, (y += 100));
    context.lineTo((x += 100), y);
    context.lineTo(x, (y -= 100));
    // context.closePath();

    // right side of the cube
    console.log(x, y);
    context.moveTo(x, (y += 100));
    context.lineTo((x += 50), (y -= 30));
    context.lineTo(x, (y -= 100));
    // context.closePath();

    // stroke the solid outline of the cube
    context.stroke();

    // draw interior of the cube
    [x, y] = [startingX, startingY];
    context.beginPath();

    // inner view of the cube
    context.moveTo((x = startingX), (y = startingY));
    context.setLineDash([4, 4]);
    console.log(x, y);
    context.lineTo(x, (y += 100));
    context.lineTo((x -= 50), (y += 30));
    context.moveTo((x += 50), (y -= 30));
    context.lineTo((x += 100), y);

    // stroke dotted interior line
    context.stroke();
  };

  // context.save(); // save current state onto a stack
  // drawCube(dx, dy);
  drawCube(70, 40);
};

window.onload = () => {
  draw();
};
