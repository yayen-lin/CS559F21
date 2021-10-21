function setup() {
  var canvas = document.getElementById("hw03Canvas");
  var ctx = canvas.getContext("2d");

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas

    // colors
    const pantsColor = "#f1f388";
    const shirtColor = "#ce4f4b";
    const skinColor = "#e8b89c";
    const socksColor = "#ffffff";
    const shoesColor = "#eec752";

    // ####################################################
    // fucntions borrowed from week4/demo1/demo.js
    var stack = [mat3.create()];

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
    // ####################################################

    function quadraticCurveToTx(cpx, cpy, x, y) {
      var res = vec2.create();
      vec2.transformMat3(res, [x, y], stack[0]);
      ctx.quadraticCurveTo(cpx, cpy, res[0], res[1]);
    }

    function arcToTx(cx, cy, r, rs, re) {}

    // helper function
    // reset line settings back to default
    function resetSetting() {
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 1;
      ctx.fillStyle = "#000";
      ctx.lineJoin = "miter";
    }

    // draw outer circle (the path for Shin-chan to move around)
    function drawCircle() {
      var r = 190;
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, r, 0, 2 * Math.PI);
      ctx.stroke();
    }

    function drawButts() {
      // fill setting
      ctx.fillStyle = skinColor;
      ctx.lineWidth = 2;
      // draw butts
      // right butt
      ctx.beginPath();
      ctx.arc(247, 235, 55, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
      // left butt
      ctx.beginPath();
      ctx.arc(161, 235, 55, 0, 2 * Math.PI);
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

    // TODO: remove test
    function drawTest() {
      // fill setting
      ctx.fillStyle = shirtColor;

      ctx.beginPath();
      moveToTx(0, 0);
      lineToTx(-50, -50);
      ctx.stroke();
    }

    // first gets drawed will lie in the bottom
    function main() {
      drawCircle();

      // #################### draw Shin-chan ####################

      // draw left arm
      stack.unshift(mat3.clone(stack[0])); // save
      var leftArmToCanvas = mat3.create();
      mat3.fromTranslation(leftArmToCanvas, [127, 270]);
      mat3.multiply(stack[0], stack[0], leftArmToCanvas);
      drawArm();

      // draw right arm (center is now at (127, 270))
      stack.unshift(mat3.clone(stack[0]));
      var rightArmToCanvas = mat3.create();
      mat3.fromTranslation(rightArmToCanvas, [157, 0]);
      mat3.scale(rightArmToCanvas, rightArmToCanvas, [-1, 1]);
      mat3.multiply(stack[0], stack[0], rightArmToCanvas);
      drawArm();
      stack.shift(); // restore (center is now back to (127, 270))

      // draw butt
      drawButts();

      // draw pants (center is now at (127, 270))
      var pantsToCanvas = mat3.create();
      mat3.fromTranslation(pantsToCanvas, [-7, 0]);
      mat3.multiply(stack[0], stack[0], pantsToCanvas);
      drawPants();

      // draw left leg
      stack.unshift(mat3.clone(stack[0])); // save status
      var leftLegToCanvas = mat3.create();
      mat3.fromTranslation(leftLegToCanvas, [5, 45]);
      mat3.multiply(stack[0], stack[0], leftLegToCanvas);
      drawLeg();
      drawSock();
      drawShoe();

      // draw right leg
      stack.unshift(mat3.clone(stack[0])); // save status
      var rightLegToCanvas = mat3.create();
      mat3.fromTranslation(rightLegToCanvas, [160, 0]);
      mat3.scale(rightLegToCanvas, rightLegToCanvas, [-1, 1]);
      mat3.multiply(stack[0], stack[0], rightLegToCanvas);
      drawLeg();
      drawSock();
      drawShoe();

      // center at (285, 315)
      stack.shift(); // restore(), center at (125, 315)
      stack.shift(); // restore(), center back to (120, 270)
      // drawTest();
    }

    main();
  }

  draw();
}
window.onload = setup;
