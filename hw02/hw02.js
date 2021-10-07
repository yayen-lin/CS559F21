/**
 * author: Yayen Lin
 * netID: lin383
 * Fall 2021 CS 559 Assignment 02
 * files: hw02.html, hw02.js
 */
setup = () => {
  // getting elements from html
  var canvas = document.getElementById("hw02Canvas");

  draw = () => {
    var cnt = canvas.getContext("2d");
    // canvas.width = canvas.width; // clear canvas before drawing
    cnt.globalCompositeOperation = "destination-over";
    cnt.clearRect(0, 0, canvas.width, canvas.height); // clear canvas

    // center
    var center_x = canvas.width / 2;
    var center_y = canvas.height / 2;

    // radius
    var tire_radius = ((canvas.width / 2) * 3) / 4;
    var tire_thickness = tire_radius - 25;
    var rim_outline = tire_thickness - 5;
    var logo_radius = 20;

    /**
     * Return the radian of a given degree
     * @param {*} degree: to be converted to radian
     * @returns a radian of float type
     */
    function toRadian(degree) {
      return (degree * Math.PI) / 180;
    }

    /*
     * this function returns a Path2D object
     * the path represents a growing line between two given points
     *
     * reference: https://stackoverflow.com/a/54112288/13007073
     */
    function createGrowingLine(x1, y1, x2, y2, startWidth, endWidth) {
      // calculate direction vector of point 1 and 2
      const directionVectorX = x2 - x1,
        directionVectorY = y2 - y1;
      // calculate angle of perpendicular vector
      const perpendicularVectorAngle =
        Math.atan2(directionVectorY, directionVectorX) + Math.PI / 2;
      // construct shape
      const path = new Path2D();
      path.arc(
        x1,
        y1,
        startWidth / 2,
        perpendicularVectorAngle,
        perpendicularVectorAngle + Math.PI
      );
      path.arc(
        x2,
        y2,
        endWidth / 2,
        perpendicularVectorAngle + Math.PI,
        perpendicularVectorAngle
      );
      path.closePath();
      return path;
    }

    function drawRim() {
      // ################################## draw tire ##################################
      // draw outer tire
      cnt.beginPath();
      cnt.arc(center_x, center_y, tire_radius, toRadian(0), toRadian(360));
      cnt.stroke();

      // draw inner tire
      cnt.beginPath();
      cnt.arc(center_x, center_y, tire_thickness, toRadian(0), toRadian(360));
      cnt.stroke();

      // ################################### draw rim ###################################
      cnt.beginPath();
      cnt.arc(center_x, center_y, rim_outline, toRadian(10), toRadian(72));
      cnt.stroke();

      cnt.beginPath();
      cnt.arc(center_x, center_y, rim_outline, toRadian(82), toRadian(144));
      cnt.stroke();

      cnt.beginPath();
      cnt.arc(center_x, center_y, rim_outline, toRadian(154), toRadian(216));
      cnt.stroke();

      cnt.beginPath();
      cnt.arc(center_x, center_y, rim_outline, toRadian(226), toRadian(288));
      cnt.stroke();

      cnt.beginPath();
      cnt.arc(center_x, center_y, rim_outline, toRadian(298), toRadian(360));
      cnt.stroke();

      // draw center logo
      cnt.beginPath();
      cnt.arc(center_x, center_y, logo_radius, toRadian(0), toRadian(360));
      cnt.stroke();

      cnt.save();

      // =================================
      // cnt.lineWidth = 3;

      // cnt.beginPath();
      // cnt.translate(center_x, center_y);
      // cnt.moveTo(0, 0);
      // cnt.lineTo(0, -logo_radius);
      // cnt.save();

      // cnt.moveTo(0, 0);
      // cnt.rotate(toRadian(120));
      // cnt.lineTo(0, -logo_radius);

      // cnt.restore();
      // cnt.rotate(toRadian(-120));
      // cnt.moveTo(0, 0);
      // cnt.lineTo(0, -logo_radius);

      // cnt.stroke();

      // cnt.restore();
      // cnt.restore();
      // =================================

      cnt.translate(center_x, center_y);
      cnt.moveTo(0, 0);
      cnt.lineTo(0, -logo_radius);

      logo_part1 = createGrowingLine(0, 0, 0, -logo_radius, 5, 2);
      // color and draw growing line
      // cnt.fillStyle = "green";
      cnt.fill(logo_part1);
      cnt.save();

      cnt.moveTo(0, 0);
      cnt.rotate(toRadian(120));
      logo_part2 = createGrowingLine(0, 0, 0, -logo_radius, 5, 2);
      cnt.fill(logo_part2);
      cnt.restore();

      cnt.moveTo(0, 0);
      cnt.rotate(toRadian(-120));
      logo_part3 = createGrowingLine(0, 0, 0, -logo_radius, 5, 2);
      cnt.fill(logo_part3);
      cnt.restore();

      cnt.restore();
    }

    /**
     * spinning
     */
    function rotateRim() {
      cnt.translate(center_x, center_y);
      cnt.rotate(toRadian(-5));
      cnt.translate(-center_x, -center_y);
      drawRim();
    }

    // drawRim();
    rotateRim();
    // window.addEventListener("click", mouseClick, false);

    window.requestAnimationFrame(draw);
  };

  draw();
};

window.onload = setup;
