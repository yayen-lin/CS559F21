function setup() {
  var canvasObserver = document.getElementById("hw05CanvasObserver");
  var canvasCamera = document.getElementById("hw05CanvasCamera");
  var observerContext = canvasObserver.getContext("2d");
  var cameraContext = canvasCamera.getContext("2d");
  var slider = document.getElementById("slider");
  slider.value = 0;

  var ctx = cameraContext; // default to drawing in the camera window

  function draw() {
    // clear both canvas instances
    canvasObserver.width = canvasObserver.width;
    canvasCamera.width = canvasCamera.width;

    // slider vars
    var viewAngle = slider.value * 0.02 * Math.PI;

    // private settings
    skinColor = "#d4cec5";
    hairColor = "#aed8f1";
    mouthColor = "#882c44";
    pukeColor = "#5fa6a8";
    labFloorColor = "#96a6aa";
    rickStrokeColor = "#7141f5";
    labFloorStrokeColor = "#d555e1";

    // helper functions (self-defined and borrowed from lecture)
    function moveToTx(loc, Tx) {
      var res = vec3.create();
      vec3.transformMat4(res, loc, Tx);
      ctx.moveTo(res[0], res[1]);
    }
    function lineToTx(loc, Tx) {
      var res = vec3.create();
      vec3.transformMat4(res, loc, Tx);
      ctx.lineTo(res[0], res[1]);
    }
    function arcToTx(loc, Tx, r, sr, er) {
      var res = vec3.create();
      vec3.transformMat4(res, loc, Tx);
      ctx.arc(res[0], res[1], r, sr, er);
    }

    // drawing objects
    function drawCamera(color, TxU, scale) {
      var Tx = mat4.clone(TxU);
      mat4.scale(Tx, Tx, [scale, scale, scale]);

      ctx.lineWidth = 3;
      ctx.strokeStyle = "black";
      ctx.beginPath();
      arcToTx([-3, -3, 0], Tx, 10, 0, (1 / 2) * Math.PI);
      arcToTx([-3, -3, 2], Tx, 20, 0, (1 / 2) * Math.PI);
      ctx.stroke();

      ctx.beginPath();
      arcToTx([-3, -3, 0], Tx, 10, (1 / 2) * Math.PI, Math.PI);
      arcToTx([-3, -3, 2], Tx, 20, (1 / 2) * Math.PI, Math.PI);
      ctx.stroke();

      ctx.beginPath();
      arcToTx([-3, -3, 0], Tx, 10, Math.PI, (3 / 2) * Math.PI);
      arcToTx([-3, -3, 2], Tx, 20, Math.PI, (3 / 2) * Math.PI);
      ctx.stroke();

      ctx.beginPath();
      arcToTx([-3, -3, 0], Tx, 10, (3 / 2) * Math.PI, 2 * Math.PI);
      arcToTx([-3, -3, 2], Tx, 20, (3 / 2) * Math.PI, 2 * Math.PI);
      ctx.stroke();
    }

    var CameraCurve = function (angle) {
      var distance = 120.0;
      var eye = vec3.create();
      eye[0] = distance * Math.sin(viewAngle);
      eye[1] = 100;
      eye[2] = distance * Math.cos(viewAngle);
      return [eye[0], eye[1], eye[2]];
    };

    function drawRickHeadShape(TxU) {
      ctx.fillStyle = skinColor;
      ctx.lineWidth = 2;
      // face outline
      var Tx = mat4.clone(TxU);
      ctx.beginPath();

      var earSize = 15;
      // draw left ear
      ctx.beginPath();
      arcToTx(
        [-75, -60, 0],
        Tx,
        earSize,
        (11.5 / 20) * Math.PI,
        (31 / 20) * Math.PI
      );
      ctx.fill();
      ctx.stroke();

      // draw right ear
      ctx.beginPath();
      arcToTx(
        [68, -60, 0],
        Tx,
        earSize,
        (30 / 20) * Math.PI,
        (9 / 20) * Math.PI
      );
      ctx.fill();
      ctx.stroke();

      // draw head shape
      var beginX = -75;
      var beginY = -75;
      moveToTx([beginX, beginY + 3, 0], Tx);
      lineToTx([(beginX += 1), (beginY += 20), 0], Tx);
      lineToTx([(beginX += 2.5), (beginY += 30), 0], Tx);
      lineToTx([(beginX += 4), (beginY += 30), 0], Tx);
      lineToTx([(beginX += 6), (beginY += 30), 0], Tx);
      lineToTx([(beginX += 8), (beginY += 30), 0], Tx);
      lineToTx([(beginX += 10), (beginY += 18), 0], Tx);
      lineToTx([(beginX += 12), (beginY += 16), 0], Tx);
      lineToTx([(beginX += 4), (beginY += 2), 0], Tx);
      lineToTx([(beginX += 2), (beginY += 1.8), 0], Tx);
      lineToTx([(beginX += 2), (beginY += 1.6), 0], Tx);
      lineToTx([(beginX += 2), (beginY += 1.4), 0], Tx);
      lineToTx([(beginX += 2), (beginY += 1.2), 0], Tx);
      lineToTx([(beginX += 2), (beginY += 1), 0], Tx);
      lineToTx([(beginX += 3), (beginY += 0.8), 0], Tx);
      lineToTx([(beginX += 3), (beginY += 0.6), 0], Tx);
      lineToTx([(beginX += 3), (beginY += 0.4), 0], Tx);
      lineToTx([(beginX += 3), (beginY += 0.2), 0], Tx);
      lineToTx([(beginX += 2), (beginY += 0), 0], Tx);
      lineToTx([(beginX += 2), (beginY += 0.2), 0], Tx); // symmetric around this point
      lineToTx([(beginX += 2), (beginY += 0), 0], Tx);
      lineToTx([(beginX += 3), (beginY -= 0.2), 0], Tx);
      lineToTx([(beginX += 3), (beginY -= 0.4), 0], Tx);
      lineToTx([(beginX += 3), (beginY -= 0.6), 0], Tx);
      lineToTx([(beginX += 3), (beginY -= 0.8), 0], Tx);
      lineToTx([(beginX += 2), (beginY -= 1), 0], Tx);
      lineToTx([(beginX += 2), (beginY -= 1.2), 0], Tx);
      lineToTx([(beginX += 2), (beginY -= 1.4), 0], Tx);
      lineToTx([(beginX += 2), (beginY -= 1.6), 0], Tx);
      lineToTx([(beginX += 2), (beginY -= 1.8), 0], Tx);
      lineToTx([(beginX += 4), (beginY -= 2), 0], Tx);
      lineToTx([(beginX += 12), (beginY -= 16), 0], Tx);
      lineToTx([(beginX += 10), (beginY -= 18), 0], Tx);
      lineToTx([(beginX += 8), (beginY -= 30), 0], Tx);
      lineToTx([(beginX += 6), (beginY -= 30), 0], Tx);
      lineToTx([(beginX += 4), (beginY -= 30), 0], Tx);
      lineToTx([(beginX += 2.5), (beginY -= 30), 0], Tx);
      lineToTx([(beginX += 1), (beginY -= 20), 0], Tx);

      // draw right face shape
      var faceShapeBeginX = beginX - 10;
      var faceShapeBeginY = beginY + 8;
      // moveToTx([faceShapeBeginX, faceShapeBeginY, 0], Tx);
      lineToTx([faceShapeBeginX, faceShapeBeginY, 0], Tx);
      lineToTx([(faceShapeBeginX += 5), (faceShapeBeginY -= 2), 0], Tx);
      lineToTx([(faceShapeBeginX += 3), (faceShapeBeginY -= 3), 0], Tx);
      lineToTx([(faceShapeBeginX += 3), (faceShapeBeginY -= 5), 0], Tx);
      lineToTx([(faceShapeBeginX += 3.5), (faceShapeBeginY -= 7), 0], Tx);
      lineToTx([(faceShapeBeginX += 2), (faceShapeBeginY -= 7), 0], Tx);
      lineToTx([(faceShapeBeginX += 1.5), (faceShapeBeginY -= 7), 0], Tx);
      lineToTx([(faceShapeBeginX += 0.75), (faceShapeBeginY -= 7), 0], Tx);
      lineToTx([(faceShapeBeginX += 0), (faceShapeBeginY -= 5), 0], Tx); // symmetric around this point
      lineToTx([(faceShapeBeginX -= 0.75), (faceShapeBeginY -= 7), 0], Tx);
      lineToTx([(faceShapeBeginX -= 1.5), (faceShapeBeginY -= 7), 0], Tx);
      lineToTx([(faceShapeBeginX -= 3), (faceShapeBeginY -= 7), 0], Tx);
      lineToTx([(faceShapeBeginX -= 4.5), (faceShapeBeginY -= 7), 0], Tx);
      lineToTx([(faceShapeBeginX -= 4), (faceShapeBeginY -= 5), 0], Tx);
      lineToTx([(faceShapeBeginX -= 4), (faceShapeBeginY -= 3), 0], Tx);
      lineToTx([(faceShapeBeginX -= 4), (faceShapeBeginY -= 2), 0], Tx);

      // draw chin
      chineShapeBeginX = faceShapeBeginX + 8;
      chineShapeBeginY = faceShapeBeginY + 4;
      // moveToTx([chineShapeBeginX, chineShapeBeginY, 0], Tx);
      lineToTx([chineShapeBeginX, chineShapeBeginY, 0], Tx);
      lineToTx([(chineShapeBeginX -= 4), (chineShapeBeginY -= 5), 0], Tx);
      lineToTx([(chineShapeBeginX -= 4), (chineShapeBeginY -= 8), 0], Tx);
      lineToTx([(chineShapeBeginX -= 3), (chineShapeBeginY -= 4), 0], Tx);
      lineToTx([(chineShapeBeginX -= 2), (chineShapeBeginY -= 2), 0], Tx);
      lineToTx([(chineShapeBeginX -= 2), (chineShapeBeginY -= 2), 0], Tx);
      lineToTx([(chineShapeBeginX -= 2), (chineShapeBeginY -= 2), 0], Tx);
      lineToTx([(chineShapeBeginX -= 2), (chineShapeBeginY -= 2), 0], Tx);
      lineToTx([(chineShapeBeginX -= 2), (chineShapeBeginY -= 2), 0], Tx);
      lineToTx([(chineShapeBeginX -= 2), (chineShapeBeginY -= 2), 0], Tx);
      lineToTx([(chineShapeBeginX -= 3), (chineShapeBeginY -= 2), 0], Tx);
      lineToTx([(chineShapeBeginX -= 3), (chineShapeBeginY -= 1.8), 0], Tx);
      lineToTx([(chineShapeBeginX -= 3), (chineShapeBeginY -= 1.6), 0], Tx);
      lineToTx([(chineShapeBeginX -= 3), (chineShapeBeginY -= 1.4), 0], Tx);
      lineToTx([(chineShapeBeginX -= 3), (chineShapeBeginY -= 1.2), 0], Tx);
      lineToTx([(chineShapeBeginX -= 3), (chineShapeBeginY -= 1), 0], Tx);
      lineToTx([(chineShapeBeginX -= 3), (chineShapeBeginY -= 0.9), 0], Tx);
      lineToTx([(chineShapeBeginX -= 3), (chineShapeBeginY -= 0.8), 0], Tx);
      lineToTx([(chineShapeBeginX -= 3), (chineShapeBeginY -= 0.7), 0], Tx);
      lineToTx([(chineShapeBeginX -= 3), (chineShapeBeginY -= 0.6), 0], Tx);
      lineToTx([(chineShapeBeginX -= 3), (chineShapeBeginY -= 0.5), 0], Tx);
      lineToTx([(chineShapeBeginX -= 3), (chineShapeBeginY -= 0.4), 0], Tx);
      lineToTx([(chineShapeBeginX -= 3), (chineShapeBeginY -= 0.3), 0], Tx);
      lineToTx([(chineShapeBeginX -= 3), (chineShapeBeginY -= 0.2), 0], Tx);
      lineToTx([(chineShapeBeginX -= 3), (chineShapeBeginY -= 0.1), 0], Tx);
      lineToTx([(chineShapeBeginX -= 3), (chineShapeBeginY -= 0), 0], Tx); // symmetric around this point
      lineToTx([(chineShapeBeginX -= 3), (chineShapeBeginY += 0.1), 0], Tx);
      lineToTx([(chineShapeBeginX -= 3), (chineShapeBeginY += 0.2), 0], Tx);
      lineToTx([(chineShapeBeginX -= 3), (chineShapeBeginY += 0.3), 0], Tx);
      lineToTx([(chineShapeBeginX -= 3), (chineShapeBeginY += 0.4), 0], Tx);
      lineToTx([(chineShapeBeginX -= 3), (chineShapeBeginY += 0.5), 0], Tx);
      lineToTx([(chineShapeBeginX -= 3), (chineShapeBeginY += 0.6), 0], Tx);
      lineToTx([(chineShapeBeginX -= 3), (chineShapeBeginY += 0.7), 0], Tx);
      lineToTx([(chineShapeBeginX -= 3), (chineShapeBeginY += 0.8), 0], Tx);
      lineToTx([(chineShapeBeginX -= 3), (chineShapeBeginY += 0.9), 0], Tx);
      lineToTx([(chineShapeBeginX -= 3), (chineShapeBeginY += 1), 0], Tx);
      lineToTx([(chineShapeBeginX -= 3), (chineShapeBeginY += 1.2), 0], Tx);
      lineToTx([(chineShapeBeginX -= 3), (chineShapeBeginY += 1.4), 0], Tx);
      lineToTx([(chineShapeBeginX -= 3), (chineShapeBeginY += 1.6), 0], Tx);
      lineToTx([(chineShapeBeginX -= 3), (chineShapeBeginY += 1.8), 0], Tx);
      lineToTx([(chineShapeBeginX -= 3), (chineShapeBeginY += 2), 0], Tx);
      lineToTx([(chineShapeBeginX -= 2), (chineShapeBeginY += 2), 0], Tx);
      lineToTx([(chineShapeBeginX -= 2), (chineShapeBeginY += 2), 0], Tx);
      lineToTx([(chineShapeBeginX -= 2), (chineShapeBeginY += 2), 0], Tx);
      lineToTx([(chineShapeBeginX -= 2), (chineShapeBeginY += 2), 0], Tx);
      lineToTx([(chineShapeBeginX -= 2), (chineShapeBeginY += 2), 0], Tx);
      lineToTx([(chineShapeBeginX -= 2), (chineShapeBeginY += 2), 0], Tx);
      lineToTx([(chineShapeBeginX -= 3), (chineShapeBeginY += 4), 0], Tx);
      lineToTx([(chineShapeBeginX -= 4), (chineShapeBeginY += 8), 0], Tx);
      lineToTx([(chineShapeBeginX -= 4), (chineShapeBeginY += 5), 0], Tx);

      // draw left face shape
      faceShapeBeginX = chineShapeBeginX + 8;
      faceShapeBeginY = chineShapeBeginY - 4;
      lineToTx([(faceShapeBeginX -= 4), (faceShapeBeginY += 2), 0], Tx);
      lineToTx([(faceShapeBeginX -= 4), (faceShapeBeginY += 3), 0], Tx);
      lineToTx([(faceShapeBeginX -= 4), (faceShapeBeginY += 5), 0], Tx);
      lineToTx([(faceShapeBeginX -= 4.5), (faceShapeBeginY += 7), 0], Tx);
      lineToTx([(faceShapeBeginX -= 3), (faceShapeBeginY += 7), 0], Tx);
      lineToTx([(faceShapeBeginX -= 1.5), (faceShapeBeginY += 7), 0], Tx);
      lineToTx([(faceShapeBeginX -= 0.75), (faceShapeBeginY += 7), 0], Tx);
      lineToTx([(faceShapeBeginX += 0), (faceShapeBeginY += 5), 0], Tx); // symmetric around this point
      lineToTx([(faceShapeBeginX += 0.75), (faceShapeBeginY += 7), 0], Tx);
      lineToTx([(faceShapeBeginX += 1.5), (faceShapeBeginY += 7), 0], Tx);
      lineToTx([(faceShapeBeginX += 2), (faceShapeBeginY += 7), 0], Tx);
      lineToTx([(faceShapeBeginX += 3.5), (faceShapeBeginY += 7), 0], Tx);
      lineToTx([(faceShapeBeginX += 3), (faceShapeBeginY += 5), 0], Tx);
      lineToTx([(faceShapeBeginX += 3), (faceShapeBeginY += 3), 0], Tx);
      lineToTx([(faceShapeBeginX += 5), (faceShapeBeginY += 2), 0], Tx);

      ctx.fill();
      ctx.stroke();
    }

    function drawFace(TxU) {
      ctx.lineWidth = 2;

      ctx.fillStyle = hairColor;
      // draw eye brow
      var Tx = mat4.clone(TxU);
      var beginX = -48;
      var beginY = 55;
      ctx.beginPath();
      moveToTx([beginX, beginY, 0], Tx);

      // top side
      lineToTx([(beginX += 2), (beginY += 2), 0], Tx);
      lineToTx([(beginX += 3), (beginY += 2), 0], Tx);
      lineToTx([(beginX += 2.3), (beginY += 2), 0], Tx);
      lineToTx([(beginX += 2.3), (beginY += 1.8), 0], Tx);
      lineToTx([(beginX += 2.3), (beginY += 1.6), 0], Tx);
      lineToTx([(beginX += 2.3), (beginY += 1.4), 0], Tx);
      lineToTx([(beginX += 2.3), (beginY += 1.3), 0], Tx);
      lineToTx([(beginX += 2.3), (beginY += 1.2), 0], Tx);
      lineToTx([(beginX += 2.3), (beginY += 1.1), 0], Tx);
      lineToTx([(beginX += 2.3), (beginY += 1), 0], Tx);
      lineToTx([(beginX += 2.3), (beginY += 0.9), 0], Tx);
      lineToTx([(beginX += 2.3), (beginY += 0.8), 0], Tx);
      lineToTx([(beginX += 2.3), (beginY += 0.7), 0], Tx);
      lineToTx([(beginX += 2.3), (beginY += 0.6), 0], Tx);
      lineToTx([(beginX += 2.3), (beginY += 0.5), 0], Tx);
      lineToTx([(beginX += 2.3), (beginY += 0.4), 0], Tx);
      lineToTx([(beginX += 2.3), (beginY += 0.3), 0], Tx);
      lineToTx([(beginX += 2.3), (beginY += 0.2), 0], Tx);
      lineToTx([(beginX += 2.3), (beginY += 0.1), 0], Tx);
      lineToTx([(beginX += 2.3), (beginY += 0), 0], Tx); // symmetric point
      lineToTx([(beginX += 2.3), (beginY -= 0.1), 0], Tx);
      lineToTx([(beginX += 2.3), (beginY -= 0.2), 0], Tx);
      lineToTx([(beginX += 2.3), (beginY -= 0.3), 0], Tx);
      lineToTx([(beginX += 2.3), (beginY -= 0.4), 0], Tx);
      lineToTx([(beginX += 2.3), (beginY -= 0.5), 0], Tx);
      lineToTx([(beginX += 2.3), (beginY -= 0.6), 0], Tx);
      lineToTx([(beginX += 2.3), (beginY -= 0.7), 0], Tx);
      lineToTx([(beginX += 2.3), (beginY -= 0.8), 0], Tx);
      lineToTx([(beginX += 2.3), (beginY -= 0.9), 0], Tx);
      lineToTx([(beginX += 2.3), (beginY -= 1.0), 0], Tx);
      lineToTx([(beginX += 2.3), (beginY -= 1.1), 0], Tx);
      lineToTx([(beginX += 2.3), (beginY -= 1.2), 0], Tx);
      lineToTx([(beginX += 2.3), (beginY -= 1.3), 0], Tx);
      lineToTx([(beginX += 2.3), (beginY -= 1.4), 0], Tx);
      lineToTx([(beginX += 2.3), (beginY -= 1.6), 0], Tx);
      lineToTx([(beginX += 2.3), (beginY -= 1.8), 0], Tx);
      lineToTx([(beginX += 2.3), (beginY -= 2), 0], Tx);
      lineToTx([(beginX += 3), (beginY -= 2), 0], Tx);
      lineToTx([(beginX += 2), (beginY -= 2), 0], Tx);

      // right side: top trans to bottom eyebrow
      lineToTx([(beginX += 1), (beginY -= 2), 0], Tx);
      lineToTx([(beginX += 0), (beginY -= 2), 0], Tx);
      lineToTx([(beginX -= 0.2), (beginY -= 2), 0], Tx);
      lineToTx([(beginX -= 0.4), (beginY -= 2), 0], Tx);
      lineToTx([(beginX -= 0.6), (beginY -= 2), 0], Tx);
      lineToTx([(beginX -= 0.8), (beginY -= 0.8), 0], Tx);

      // bottom eyebrow
      lineToTx([(beginX -= 2), (beginY += 2), 0], Tx);
      lineToTx([(beginX -= 3), (beginY += 2), 0], Tx);
      lineToTx([(beginX -= 2.3), (beginY += 2), 0], Tx);
      lineToTx([(beginX -= 2.3), (beginY += 1.8), 0], Tx);
      lineToTx([(beginX -= 2.3), (beginY += 1.6), 0], Tx);
      lineToTx([(beginX -= 2.3), (beginY += 1.4), 0], Tx);
      lineToTx([(beginX -= 2.3), (beginY += 1.3), 0], Tx);
      lineToTx([(beginX -= 2.3), (beginY += 1.2), 0], Tx);
      lineToTx([(beginX -= 2.3), (beginY += 1.1), 0], Tx);
      lineToTx([(beginX -= 2.3), (beginY += 1), 0], Tx);
      lineToTx([(beginX -= 2.3), (beginY += 0.9), 0], Tx);
      lineToTx([(beginX -= 2.3), (beginY += 0.8), 0], Tx);
      lineToTx([(beginX -= 2.3), (beginY += 0.7), 0], Tx);
      lineToTx([(beginX -= 2.3), (beginY += 0.6), 0], Tx);
      lineToTx([(beginX -= 2.3), (beginY += 0.5), 0], Tx);
      lineToTx([(beginX -= 2.3), (beginY += 0.4), 0], Tx);
      lineToTx([(beginX -= 2.3), (beginY += 0.3), 0], Tx);
      lineToTx([(beginX -= 2.3), (beginY += 0.2), 0], Tx);
      lineToTx([(beginX -= 2.3), (beginY += 0.1), 0], Tx);
      lineToTx([(beginX -= 2.3), (beginY += 0), 0], Tx);
      lineToTx([(beginX -= 2.3), (beginY += 0.1), 0], Tx);
      lineToTx([(beginX -= 2.3), (beginY -= 0.2), 0], Tx);
      lineToTx([(beginX -= 2.3), (beginY -= 0.3), 0], Tx);
      lineToTx([(beginX -= 2.3), (beginY -= 0.4), 0], Tx);
      lineToTx([(beginX -= 2.3), (beginY -= 0.5), 0], Tx);
      lineToTx([(beginX -= 2.3), (beginY -= 0.6), 0], Tx);
      lineToTx([(beginX -= 2.3), (beginY -= 0.7), 0], Tx);
      lineToTx([(beginX -= 2.3), (beginY -= 0.8), 0], Tx);
      lineToTx([(beginX -= 2.3), (beginY -= 0.9), 0], Tx);
      lineToTx([(beginX -= 2.3), (beginY -= 1), 0], Tx);
      lineToTx([(beginX -= 2.3), (beginY -= 1.1), 0], Tx);
      lineToTx([(beginX -= 2.3), (beginY -= 1.2), 0], Tx);
      lineToTx([(beginX -= 2.3), (beginY -= 1.3), 0], Tx);
      lineToTx([(beginX -= 2.3), (beginY -= 1.4), 0], Tx);
      lineToTx([(beginX -= 2.3), (beginY -= 1.6), 0], Tx);
      lineToTx([(beginX -= 2.3), (beginY -= 1.8), 0], Tx);
      lineToTx([(beginX -= 2.3), (beginY -= 2), 0], Tx);
      lineToTx([(beginX -= 3), (beginY -= 2), 0], Tx);
      lineToTx([(beginX -= 2), (beginY -= 2), 0], Tx);

      // left side: bottom trans to top eyebrow
      lineToTx([(beginX -= 0.8), (beginY += 0.8), 0], Tx);
      lineToTx([(beginX -= 0.6), (beginY += 2), 0], Tx);
      lineToTx([(beginX -= 0.4), (beginY += 2), 0], Tx);
      lineToTx([(beginX -= 0.2), (beginY += 2), 0], Tx);
      lineToTx([(beginX += 0), (beginY += 2), 0], Tx);
      lineToTx([(beginX += 1), (beginY += 0), 0], Tx);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // draw eyes
      var eyeSize = 24; // radius of eye balls

      // left eyes
      ctx.beginPath();
      arcToTx([-37, 0, 0], Tx, eyeSize, (-1 / 3) * Math.PI, 0);
      ctx.stroke();

      ctx.beginPath();
      arcToTx([-37, 0, 0], Tx, eyeSize, Math.PI, (4 / 3) * Math.PI);
      ctx.stroke();

      ctx.beginPath();
      ctx.fillStyle = "white";
      arcToTx([-37, 0, 0], Tx, eyeSize, 0, Math.PI);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // right eyes
      ctx.beginPath();
      arcToTx([30, 0, 0], Tx, eyeSize, (-2 / 7) * Math.PI, (-1 / 7) * Math.PI);
      ctx.stroke();

      ctx.beginPath();
      arcToTx([30, 0, 0], Tx, eyeSize, (8 / 7) * Math.PI, (9 / 7) * Math.PI);
      ctx.stroke();

      ctx.beginPath();
      ctx.fillStyle = "white";
      arcToTx([30, 0, 0], Tx, eyeSize, (-1 / 7) * Math.PI, (8 / 7) * Math.PI);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // draw pupil
      ctx.lineWidth = 4;

      // left pupil
      leftPupilBeginX = -44;
      leftPupilBeginY = -5;
      ctx.beginPath();
      moveToTx([leftPupilBeginX, leftPupilBeginY + 3, 0], Tx);
      lineToTx([leftPupilBeginX, leftPupilBeginY - 12, 0], Tx);

      moveToTx([leftPupilBeginX - 5, leftPupilBeginY, 0], Tx);
      lineToTx([leftPupilBeginX + 5, leftPupilBeginY - 10, 0], Tx);

      moveToTx([leftPupilBeginX + 5, leftPupilBeginY, 0], Tx);
      lineToTx([leftPupilBeginX - 5, leftPupilBeginY - 10, 0], Tx);
      ctx.stroke();

      // right pupil
      rightPupilBeginX = 35;
      rightPupilBeginY = 0;
      ctx.beginPath();
      moveToTx([rightPupilBeginX, rightPupilBeginY + 3, 0], Tx);
      lineToTx([rightPupilBeginX, rightPupilBeginY - 12, 0], Tx);

      moveToTx([rightPupilBeginX - 5, rightPupilBeginY, 0], Tx);
      lineToTx([rightPupilBeginX + 5, rightPupilBeginY - 10, 0], Tx);

      moveToTx([rightPupilBeginX + 5, rightPupilBeginY, 0], Tx);
      lineToTx([rightPupilBeginX - 5, rightPupilBeginY - 10, 0], Tx);

      ctx.stroke();
      ctx.lineWidth = 2; // reset lineWidth

      // draw eye bags

      // left
      ctx.beginPath();
      arcToTx([-37, 0, 0], Tx, 36, (3.5 / 9) * Math.PI, (6.5 / 9) * Math.PI);
      ctx.stroke();
      // right
      ctx.beginPath();
      arcToTx([30, 0, 0], Tx, 35, (3.3 / 9) * Math.PI, (6.3 / 9) * Math.PI);
      ctx.stroke();

      // draw nose

      ctx.beginPath();
      noseBeginX = -13;
      noseBeginY = -35;
      moveToTx([noseBeginX, noseBeginY, 0], Tx);
      lineToTx([(noseBeginX += 0.6), (noseBeginY -= 37), 0], Tx);
      lineToTx([(noseBeginX += 0.6), (noseBeginY -= 1), 0], Tx);
      lineToTx([(noseBeginX += 0.6), (noseBeginY -= 0.9), 0], Tx);
      lineToTx([(noseBeginX += 0.6), (noseBeginY -= 0.8), 0], Tx);
      lineToTx([(noseBeginX += 0.6), (noseBeginY -= 0.7), 0], Tx);
      lineToTx([(noseBeginX += 0.6), (noseBeginY -= 0.6), 0], Tx);
      lineToTx([(noseBeginX += 0.6), (noseBeginY -= 0.5), 0], Tx);
      lineToTx([(noseBeginX += 0.6), (noseBeginY -= 0.4), 0], Tx);
      lineToTx([(noseBeginX += 0.6), (noseBeginY -= 0.3), 0], Tx);
      lineToTx([(noseBeginX += 0.6), (noseBeginY -= 0.2), 0], Tx);
      lineToTx([(noseBeginX += 0.6), (noseBeginY -= 0.1), 0], Tx);
      lineToTx([(noseBeginX += 0.6), (noseBeginY -= 0), 0], Tx);
      lineToTx([(noseBeginX += 0.6), (noseBeginY += 0), 0], Tx);
      lineToTx([(noseBeginX += 0.6), (noseBeginY += 0.1), 0], Tx);
      lineToTx([(noseBeginX += 0.6), (noseBeginY += 0.2), 0], Tx);
      lineToTx([(noseBeginX += 0.6), (noseBeginY += 0.3), 0], Tx);
      lineToTx([(noseBeginX += 0.6), (noseBeginY += 0.4), 0], Tx);
      lineToTx([(noseBeginX += 0.6), (noseBeginY += 0.5), 0], Tx);
      lineToTx([(noseBeginX += 0.6), (noseBeginY += 0.6), 0], Tx);
      lineToTx([(noseBeginX += 0.6), (noseBeginY += 0.7), 0], Tx);
      lineToTx([(noseBeginX += 0.6), (noseBeginY += 0.8), 0], Tx);
      lineToTx([(noseBeginX += 0.6), (noseBeginY += 0.9), 0], Tx);
      lineToTx([(noseBeginX += 0.6), (noseBeginY += 1), 0], Tx);
      lineToTx([(noseBeginX += 0.6), (noseBeginY += 37), 0], Tx);
      ctx.stroke();

      // draw mouth
      ctx.fillStyle = mouthColor;
      ctx.beginPath();
      mouthBeginX = -53;
      mouthBeginY = -80;
      moveToTx([mouthBeginX, mouthBeginY, 0], Tx);
      lineToTx([(mouthBeginX += 2), (mouthBeginY -= 0.1), 0], Tx);
      lineToTx([(mouthBeginX += 2), (mouthBeginY -= 0.2), 0], Tx);
      lineToTx([(mouthBeginX += 2), (mouthBeginY -= 0.3), 0], Tx);
      lineToTx([(mouthBeginX += 2), (mouthBeginY -= 0.4), 0], Tx);
      lineToTx([(mouthBeginX += 2), (mouthBeginY -= 0.5), 0], Tx);
      lineToTx([(mouthBeginX += 2), (mouthBeginY -= 0.6), 0], Tx);
      lineToTx([(mouthBeginX += 2), (mouthBeginY -= 0.7), 0], Tx);
      lineToTx([(mouthBeginX += 2), (mouthBeginY -= 0.8), 0], Tx);
      lineToTx([(mouthBeginX += 2), (mouthBeginY -= 0.9), 0], Tx);
      lineToTx([(mouthBeginX += 2), (mouthBeginY -= 1.0), 0], Tx);
      lineToTx([(mouthBeginX += 2), (mouthBeginY -= 1.1), 0], Tx);
      lineToTx([(mouthBeginX += 2), (mouthBeginY -= 1.2), 0], Tx);
      lineToTx([(mouthBeginX += 2), (mouthBeginY -= 1.3), 0], Tx);
      lineToTx([(mouthBeginX += 2), (mouthBeginY -= 1.4), 0], Tx);
      lineToTx([(mouthBeginX += 2), (mouthBeginY -= 1.5), 0], Tx);
      lineToTx([(mouthBeginX += 2), (mouthBeginY -= 1.6), 0], Tx);
      lineToTx([(mouthBeginX += 2), (mouthBeginY -= 1.4), 0], Tx);
      lineToTx([(mouthBeginX += 2), (mouthBeginY -= 1.2), 0], Tx);
      lineToTx([(mouthBeginX += 2), (mouthBeginY -= 1), 0], Tx);
      lineToTx([(mouthBeginX += 2), (mouthBeginY -= 0.8), 0], Tx);
      lineToTx([(mouthBeginX += 2), (mouthBeginY -= 0.6), 0], Tx);
      lineToTx([(mouthBeginX += 2), (mouthBeginY -= 0.4), 0], Tx);
      lineToTx([(mouthBeginX += 2), (mouthBeginY -= 0.2), 0], Tx);
      lineToTx([(mouthBeginX += 2), (mouthBeginY -= 0), 0], Tx);
      lineToTx([(mouthBeginX += 2), (mouthBeginY += 0.2), 0], Tx);
      lineToTx([(mouthBeginX += 2), (mouthBeginY += 0.4), 0], Tx);
      lineToTx([(mouthBeginX += 2), (mouthBeginY += 0.6), 0], Tx);
      lineToTx([(mouthBeginX += 2), (mouthBeginY += 0.8), 0], Tx);
      lineToTx([(mouthBeginX += 2), (mouthBeginY += 1.0), 0], Tx);
      lineToTx([(mouthBeginX += 2), (mouthBeginY += 1.2), 0], Tx);
      lineToTx([(mouthBeginX += 2), (mouthBeginY += 1.4), 0], Tx);
      lineToTx([(mouthBeginX += 2), (mouthBeginY += 1.6), 0], Tx);
      lineToTx([(mouthBeginX += 2), (mouthBeginY += 1.5), 0], Tx);
      lineToTx([(mouthBeginX += 2), (mouthBeginY += 1.4), 0], Tx);
      lineToTx([(mouthBeginX += 2), (mouthBeginY += 1.3), 0], Tx);
      lineToTx([(mouthBeginX += 2), (mouthBeginY += 1.2), 0], Tx);
      lineToTx([(mouthBeginX += 2), (mouthBeginY += 1.1), 0], Tx);
      lineToTx([(mouthBeginX += 2), (mouthBeginY += 1), 0], Tx);
      lineToTx([(mouthBeginX += 2), (mouthBeginY += 0.9), 0], Tx);
      lineToTx([(mouthBeginX += 2), (mouthBeginY += 0.8), 0], Tx);
      lineToTx([(mouthBeginX += 2), (mouthBeginY += 0.7), 0], Tx);
      lineToTx([(mouthBeginX += 2), (mouthBeginY += 0.6), 0], Tx);
      lineToTx([(mouthBeginX += 2), (mouthBeginY += 0.5), 0], Tx);
      lineToTx([(mouthBeginX += 2), (mouthBeginY += 0.4), 0], Tx);
      lineToTx([(mouthBeginX += 2), (mouthBeginY += 0.3), 0], Tx);
      lineToTx([(mouthBeginX += 2), (mouthBeginY += 0.2), 0], Tx);
      lineToTx([(mouthBeginX += 2), (mouthBeginY += 0.1), 0], Tx);
      lineToTx([(mouthBeginX += 2), (mouthBeginY += 0), 0], Tx);

      lineToTx([(mouthBeginX += 5), (mouthBeginY -= 2), 0], Tx); // trans to bot mouth
      lineToTx([(mouthBeginX += 3), (mouthBeginY -= 3), 0], Tx);
      lineToTx([(mouthBeginX += 3), (mouthBeginY -= 4), 0], Tx);
      lineToTx([(mouthBeginX += 3.5), (mouthBeginY -= 5), 0], Tx);
      lineToTx([(mouthBeginX += 2), (mouthBeginY -= 5), 0], Tx);
      lineToTx([(mouthBeginX += 1.5), (mouthBeginY -= 5), 0], Tx);
      lineToTx([(mouthBeginX += 0), (mouthBeginY -= 2), 0], Tx);
      lineToTx([(mouthBeginX += 0), (mouthBeginY -= 3), 0], Tx);
      lineToTx([(mouthBeginX += 0), (mouthBeginY -= 2), 0], Tx);
      lineToTx([(mouthBeginX -= 1.5), (mouthBeginY -= 3), 0], Tx);
      lineToTx([(mouthBeginX -= 2), (mouthBeginY -= 5), 0], Tx);
      lineToTx([(mouthBeginX -= 3.5), (mouthBeginY -= 5), 0], Tx);
      lineToTx([(mouthBeginX -= 3), (mouthBeginY -= 4), 0], Tx);
      lineToTx([(mouthBeginX -= 3), (mouthBeginY -= 3), 0], Tx);
      lineToTx([(mouthBeginX -= 2), (mouthBeginY -= 2), 0], Tx);

      lineToTx([(mouthBeginX -= 2), (mouthBeginY -= 1.9), 0], Tx); // bot mouth
      lineToTx([(mouthBeginX -= 2), (mouthBeginY -= 1.8), 0], Tx);
      lineToTx([(mouthBeginX -= 2), (mouthBeginY -= 1.7), 0], Tx);
      lineToTx([(mouthBeginX -= 2), (mouthBeginY -= 1.6), 0], Tx);
      lineToTx([(mouthBeginX -= 2), (mouthBeginY -= 1.5), 0], Tx);
      lineToTx([(mouthBeginX -= 2), (mouthBeginY -= 1.4), 0], Tx);
      lineToTx([(mouthBeginX -= 2), (mouthBeginY -= 1.3), 0], Tx);
      lineToTx([(mouthBeginX -= 2), (mouthBeginY -= 1.2), 0], Tx);
      lineToTx([(mouthBeginX -= 2), (mouthBeginY -= 1.1), 0], Tx);
      lineToTx([(mouthBeginX -= 2), (mouthBeginY -= 1.0), 0], Tx);
      lineToTx([(mouthBeginX -= 2), (mouthBeginY -= 0.9), 0], Tx);
      lineToTx([(mouthBeginX -= 2), (mouthBeginY -= 0.8), 0], Tx);
      lineToTx([(mouthBeginX -= 2), (mouthBeginY -= 0.7), 0], Tx);
      lineToTx([(mouthBeginX -= 2), (mouthBeginY -= 0.6), 0], Tx);
      lineToTx([(mouthBeginX -= 2), (mouthBeginY -= 0.5), 0], Tx);
      lineToTx([(mouthBeginX -= 2), (mouthBeginY -= 0.4), 0], Tx);
      lineToTx([(mouthBeginX -= 2), (mouthBeginY -= 0.3), 0], Tx);
      lineToTx([(mouthBeginX -= 2), (mouthBeginY -= 0.2), 0], Tx);
      lineToTx([(mouthBeginX -= 2), (mouthBeginY -= 0.1), 0], Tx);
      lineToTx([(mouthBeginX -= 2), (mouthBeginY -= 0), 0], Tx);
      lineToTx([(mouthBeginX -= 2), (mouthBeginY -= 0), 0], Tx);
      lineToTx([(mouthBeginX -= 2), (mouthBeginY -= 0), 0], Tx);
      lineToTx([(mouthBeginX -= 2), (mouthBeginY -= 0), 0], Tx);
      lineToTx([(mouthBeginX -= 2), (mouthBeginY -= 0), 0], Tx);
      lineToTx([(mouthBeginX -= 2), (mouthBeginY -= 0), 0], Tx);
      lineToTx([(mouthBeginX -= 2), (mouthBeginY -= 0), 0], Tx);
      lineToTx([(mouthBeginX -= 2), (mouthBeginY -= 0), 0], Tx);
      lineToTx([(mouthBeginX -= 2), (mouthBeginY -= 0), 0], Tx);
      lineToTx([(mouthBeginX -= 2), (mouthBeginY += 0.1), 0], Tx);
      lineToTx([(mouthBeginX -= 2), (mouthBeginY += 0.2), 0], Tx);
      lineToTx([(mouthBeginX -= 2), (mouthBeginY += 0.3), 0], Tx);
      lineToTx([(mouthBeginX -= 2), (mouthBeginY += 0.4), 0], Tx);
      lineToTx([(mouthBeginX -= 2), (mouthBeginY += 0.5), 0], Tx);
      lineToTx([(mouthBeginX -= 2), (mouthBeginY += 0.6), 0], Tx);
      lineToTx([(mouthBeginX -= 2), (mouthBeginY += 0.7), 0], Tx);
      lineToTx([(mouthBeginX -= 2), (mouthBeginY += 0.8), 0], Tx);
      lineToTx([(mouthBeginX -= 2), (mouthBeginY += 0.9), 0], Tx);
      lineToTx([(mouthBeginX -= 2), (mouthBeginY += 1.0), 0], Tx);
      lineToTx([(mouthBeginX -= 2), (mouthBeginY += 1.1), 0], Tx);
      lineToTx([(mouthBeginX -= 2), (mouthBeginY += 1.2), 0], Tx);
      lineToTx([(mouthBeginX -= 2), (mouthBeginY += 1.3), 0], Tx);
      lineToTx([(mouthBeginX -= 2), (mouthBeginY += 1.4), 0], Tx);
      lineToTx([(mouthBeginX -= 2), (mouthBeginY += 1.5), 0], Tx);
      lineToTx([(mouthBeginX -= 2), (mouthBeginY += 1.6), 0], Tx);
      lineToTx([(mouthBeginX -= 2), (mouthBeginY += 1.7), 0], Tx);
      lineToTx([(mouthBeginX -= 2), (mouthBeginY += 1.8), 0], Tx);
      lineToTx([(mouthBeginX -= 2), (mouthBeginY += 1.9), 0], Tx);
      lineToTx([(mouthBeginX -= 2), (mouthBeginY += 2), 0], Tx);

      // trans to bot mouth
      lineToTx([(mouthBeginX -= 2), (mouthBeginY += 2), 0], Tx); //
      lineToTx([(mouthBeginX -= 3), (mouthBeginY += 3), 0], Tx);
      lineToTx([(mouthBeginX -= 3), (mouthBeginY += 4), 0], Tx);
      lineToTx([(mouthBeginX -= 3.5), (mouthBeginY += 4), 0], Tx);
      lineToTx([(mouthBeginX -= 2), (mouthBeginY += 5), 0], Tx);
      lineToTx([(mouthBeginX -= 1.5), (mouthBeginY += 5), 0], Tx);
      lineToTx([(mouthBeginX -= 0), (mouthBeginY += 2), 0], Tx);
      lineToTx([(mouthBeginX -= 0), (mouthBeginY += 3), 0], Tx);
      lineToTx([(mouthBeginX -= 0), (mouthBeginY += 2), 0], Tx);
      lineToTx([(mouthBeginX += 1.5), (mouthBeginY += 3), 0], Tx);
      lineToTx([(mouthBeginX += 2), (mouthBeginY += 5), 0], Tx);
      lineToTx([(mouthBeginX += 3.5), (mouthBeginY += 5), 0], Tx);

      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // draw puke
      ctx.fillStyle = pukeColor;
      pukeBeginX = -25;
      pukeBeginY = -150;
      ctx.beginPath();
      moveToTx([pukeBeginX, pukeBeginY, 0], Tx);
      lineToTx([pukeBeginX, (pukeBeginY -= 5), 0], Tx);
      lineToTx([(pukeBeginX += 0.1), (pukeBeginY -= 1), 0], Tx);
      lineToTx([(pukeBeginX += 0.2), (pukeBeginY -= 0.9), 0], Tx);
      lineToTx([(pukeBeginX += 0.3), (pukeBeginY -= 0.8), 0], Tx);
      lineToTx([(pukeBeginX += 0.4), (pukeBeginY -= 0.7), 0], Tx);
      lineToTx([(pukeBeginX += 0.5), (pukeBeginY -= 0.6), 0], Tx);
      lineToTx([(pukeBeginX += 0.6), (pukeBeginY -= 0.5), 0], Tx);
      lineToTx([(pukeBeginX += 0.7), (pukeBeginY -= 0.4), 0], Tx);
      lineToTx([(pukeBeginX += 0.8), (pukeBeginY -= 0.3), 0], Tx);
      lineToTx([(pukeBeginX += 0.9), (pukeBeginY -= 0.2), 0], Tx);
      lineToTx([(pukeBeginX += 1), (pukeBeginY -= 0.1), 0], Tx);
      lineToTx([(pukeBeginX += 3), (pukeBeginY -= 0), 0], Tx);
      lineToTx([(pukeBeginX += 0.1), (pukeBeginY -= 0.1), 0], Tx);
      lineToTx([(pukeBeginX += 0.1), (pukeBeginY -= 0.2), 0], Tx);
      lineToTx([(pukeBeginX += 0.1), (pukeBeginY -= 0.3), 0], Tx);
      lineToTx([(pukeBeginX += 0.1), (pukeBeginY -= 0.4), 0], Tx);
      lineToTx([(pukeBeginX += 0.1), (pukeBeginY -= 0.5), 0], Tx);
      lineToTx([(pukeBeginX += 0.1), (pukeBeginY -= 0.6), 0], Tx);
      lineToTx([(pukeBeginX += 0.1), (pukeBeginY -= 0.7), 0], Tx);
      lineToTx([(pukeBeginX += 0.1), (pukeBeginY -= 0.8), 0], Tx);
      lineToTx([(pukeBeginX += 0.1), (pukeBeginY -= 0.9), 0], Tx);
      lineToTx([(pukeBeginX += 0.1), (pukeBeginY -= 1), 0], Tx);
      lineToTx([(pukeBeginX += 0.1), (pukeBeginY -= 15), 0], Tx);
      lineToTx([(pukeBeginX += 0.6), (pukeBeginY -= 1), 0], Tx);
      lineToTx([(pukeBeginX += 0.6), (pukeBeginY -= 0.9), 0], Tx);
      lineToTx([(pukeBeginX += 0.6), (pukeBeginY -= 0.8), 0], Tx);
      lineToTx([(pukeBeginX += 0.6), (pukeBeginY -= 0.7), 0], Tx);
      lineToTx([(pukeBeginX += 0.6), (pukeBeginY -= 0.6), 0], Tx);
      lineToTx([(pukeBeginX += 0.6), (pukeBeginY -= 0.5), 0], Tx);
      lineToTx([(pukeBeginX += 0.6), (pukeBeginY -= 0.4), 0], Tx);
      lineToTx([(pukeBeginX += 0.6), (pukeBeginY -= 0.3), 0], Tx);
      lineToTx([(pukeBeginX += 0.6), (pukeBeginY -= 0.2), 0], Tx);
      lineToTx([(pukeBeginX += 0.6), (pukeBeginY -= 0.1), 0], Tx);
      lineToTx([(pukeBeginX += 0.6), (pukeBeginY -= 0), 0], Tx);
      lineToTx([(pukeBeginX += 0.6), (pukeBeginY += 0), 0], Tx);
      lineToTx([(pukeBeginX += 0.6), (pukeBeginY += 0.1), 0], Tx);
      lineToTx([(pukeBeginX += 0.6), (pukeBeginY += 0.2), 0], Tx);
      lineToTx([(pukeBeginX += 0.6), (pukeBeginY += 0.3), 0], Tx);
      lineToTx([(pukeBeginX += 0.6), (pukeBeginY += 0.4), 0], Tx);
      lineToTx([(pukeBeginX += 0.6), (pukeBeginY += 0.5), 0], Tx);
      lineToTx([(pukeBeginX += 0.6), (pukeBeginY += 0.6), 0], Tx);
      lineToTx([(pukeBeginX += 0.6), (pukeBeginY += 0.7), 0], Tx);
      lineToTx([(pukeBeginX += 0.6), (pukeBeginY += 0.8), 0], Tx);
      lineToTx([(pukeBeginX += 0.6), (pukeBeginY += 0.9), 0], Tx);
      lineToTx([(pukeBeginX += 0.6), (pukeBeginY += 1), 0], Tx);
      lineToTx([(pukeBeginX += 3), (pukeBeginY += 15), 0], Tx);
      lineToTx([(pukeBeginX += 0.2), (pukeBeginY += 0.1), 0], Tx);
      lineToTx([(pukeBeginX += 0.4), (pukeBeginY += 0.1), 0], Tx);
      lineToTx([(pukeBeginX += 0.6), (pukeBeginY += 0.1), 0], Tx);
      lineToTx([(pukeBeginX += 0.8), (pukeBeginY += 0.1), 0], Tx);
      lineToTx([(pukeBeginX += 1.0), (pukeBeginY += 0.1), 0], Tx);
      lineToTx([(pukeBeginX += 1.2), (pukeBeginY += 0.4), 0], Tx);
      lineToTx([(pukeBeginX += 1.4), (pukeBeginY += 0.6), 0], Tx);
      lineToTx([(pukeBeginX += 1.6), (pukeBeginY += 0.8), 0], Tx);
      lineToTx([(pukeBeginX += 1.8), (pukeBeginY += 1.0), 0], Tx);
      lineToTx([(pukeBeginX += 2.0), (pukeBeginY += 1.2), 0], Tx);
      lineToTx([(pukeBeginX += 2.0), (pukeBeginY += 0.8), 0], Tx);
      lineToTx([(pukeBeginX += 2.0), (pukeBeginY += 0.8), 0], Tx);
      lineToTx([(pukeBeginX += 2.0), (pukeBeginY += 0.8), 0], Tx);
      lineToTx([(pukeBeginX += 0.2), (pukeBeginY += 0.9), 0], Tx);
      lineToTx([(pukeBeginX += 0.2), (pukeBeginY += 1.0), 0], Tx);
      lineToTx([(pukeBeginX += 0.2), (pukeBeginY += 1.1), 0], Tx);
      lineToTx([(pukeBeginX += 0.2), (pukeBeginY += 1.2), 0], Tx);
      lineToTx([(pukeBeginX += 0.2), (pukeBeginY += 1.3), 0], Tx);
      lineToTx([(pukeBeginX += 0.2), (pukeBeginY += 1.4), 0], Tx);
      lineToTx([(pukeBeginX += 0.2), (pukeBeginY += 1.5), 0], Tx);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }

    function drawHair(TxU) {
      ctx.fillStyle = hairColor;
      ctx.lineWidth = 2;

      var Tx = mat4.clone(TxU);
      var beginX = -88;
      var beginY = -100;
      ctx.beginPath();
      // from left bottom to right bottom
      moveToTx([beginX, beginY, 0], Tx);
      // 1
      lineToTx([(beginX -= 20), (beginY -= 10), 0], Tx);
      lineToTx([(beginX += 15), (beginY += 30), 0], Tx);
      // 2
      lineToTx([(beginX -= 30), (beginY += 15), 0], Tx);
      lineToTx([(beginX += 30), (beginY += 30), 0], Tx);
      // 3
      lineToTx([(beginX -= 35), (beginY += 25), 0], Tx);
      lineToTx([(beginX += 35), (beginY += 25), 0], Tx);
      // 4
      lineToTx([(beginX -= 40), (beginY += 45), 0], Tx);
      lineToTx([(beginX += 55), (beginY += 15), 0], Tx);
      // 5
      lineToTx([(beginX -= 35), (beginY += 65), 0], Tx);
      lineToTx([(beginX += 60), (beginY -= 15), 0], Tx);
      // 6
      lineToTx([(beginX += 0), (beginY += 80), 0], Tx);
      lineToTx([(beginX += 40), (beginY -= 55), 0], Tx);
      // 7
      lineToTx([(beginX += 25), (beginY += 70), 0], Tx);
      lineToTx([(beginX += 20), (beginY -= 75), 0], Tx);
      // 8
      lineToTx([(beginX += 55), (beginY += 30), 0], Tx);
      lineToTx([(beginX -= 15), (beginY -= 70), 0], Tx);
      // 9
      lineToTx([(beginX += 50), (beginY -= 20), 0], Tx);
      lineToTx([(beginX -= 30), (beginY -= 40), 0], Tx);
      // 10
      lineToTx([(beginX += 40), (beginY -= 35), 0], Tx);
      lineToTx([(beginX -= 40), (beginY -= 30), 0], Tx);
      // 11
      lineToTx([(beginX += 25), (beginY -= 40), 0], Tx);
      lineToTx([(beginX -= 30), (beginY -= 10), 0], Tx);
      // 12
      lineToTx([(beginX += 15), (beginY -= 35), 0], Tx);
      lineToTx([(beginX -= 25), (beginY += 5), 0], Tx);

      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }

    function drawBackground(TxU) {
      var Tx = mat4.clone(TxU);
      ctx.strokeStyle = labFloorStrokeColor;
      ctx.fillStyle = labFloorColor;
      ctx.lineWidth = 3;

      beginX = 240;
      beginY = -200;

      ctx.beginPath();
      moveToTx([beginX, beginY, 0], Tx);
      lineToTx([(beginX -= 400), beginY, 0], Tx);
      lineToTx([beginX, (beginY += 600), 0], Tx);
      moveToTx([-160, -200, 0], Tx);
      lineToTx([-160, -200, 400], Tx);
      ctx.fill();
      ctx.stroke();
    }

    function drawObject(TxU) {
      ctx.strokeStyle = rickStrokeColor;
      drawHair(TxU);
      drawRickHeadShape(TxU);
      drawFace(TxU);
    }

    //  -------------------------- LookAt transforms --------------------------

    // lookAt trasnsform for "Camera" view
    var eyeCamera = CameraCurve(viewAngle);
    var targetCamera = vec3.fromValues(0, 0, 0); // Camera points at the origin of the world coords
    var upCamera = vec3.fromValues(0, 100, 0); // Y-axis of world coords to be vertical
    var TlookAtCamera = mat4.create();
    // parameters for lookAt():
    // (matrix written into, position of camera, point be looking at, vec3 pointing up)
    mat4.lookAt(TlookAtCamera, eyeCamera, targetCamera, upCamera);

    // lookAt transform for "Observer" view
    var eyeObserver = vec3.fromValues(500, 300, 500);
    var targetObserver = vec3.fromValues(0, 50, 0); // Observer still looks at origin
    var upObserver = vec3.fromValues(0, 1, 0); // Y-axis of world coords to be vertical
    var TlookAtObserver = mat4.create();
    mat4.lookAt(TlookAtObserver, eyeObserver, targetObserver, upObserver);

    // ------------------------- Viewpoint transforms -------------------------
    // ------------- (assumed the same for both canvas instances) -------------

    // create viewpoint transform
    var Tviewport = mat4.create();
    // Move the center of the "lookAt" transform (where
    // the camera points) to the canvas coordinates
    mat4.fromTranslation(Tviewport, [400 / 2 + 65, 400 / 2 + 40, 0]);
    // Flip the Y-axis, scale everything by 100x
    mat4.scale(Tviewport, Tviewport, [100, -100, 1]);

    // ------------------------ Projection transforms -------------------------

    // orthographic projection transform for "Camera" view
    var TprojectionCamera = mat4.create();
    mat4.ortho(TprojectionCamera, -100, 100, -100, 100, -1, 1);

    // orthographic projection transform for "Observer" view
    var TprojectionObserver = mat4.create();
    mat4.ortho(TprojectionObserver, -120, 120, -120, 120, -1, 1);

    // ---------------------- incorportes transforms -01 ----------------------
    // ------ (incorporates viewport, projection, and lookAt transforms) ------

    // for "Camera" view
    var tVP_PROJ_VIEW_Camera = mat4.create();
    mat4.multiply(tVP_PROJ_VIEW_Camera, Tviewport, TprojectionCamera);
    mat4.multiply(tVP_PROJ_VIEW_Camera, tVP_PROJ_VIEW_Camera, TlookAtCamera);

    // for "Observer" view
    var tVP_PROJ_VIEW_Observer = mat4.create();
    mat4.multiply(tVP_PROJ_VIEW_Observer, Tviewport, TprojectionObserver);
    mat4.multiply(
      tVP_PROJ_VIEW_Observer,
      tVP_PROJ_VIEW_Observer,
      TlookAtObserver
    );

    // --------------------------- Model transforms ---------------------------
    // -------- (we only need one model transformation for both view) ---------

    // from moving object to world
    var Tmodel = mat4.create();

    // ---------------------- incorportes transforms -02 ----------------------
    // ----- (incorporates viewport, projection, lookAt, model transforms) ----

    // for "Camera" view
    var tVP_PROJ_VIEW_MOD_Camera = mat4.create();
    mat4.multiply(tVP_PROJ_VIEW_MOD_Camera, tVP_PROJ_VIEW_Camera, Tmodel);

    // for "Observer" view
    var tVP_PROJ_VIEW_MOD1_Observer = mat4.create();
    mat4.multiply(tVP_PROJ_VIEW_MOD1_Observer, tVP_PROJ_VIEW_Observer, Tmodel);

    var tVP_PROJ_VIEW_MOD2_Observer = mat4.create();
    mat4.translate(
      tVP_PROJ_VIEW_MOD2_Observer,
      tVP_PROJ_VIEW_Observer,
      eyeCamera
    );
    var TlookFromCamera = mat4.create();
    mat4.invert(TlookFromCamera, TlookAtCamera);
    mat4.multiply(
      tVP_PROJ_VIEW_MOD2_Observer,
      tVP_PROJ_VIEW_MOD2_Observer,
      TlookFromCamera
    );

    // Draw in the Camera window
    ctx = cameraContext;
    drawBackground(tVP_PROJ_VIEW_Camera);
    drawObject(tVP_PROJ_VIEW_MOD_Camera);

    // Draw in the Observer window
    ctx = observerContext;
    drawBackground(tVP_PROJ_VIEW_Observer);
    drawObject(tVP_PROJ_VIEW_Observer);
    drawCamera("purple", tVP_PROJ_VIEW_MOD2_Observer, 15.0);
  }

  slider.addEventListener("input", draw);
  draw();
}
window.onload = setup;
