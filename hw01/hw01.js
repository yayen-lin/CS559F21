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

    drawBackgroundColor = () => {
      context.fillStyle = "#000000";
      context.beginPath();
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.closePath();
      context.fill();
    };

    /**
     * convert red, green, blue values to hex
     *
     * reference:
     * https://www.delftstack.com/howto/javascript/rgb-to-hex-javascript/
     */
    ColorToHex = (c) => {
      var hex = c.toString(16);
      return hex.length == 1 ? "0" + hex : hex;
    };

    RGBtoHex = (c) => {
      var [r, g, b] = c;
      return "#" + ColorToHex(r) + ColorToHex(g) + ColorToHex(b);
    };

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
      context.fillStyle = c;
      context.strokeStyle = c;
      context.moveTo(startingX, startingY);
      context.lineTo(startingX + l, startingY);
      context.lineTo(startingX + l, startingY + l);
      context.lineTo(startingX, startingY + l);
      context.closePath();
      context.fill();
    };

    drawFace = () => {
      // settings of size and colors
      // img found at: https://www.seekpng.com/ipng/u2q8a9e6y3e6o0t4_minecraft-creeper-face-icons-png-minecraft-creeper-head/
      l = 15;
      colors = [
        [
          [0, 173, 35],
          [0, 102, 20],
          [0, 141, 28],
          [132, 132, 132],
          [177, 177, 177],
          [74, 255, 104],
          [42, 133, 57],
          [0, 102, 20],
        ],
        [
          [0, 102, 20],
          [0, 173, 35],
          [0, 141, 28],
          [42, 133, 57],
          [0, 95, 19],
          [55, 185, 77],
          [36, 104, 45],
          [132, 132, 132],
        ],
        [
          [0, 141, 28],
          [32, 32, 32],
          [32, 32, 32],
          [66, 228, 94],
          [55, 185, 77],
          [32, 32, 32],
          [32, 32, 32],
          [177, 177, 177],
        ],
        [
          [0, 141, 28],
          [32, 32, 32],
          [0, 0, 0],
          [42, 133, 57],
          [24, 67, 31],
          [0, 0, 0],
          [32, 32, 32],
          [42, 133, 57],
        ],
        [
          [42, 133, 57],
          [0, 173, 35],
          [66, 228, 94],
          [32, 32, 32],
          [32, 32, 32],
          [177, 177, 177],
          [0, 95, 19],
          [0, 173, 35],
        ],
        [
          [66, 228, 94],
          [24, 67, 31],
          [32, 32, 32],
          [0, 0, 0],
          [0, 0, 0],
          [32, 32, 32],
          [0, 173, 35],
          [177, 177, 177],
        ],
        [
          [177, 177, 177],
          [42, 133, 57],
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0],
          [42, 133, 57],
          [0, 95, 19],
        ],
        [
          [66, 228, 94],
          [0, 173, 35],
          [32, 32, 32],
          [66, 228, 94],
          [0, 173, 35],
          [32, 32, 32],
          [0, 95, 19],
          [0, 173, 35],
        ],
      ];
      componentNums = 8;

      x_ = parseInt(x);
      y_ = parseInt(y);
      context.beginPath();

      // top of the cube
      for (let i = 0; i < componentNums; i++) {
        for (let j = 0; j < componentNums; j++) {
          context.moveTo(x_, y_);
          drawRect(x_, y_, l, RGBtoHex(colors[i][j]));
          x_ += l;

          context.stroke();
        }
        x_ = parseInt(x);
        y_ += l;
      }
    };

    drawNameCard = () => {
      context.strokeStyle = "#F5DEB3";
      context.fillStyle = "#F5DEB3";
      context.beginPath();
      context.moveTo(0, 170);
      context.lineTo(200, 170);
      context.lineTo(200, 200);
      context.lineTo(0, 200);
      context.closePath();
      context.fill();
      context.stroke();
    };

    drawName = () => {
      context.strokeStyle = "#FFFFFF";
      context.lineWidth = 5;

      context.beginPath();

      // C
      context.moveTo(5, 160);
      context.lineTo(25, 160);
      context.moveTo(5, 160);
      context.lineTo(5, 192);
      context.lineTo(25, 192);

      // R
      context.moveTo(32, 160);
      context.lineTo(52, 160);
      context.moveTo(50, 160);
      context.lineTo(50, 175);
      context.lineTo(32, 175);
      context.moveTo(32, 160);
      context.lineTo(52, 195);
      context.moveTo(32, 160);
      context.lineTo(32, 195);

      // E
      context.moveTo(59, 160);
      context.lineTo(79, 160);
      context.moveTo(59, 160);
      context.lineTo(59, 193);
      context.lineTo(79, 193);
      context.moveTo(59, 176);
      context.lineTo(79, 176);

      // E
      context.moveTo(86, 160);
      context.lineTo(106, 160);
      context.moveTo(86, 160);
      context.lineTo(86, 193);
      context.lineTo(106, 193);
      context.moveTo(86, 176);
      context.lineTo(106, 176);

      // P
      context.moveTo(114, 160);
      context.lineTo(134, 160);
      context.lineTo(134, 175);
      context.lineTo(114, 175);
      context.moveTo(114, 160);
      context.lineTo(114, 195);

      // E
      context.moveTo(142, 160);
      context.lineTo(162, 160);
      context.moveTo(142, 160);
      context.lineTo(142, 193);
      context.lineTo(162, 193);
      context.moveTo(142, 176);
      context.lineTo(162, 176);

      // R
      context.moveTo(170, 160);
      context.lineTo(192, 160);
      context.moveTo(190, 160);
      context.lineTo(190, 175);
      context.lineTo(170, 175);
      context.moveTo(170, 160);
      context.lineTo(192, 195);
      context.moveTo(170, 160);
      context.lineTo(170, 195);

      context.stroke();
    };

    drawBackgroundColor(); // bottom layer
    context.save(); // save current state onto a stack
    context.translate(x, y);
    drawFace();
    context.restore();
    drawName();
  };
  s1.addEventListener("input", draw);
  s2.addEventListener("input", draw);
  draw();
};

window.onload = setup;
