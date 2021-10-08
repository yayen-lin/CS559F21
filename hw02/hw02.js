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

    function setToDefault() {
      cnt.strokeStyle = "#000";
      cnt.lineWidth = 1;
      cnt.fillStyle = "#000";
      cnt.lineJoin = "miter";
    }

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

    // helper function for drawRim()
    function connectLogoToRimRadius(angle_start, angle_end) {
      scale = 0.88;
      cnt.lineWidth = 5;
      // line 1
      cnt.save();
      cnt.translate(
        cx + logo_radius * Math.cos(toRadian(angle_start)),
        cy + logo_radius * Math.sin(toRadian(angle_start))
      );
      cnt.scale(scale, scale);
      // cnt.rotate(toRadian(30));
      cnt.beginPath();
      cnt.moveTo(0, 0);
      cnt.lineTo(
        rim_radius * Math.cos(toRadian(angle_start)),
        rim_radius * Math.sin(toRadian(angle_start))
      );
      cnt.stroke();
      cnt.restore();

      // line 2
      cnt.save();
      cnt.translate(
        cx + logo_radius * Math.cos(toRadian(angle_end)),
        cy + logo_radius * Math.sin(toRadian(angle_end))
      );
      cnt.scale(scale, scale);
      cnt.beginPath();
      cnt.moveTo(0, 0);
      cnt.lineTo(
        rim_radius * Math.cos(toRadian(angle_end)),
        rim_radius * Math.sin(toRadian(angle_end))
      );
      cnt.stroke();
      cnt.restore();
    }

    // helper function for drawRim()
    function drawRimRadius(angle_start, angle_end) {
      cnt.beginPath();
      cnt.arc(cx, cy, rim_radius, toRadian(angle_start), toRadian(angle_end));
      cnt.stroke();
    }

    // helper function
    function drawCircle(r, fill, ss, lw) {
      cnt.fillStyle = fill || null;
      cnt.strokeStyle = ss || null;
      cnt.lineWidth = lw || null;
      cnt.beginPath();
      cnt.arc(cx, cy, r, toRadian(0), toRadian(360));
      cnt.stroke();
      cnt.fill();
      setToDefault();
    }

    // helper function
    function drawLogo(logoColor) {
      cnt.fillStyle = logoColor || "silver";

      cnt.save(); // default state
      cnt.translate(cx, cy); // to translated state
      cnt.save(); // save the translated state

      cnt.moveTo(0, 0);
      cnt.lineTo(0, -logo_radius);
      logo_part1 = createGrowingLine(0, 0, 0, -logo_radius, 5, 2);
      cnt.fill(logo_part1);

      cnt.moveTo(0, 0);
      cnt.rotate(toRadian(120)); // rotated state
      logo_part2 = createGrowingLine(0, 0, 0, -logo_radius, 5, 2);
      cnt.fill(logo_part2);
      cnt.restore(); // return to translated state

      cnt.moveTo(0, 0);
      cnt.rotate(toRadian(-120));
      logo_part3 = createGrowingLine(0, 0, 0, -logo_radius, 5, 2);
      cnt.fill(logo_part3);
      cnt.restore(); // return to translated state

      cnt.restore(); //return to default state

      setToDefault();
    }

    // helper function
    function drawRim(rimColor, lw) {
      // private vars for this function
      cnt.lineWidth = lw || 3;
      cnt.strokeStyle = rimColor || "red";
      let angle_start_offset = 16;
      let angle_end_offset = 72 - angle_start_offset; // 72 * 5 = 360

      // ------------------------------ lower right rim details -----------------------------
      var angle_start = angle_start_offset;
      var angle_end = angle_start + angle_end_offset;
      drawRimRadius(angle_start, angle_end);
      connectLogoToRimRadius(angle_start, angle_end);

      // ------------------------------ lower left rim details ------------------------------
      angle_start = angle_end + angle_start_offset;
      angle_end = angle_start + angle_end_offset;
      drawRimRadius(angle_start, angle_end);
      connectLogoToRimRadius(angle_start, angle_end);

      // ------------------------------ left rim details ------------------------------------
      angle_start = angle_end + angle_start_offset;
      angle_end = angle_start + angle_end_offset;
      drawRimRadius(angle_start, angle_end);
      connectLogoToRimRadius(angle_start, angle_end);

      // ------------------------------ upper rim details -----------------------------------
      angle_start = angle_end + angle_start_offset;
      angle_end = angle_start + angle_end_offset;
      drawRimRadius(angle_start, angle_end);
      connectLogoToRimRadius(angle_start, angle_end);

      // ------------------------------ upper right rim details -----------------------------
      angle_start = angle_end + angle_start_offset;
      angle_end = angle_start + angle_end_offset;
      drawRimRadius(angle_start, angle_end);
      connectLogoToRimRadius(angle_start, angle_end);
      setToDefault();
    }

    // helper function
    function drawAMG(c) {
      cnt.fillStyle = c || "black";
      cnt.strokeStyle = c || "black";
      // cnt.lineJoin = "bevel";
      var width = 13;
      var height = 15;
      var sx = 10;
      var sy = 10;

      cnt.save(); // default state
      cnt.translate(sx, sy);
      cnt.transform(1, 0, -0.55, 1, 0, 0); // translated + transformed state
      cnt.fillRect(0, 0, width, height);
      cnt.restore(); // return to default state

      cnt.save(); // save the default state
      cnt.translate((sx += width + 3), sy);
      cnt.transform(1, 0, -0.62, 1, 0, 0); // translated + transformed state
      cnt.fillRect(0, 0, (width -= 4), height);
      cnt.restore(); // return to default state

      cnt.save(); // save the default state
      cnt.translate((sx += width + 3), sy);
      cnt.transform(1, 0, -0.66, 1, 0, 0); // translated + transformed state
      cnt.fillRect(0, 0, (width -= 2), height);
      cnt.restore(); // return to default state

      cnt.save(); // save the default state
      cnt.translate((sx += width + 3), sy);
      cnt.transform(1, 0, -0.66, 1, 0, 0); // translated + transformed state
      cnt.fillRect(0, 0, (width -= 2), height);
      cnt.restore(); // return to default state

      cnt.save(); // save the default state
      cnt.translate((sx += width + 3), sy);
      cnt.transform(1, 0, -0.66, 1, 0, 0); // translated + transformed state
      cnt.fillRect(0, 0, (width -= 2), height);
      cnt.restore(); // return to default state

      // write A
      // -
      cnt.save(); // save the default state
      cnt.translate((sx += width + 2), sy); // translated state
      cnt.save(); // save the translated state
      cnt.fillRect(0, 0, 8, 3); // draw -
      // /
      cnt.moveTo(0, 0);
      cnt.transform(1, 0, -0.45, 1, 0, 0); // state is transformed
      cnt.fillRect(0, 0, 3, 15); // draw /
      cnt.restore(); // return to translated state
      // \
      cnt.save(); // save the translated state
      cnt.transform(1, 0, 0.45, 1, 0, 0); // state is transformed
      cnt.fillRect(6, 0, 3, 15); // draw \
      cnt.restore(); // return to translated state
      // --
      cnt.fillRect(-1, 7, 12, 3);
      cnt.restore(); // return to default state

      // write M
      cnt.save(); // save default state
      cnt.translate((sx += width + 12 + 2), sy);
      cnt.save(); // save the translated state
      // write |
      cnt.fillRect(0, 0, 3, 15); // draw |
      // write \
      cnt.transform(1, 0, 0.7, 1, 0, 0); // state is transformed
      cnt.fillRect(0, 0, 3, 15); // draw \
      cnt.restore(); // return to translated state
      // write |
      cnt.fillRect(21, 0, 3, 15); // draw |
      // write /
      cnt.transform(1, 0, -0.7, 1, 0, 0); // state is transformed
      cnt.fillRect(21, 0, 3, 15); // draw /
      cnt.restore(); // return to translated state
      cnt.restore(); // return to default state

      // write G
      cnt.save(); // save default state
      cnt.translate((sx += width + 21 + 4), sy);
      cnt.save(); // save the translated state

      cnt.fillRect(0, 0, 20, 3); // write upper -
      cnt.fillRect(0, 0, 3, 15); // write left |
      cnt.fillRect(0, 13, 20, 3); // write lower _
      cnt.fillRect(18, 7, 3, 8); // write right |
      cnt.fillRect(8, 7, 10, 3); // write middle -
      cnt.restore(); // return to translated state

      cnt.restore(); // return to default state
    }

    function drawCaliper(CaliperColor) {
      cnt.strokeStyle = CaliperColor || "red";
      cnt.fillStyle = CaliperColor || "red";
      cnt.lineJoin = "round";
      cnt.lineWidth = 5;
      // cnt.translate(cx, cy);
      cnt.beginPath();
      cnt.arc(cx, cy, rim_radius - 15, toRadian(0 - 50), toRadian(0 + 50));
      cnt.closePath();
      cnt.stroke();
      cnt.fill();
      // cnt.moveTo();

      // test to see where the center is
      // cnt.moveTo(0, 0);
      // cnt.lineTo(400, 400);
      // cnt.stroke();
      setToDefault();
    }

    /**
     * main function
     * orders from top to bottom
     */
    function drawAll() {
      // draw letter AMG
      drawAMG("black");

      // draw rim
      drawRim((rimColor = "silver"), (lw = 5));

      // draw logo
      drawLogo((logoColor = "silver"));

      // draw Calipers
      drawCaliper((CaliperColor = "green"));

      // draw center logo circle
      drawCircle(logo_radius, (fill = "white"), (ss = "silver"), (lw = 5));

      // draw inner tire
      drawCircle(tire_thickness, (fill = "white"));

      // draw outer tire
      drawCircle(tire_radius, (fill = "black"));
    }

    /**
     * spinning
     */
    function rotateRim() {
      cnt.translate(cx, cy);
      cnt.rotate(toRadian(-5));
      cnt.translate(-cx, -cy);
      drawAll();
    }

    drawAll();
    // rotateRim();
    // window.addEventListener("click", mouseClick, false);

    window.requestAnimationFrame(draw);
  };

  draw();
};

window.onload = setup;
