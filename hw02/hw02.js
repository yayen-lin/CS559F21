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
    var cx = canvas.width / 2;
    var cy = canvas.height / 2;

    // radius
    var tire_radius = ((canvas.width / 2) * 3) / 4;
    var tire_thickness = tire_radius - 25;
    var rim_radius = tire_thickness - 5;
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

    // helper function
    function connectLogoToRimRadius(angle_start, angle_end) {
      // line 1
      // cnt.save();
      // cnt.translate(
      //   cx + logo_radius * Math.cos(toRadian(-angle_start)),
      //   cy + logo_radius * Math.sin(toRadian(angle_start))
      // );
      // cnt.beginPath();
      // cnt.moveTo(0, 0);
      // cnt.lineTo(
      // rim_radius * Math.cos(toRadian(-angle_start)),
      // rim_radius * Math.sin(toRadian(angle_start))
      // );
      // cnt.stroke();
      // cnt.restore();
      cnt.save();
      cnt.translate(
        rim_radius * Math.cos(toRadian(-angle_start)),
        rim_radius * Math.sin(toRadian(angle_start))
      );

      cnt.restore();

      // line 2
      cnt.save();
      cnt.translate(
        cx + logo_radius * Math.cos(toRadian(-angle_end)),
        cy + logo_radius * Math.sin(toRadian(angle_end))
      );
      cnt.beginPath();
      cnt.moveTo(0, 0);
      cnt.lineTo(
        rim_radius * Math.cos(toRadian(-angle_end)),
        rim_radius * Math.sin(toRadian(angle_end))
      );
      cnt.stroke();
      cnt.restore();
    }

    // helper function
    function drawRimRadius(angle_start, angle_end) {
      cnt.beginPath();
      cnt.arc(cx, cy, rim_radius, toRadian(angle_start), toRadian(angle_end));
      cnt.stroke();
    }

    // helper function
    function drawCircle(r, c) {
      cnt.fillStyle = c || null;
      cnt.beginPath();
      cnt.arc(cx, cy, r, toRadian(0), toRadian(360));
      cnt.stroke();
      cnt.fill();
    }

    // helper function
    function drawLogo() {
      cnt.save();

      cnt.translate(cx, cy);
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

    function drawRim() {
      // ######################## private vars for this function ########################
      cnt.lineWidth = 3;
      // start_offset + end_offset must sum up to 72 (72 * 5 = 360)
      let angle_start_offset = 16.5;
      let angle_end_offset = 72 - angle_start_offset;
      // cnt.globalCompositeOperation = "source-atop";
      // cnt.arc(cx, cy, tire_radius, 0, 2 * Math.PI, false);

      // ################################### draw rim ###################################

      // ------------------------------ lower right details -----------------------------
      var angle_start = angle_start_offset;
      var angle_end = angle_start + angle_end_offset;
      drawRimRadius(angle_start, angle_end);
      connectLogoToRimRadius(angle_start, angle_end);

      // ------------------------------ lower left details -----------------------------

      angle_start = angle_end + angle_start_offset;
      angle_end = angle_start + angle_end_offset;
      drawRimRadius(angle_start, angle_end);
      connectLogoToRimRadius(angle_start, angle_end);

      // test to see where the center is
      // cnt.moveTo(0, 0);
      // cnt.lineTo(400, 400);
      // cnt.stroke();

      angle_start = angle_end + angle_start_offset;
      angle_end = angle_start + angle_end_offset;
      drawRimRadius(angle_start, angle_end);
      connectLogoToRimRadius(angle_start, angle_end);

      angle_start = angle_end + angle_start_offset;
      angle_end = angle_start + angle_end_offset;
      drawRimRadius(angle_start, angle_end);
      connectLogoToRimRadius(angle_start, angle_end);

      angle_start = angle_end + angle_start_offset;
      angle_end = angle_start + angle_end_offset;
      drawRimRadius(angle_start, angle_end);
      connectLogoToRimRadius(angle_start, angle_end);

      // draw logo
      drawLogo();

      // ################################## draw tire ##################################
      // draw center logo circle
      drawCircle(logo_radius, "white");

      // draw inner tire
      drawCircle(tire_thickness, "white");

      // draw outer tire
      drawCircle(tire_radius, "black");
    }

    /**
     * spinning
     */
    function rotateRim() {
      cnt.translate(cx, cy);
      cnt.rotate(toRadian(-5));
      cnt.translate(-cx, -cy);
      drawRim();
    }

    drawRim();
    // rotateRim();
    // window.addEventListener("click", mouseClick, false);

    window.requestAnimationFrame(draw);
  };

  draw();
};

window.onload = setup;
