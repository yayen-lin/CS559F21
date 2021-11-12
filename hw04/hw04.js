function setup() {
  var canvas = document.getElementById("hw04Canvas");
  var ctx = canvas.getContext("2d");
  var slider0 = document.getElementById("slider0");
  var slider1 = document.getElementById("slider1");
  var slider2 = document.getElementById("slider2");
  var slider3 = document.getElementById("slider3");

  var radio1 = document.getElementById("radio1");
  var radio2 = document.getElementById("radio2");
  var radio3 = document.getElementById("radio3");
  var radio4 = document.getElementById("radio4");
  var radio5 = document.getElementById("radio5");

  var checkbox_auto = document.getElementById("checkbox_auto");

  slider0.value = 0;
  slider1.value = 0;
  slider2.value = 1;
  slider3.value = 100;
  var armGoUp = true;
  var bounceGoUp = true;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas

    // parameters
    var cx = 60;
    var cy = 440;
    var stack = [mat3.create()];
    var curveScale = 50;
    var shinChanScale = 0.35 / curveScale;
    // colors
    const pantsColor = "#f1f388";
    const shirtColor = "#ce4f4b";
    const skinColor = "#e8b89c";
    const socksColor = "#ffffff";
    const shoesColor = "#eec752";
    // sliders setting
    var tParam = slider0.value * 0.01;
    var theta1 = toRadian(slider1.value); // range (-60, 10)
    var theta2 = -1 * theta1;
    var theta3 = toRadian(slider2.value); // range 0 - 400
    var bouncingScale = slider3.value * 0.01; // range 80 - 100

    // access values of sliders
    var continuity;
    if (radio1.checked) continuity = radio1.value;
    if (radio2.checked) continuity = radio2.value;
    if (radio3.checked) continuity = radio3.value;
    if (radio4.checked) continuity = radio4.value;
    if (radio5.checked) continuity = radio5.value;

    if (checkbox_auto.checked) {
      if (slider0.value < 200) {
        slider0.value = parseInt(slider0.value) + 1;
        tParam = slider0.value * 0.01;
      }
      // arm-waving animation
      if (armGoUp) {
        theta1 = toRadian((slider1.value = parseInt(slider1.value) + 1));
        if (parseInt(slider1.value) >= 10) armGoUp = false;
      } else {
        theta1 = toRadian((slider1.value = parseInt(slider1.value) - 1));
        if (parseInt(slider1.value) <= -60) armGoUp = true;
      }
      theta2 = -theta1;

      // spinning animation
      theta3 = toRadian((slider2.value = parseInt(slider2.value) + 1));
      if (parseInt(slider2.value) >= 360) slider2.value = 0;

      // bouncing animation
      if (bounceGoUp) {
        slider3.value = parseInt(slider3.value) + 1;
        bouncingScale = parseInt(slider3.value) * 0.01;
        if (parseInt(slider3.value) >= 100) bounceGoUp = false;
      } else {
        slider3.value = parseInt(slider3.value) - 1;
        bouncingScale = parseInt(slider3.value) * 0.01;
        if (parseInt(slider3.value) <= 80) bounceGoUp = true;
      }
    }

    function moveToTx(x, y) {
      var res = vec2.create();
      vec2.transformMat3(res, [x, y], stack[0]);
      ctx.moveTo(res[0], res[1]);
    }

    function lineToTx(x, y) {
      var res = vec2.create();
      vec2.transformMat3(res, [x, y], stack[0]);
      ctx.lineTo(res[0], res[1]);
    }

    function arcToTx(cx, cy, r, sr, er) {
      var res = vec2.create();
      vec2.transformMat3(res, [cx, cy], stack[0]);
      ctx.arc(res[0], res[1], r * shinChanScale, sr, er);
    }

    /**
     * convert degree to radian
     * @param {*} d: to be converted to radian
     * @returns a float of radian
     */
    function toRadian(d) {
      return (d * Math.PI) / 180;
    }

    /**
     * convert radian to degree
     * @param {*} rad: to be converted to degree
     * @returns an integer of degree
     */
    function toDegree(rad) {
      return parseInt((rad * 180) / Math.PI);
    }

    // helper function
    // reset line settings back to default
    function resetSetting() {
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 1;
      ctx.fillStyle = "#000";
      ctx.lineJoin = "miter";
    }

    function drawButts() {
      // fill setting
      ctx.fillStyle = skinColor;
      ctx.lineWidth = 2;
      // draw butts
      // right butt
      ctx.beginPath();
      // ctx.arc(245, 237, 55, 0, 2 * Math.PI);
      arcToTx(0, 0, 55 * curveScale, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
      // left butt
      ctx.beginPath();
      // ctx.arc(159, 237, 55, 0, 2 * Math.PI);
      arcToTx(-86, 0, 55 * curveScale, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
    }

    function drawPants() {
      // line and fill setting
      ctx.lineWidth = 2;
      ctx.lineJoin = "round";
      ctx.fillStyle = pantsColor;
      // draw pants
      ctx.beginPath();
      moveToTx(0, 0);
      lineToTx(170, 0);
      lineToTx(173, 8);
      lineToTx(173, 8);
      lineToTx(171, 16);
      lineToTx(173, 20);
      lineToTx(171, 24);
      lineToTx(180, 45);
      lineToTx(90, 45);
      lineToTx(85, 35);
      lineToTx(80, 45);
      lineToTx(-10, 45);
      lineToTx(-1, 24);
      lineToTx(-3, 20);
      lineToTx(-1, 16);
      lineToTx(-3, 8);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // draw left creases on pants
      ctx.lineWidth = 1;
      ctx.beginPath();
      moveToTx(10, 10);
      lineToTx(20, 15);
      ctx.stroke();
      ctx.beginPath();
      moveToTx(7, 17);
      lineToTx(15, 25);
      ctx.stroke();

      // draw right creases on pants
      ctx.beginPath();
      moveToTx(165, 16);
      lineToTx(158, 19);
      ctx.stroke();
      ctx.beginPath();
      moveToTx(167, 20);
      lineToTx(155, 30);
      ctx.stroke();

      resetSetting();
    }

    function drawLeg() {
      // line and fill setting
      ctx.lineWidth = 2;
      ctx.lineJoin = "round";
      ctx.fillStyle = skinColor;

      // draw a leg
      ctx.beginPath();
      moveToTx(0, 0);
      lineToTx(-10, 14);
      // quadraticCurveToTx(100, 350, 10, 40);
      lineToTx(4, 30);
      lineToTx(30, 30);
      lineToTx(16, 14);
      lineToTx(26, 0);
      ctx.fill();
      ctx.stroke();
    }

    function drawSock() {
      // fill setting
      ctx.fillStyle = socksColor;
      // draw a sock
      ctx.beginPath();
      moveToTx(4, 30);
      lineToTx(13, 42);
      lineToTx(39, 44);
      lineToTx(29, 29);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }

    function drawShoe() {
      // fill setting
      ctx.fillStyle = shoesColor;
      // draw a shoe
      ctx.beginPath();
      moveToTx(10, 42);
      lineToTx(16, 47);
      lineToTx(5, 50);
      lineToTx(3, 51);
      lineToTx(2, 52);
      lineToTx(1, 54);
      lineToTx(2, 55);
      lineToTx(3, 56);
      lineToTx(47, 56);
      lineToTx(48, 55);
      lineToTx(49, 54);
      lineToTx(48, 53);
      lineToTx(47, 52);
      lineToTx(39, 44);
      ctx.fill();
      ctx.stroke();
    }

    function drawArm() {
      // fill setting
      ctx.fillStyle = shirtColor;
      ctx.lineWidth = 2;
      // draw an arm
      ctx.beginPath();
      moveToTx(0, 0);
      lineToTx(-39, -52);
      lineToTx(-40, -53);
      lineToTx(-41, -54);
      lineToTx(-42, -55);
      lineToTx(-43, -54);
      lineToTx(-44, -53);
      lineToTx(-45, -50);
      lineToTx(-46, -47);
      lineToTx(-47, -44); // -8, +8
      lineToTx(-8, 8);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // fill setting
      ctx.fillStyle = skinColor;
      // draw a hand
      ctx.beginPath();
      moveToTx(-47, -44);
      lineToTx(-53, -52);
      lineToTx(-53, -57);
      lineToTx(-52, -62);
      lineToTx(-51, -64);
      lineToTx(-50, -67);
      lineToTx(-48, -70);
      lineToTx(-45, -71);
      lineToTx(-43, -70);
      lineToTx(-40, -68);
      lineToTx(-35, -63);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }

    function drawTest() {
      console.log(stack[0]);
      ctx.beginPath();
      moveToTx(0, 0);
      lineToTx(300, 300);
      ctx.stroke();
    }

    function drawShinChan() {
      // #################### draw Shin-chan ####################

      // draw left arm
      stack.unshift(mat3.clone(stack[0])); // save
      var leftArmToCanvas = mat3.create();
      mat3.fromTranslation(leftArmToCanvas, [-77, 72]);
      // mat3.fromTranslation(leftArmToCanvas, [123, 272]);
      mat3.rotate(leftArmToCanvas, leftArmToCanvas, theta1);
      mat3.multiply(stack[0], stack[0], leftArmToCanvas);
      drawArm();
      stack.shift(); // restore, origin back to (cx, cy)

      // draw right arm
      stack.unshift(mat3.clone(stack[0]));
      var rightArmToCanvas = mat3.create();
      mat3.fromTranslation(rightArmToCanvas, [80, 72]);
      mat3.rotate(rightArmToCanvas, rightArmToCanvas, theta2);
      mat3.scale(rightArmToCanvas, rightArmToCanvas, [-1, 1]);
      mat3.multiply(stack[0], stack[0], rightArmToCanvas);
      drawArm();
      stack.shift(); // restore, origin back to (cx, cy)

      // draw butt
      stack.unshift(mat3.clone(stack[0]));
      var buttsToCanvas = mat3.create();
      mat3.fromTranslation(buttsToCanvas, [45, 37]);
      mat3.multiply(stack[0], stack[0], buttsToCanvas);
      drawButts();
      stack.shift(); // restore, origin back to (cx, cy)

      // draw pants, origin at (cx, cy)
      var pantsToCanvas = mat3.create();
      // mat3.fromTranslation(pantsToCanvas, [116, 272]);
      mat3.fromTranslation(pantsToCanvas, [-84, 72]);
      mat3.multiply(stack[0], stack[0], pantsToCanvas);
      drawPants();

      // draw left leg (origin is now at (116, 272))
      stack.unshift(mat3.clone(stack[0])); // save status
      var leftLegToCanvas = mat3.create();
      mat3.fromTranslation(leftLegToCanvas, [5, 45]);
      mat3.multiply(stack[0], stack[0], leftLegToCanvas);
      drawLeg();
      drawSock();
      drawShoe();

      // draw right leg (origin is now at (121, 317))
      stack.unshift(mat3.clone(stack[0])); // save status
      var rightLegToCanvas = mat3.create();
      mat3.fromTranslation(rightLegToCanvas, [160, 0]);
      mat3.scale(rightLegToCanvas, rightLegToCanvas, [-1, 1]);
      mat3.multiply(stack[0], stack[0], rightLegToCanvas);
      drawLeg();
      drawSock();
      drawShoe();

      // origin is now at (281, 315)
      stack.shift(); // restore(), origin at (121, 317)
      stack.shift(); // restore(), origin back to (123, 272)
      // stack.shift(); // restore(), origin back to (0, 0)
    }

    /**
     * Draw small pieces of line segment to shape a curve
     * [borrowed from lecture demos]
     *
     * @param {*} t_begin - curve begin position
     * @param {*} t_end - curve end position
     * @param {*} intervals - number of intervals in the given range
     * @param {*} C - curve function, an [x, y] pair coordinate
     * @param {*} color - color of the curve
     */
    function drawTrajectory(t_begin, t_end, intervals, C, color) {
      ctx.strokeStyle = color;
      ctx.lineWidth = 4;
      ctx.beginPath();
      moveToTx(...C(t_begin));
      for (var i = 1; i <= intervals; i++) {
        var t =
          ((intervals - i) / intervals) * t_begin + (i / intervals) * t_end;
        lineToTx(...C(t));
      }
      ctx.stroke();
      resetSetting(); // restore context setting to default
    }

    function getTrajectory(continuity) {
      switch (continuity) {
        case "0":
          return (t, tangent = false) => {
            // position: t^3, t^2
            // tangent: 3t^2 , 2t
            // velocity: 6t, 2
            if (tangent)
              return [
                3 * t * t, // x
                2 * t, // y
              ];
            else
              return [
                t * t * t, // x
                t * t, // y
              ];
          };
        case "C0": // at t = 1
          return (t, tangent = false) => {
            // position: t, t
            // tangent: 1, 1
            if (tangent)
              return [
                1, // x
                1, // y
              ];
            else return [t, t];
          };
        case "C1": // at t = 1
          return (t, tangent = false) => {
            // position: (3t^2)/2 - 1/2, (2t^3)/3 + 1/3
            // tangent: 3t, 2t^2
            if (tangent)
              return [
                3 * t, // x
                2 * t * t, // y
              ];
            else
              return [
                (3 * t * t) / 2 - 1 / 2, // x
                (2 * t * t * t) / 3 + 1 / 3, // y
              ];
          };
        case "G1": // at t = 1
          return (t, tangent = false) => {
            // position: 3t^2 + 3t - 5, 6t - 5
            // tangent: 6t^2 + 3, 6
            if (tangent)
              return [
                6 * t * t + 3, // x
                6, // y
              ];
            else
              return [
                3 * t * t + 3 * t - 5, // x
                6 * t - 5, // y
              ];
          };
        case "C2": // at t = 1
          return (t, tangent = false) => {
            // position: (t^3)/2 + (3t^2)/2 - 3t/2 + 1/2, (t^4)/3 - t^2 + 8t/3 - 1
            // tangent: (3t^2)/2 + 3t - 3/2, (4t^3)/3 - 2t + 8/3
            // velocity: 3t + 3, 4t^2 - 2
            if (tangent)
              return [
                (3 * t * t) / 2 + 3 * t - 3 / 2, // x
                (4 * t * t * t) / 3 - 2 * t + 8 / 3, // y
              ];
            else
              return [
                (t * t * t) / 2 + (3 * t * t) / 2 - (3 * t) / 2 + 1 / 2, // x
                (t * t * t * t) / 3 - t * t + (8 * t) / 3 - 1, // y
              ];
          };
        case "G2": // at t = 1
          return (t, tangent = false) => {
            // position: 3(t^2)/2 - 1/2, (t^4)/6 - (t^2)/2 + 7t/3 - 1
            // tangent: 3t, (2t^3)/3 - t + 7/3
            // velocity: 3, 2t^2 - 1
            if (tangent)
              return [
                3 * t, // x
                (2 * t * t * t) / 3 - t + 7 / 3, // y
              ];
            else
              return [
                (3 * t * t) / 2 - 1 / 2, // x
                (t * t * t * t) / 6 - (t * t) / 2 + (7 * t) / 3 - 1, // y
              ];
          };
      }
    }

    var Ccomp = (continuity, t, tangent = false) => {
      if (t < 1) {
        return getTrajectory("C0")(t, tangent);
      } else {
        return getTrajectory(continuity)(t, tangent);
      }
    };

    // first gets drawed will lie in the bottom
    function main() {
      stack.unshift(mat3.clone(stack[0])); // save
      var curve_to_canvas = mat3.create();
      mat3.fromTranslation(curve_to_canvas, [cx, cy]);
      mat3.scale(curve_to_canvas, curve_to_canvas, [curveScale, -curveScale]);
      mat3.multiply(stack[0], stack[0], curve_to_canvas);
      drawTrajectory(0.0, 1.0, 100, getTrajectory("0"), "black");
      drawTrajectory(1.0, 2.0, 100, getTrajectory(continuity), "grey");

      var shinChan = mat3.create();
      mat3.fromTranslation(shinChan, Ccomp(continuity, tParam));

      var tangent = Ccomp(continuity, tParam, true);
      var angle = Math.atan2(tangent[1], tangent[0]);
      mat3.rotate(shinChan, shinChan, angle);
      mat3.scale(shinChan, shinChan, [
        shinChanScale,
        -shinChanScale * bouncingScale,
      ]);
      mat3.multiply(stack[0], stack[0], shinChan);
      drawShinChan();
      stack.shift();
    }
    main();
    window.requestAnimationFrame(draw);
  }

  slider0.addEventListener("input", draw);
  draw();
}
window.onload = setup;
