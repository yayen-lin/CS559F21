function setup() {
  var canvas = document.getElementById("hw04Canvas");
  var ctx = canvas.getContext("2d");
  var slider1 = document.getElementById("slider1");
  slider1.value = -25;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas

    var cx = canvas.width / 2;
    var cy = canvas.height / 2;
    var stack = [mat3.create()];
    var theta1 = toRadian(0);
    var theta2 = -1 * theta1;
    var theta3 = toRadian(0); // range 0 - 400
    var smallScale = 0.5;
    // use the sliders to get the angles
    var tParam = slider1.value * 0.01;

    // colors
    const pantsColor = "#f1f388";
    const shirtColor = "#ce4f4b";
    const skinColor = "#e8b89c";
    const socksColor = "#ffffff";
    const shoesColor = "#eec752";

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
      ctx.arc(res[0], res[1], r * smallScale, sr, er);
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
      arcToTx(0, 0, 55, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
      // left butt
      ctx.beginPath();
      // ctx.arc(159, 237, 55, 0, 2 * Math.PI);
      arcToTx(-86, 0, 55, 0, 2 * Math.PI);
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

    // first gets drawed will lie in the bottom
    function main() {
      stack.unshift(mat3.clone(stack[0])); // save
      var shinChan = mat3.create();
      mat3.fromTranslation(shinChan, [cx, cy]);
      mat3.rotate(shinChan, shinChan, theta3);
      mat3.scale(shinChan, shinChan, [smallScale, smallScale]);
      mat3.multiply(stack[0], stack[0], shinChan);
      drawShinChan();
      stack.shift();
    }
    main();
  }

  slider1.addEventListener("input", draw);
  draw();
}
window.onload = setup;
