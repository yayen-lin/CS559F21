function setup() {
  var canvasObserver = document.getElementById("hw05CanvasObserver");
  var canvasCamera = document.getElementById("hw05CanvasCamera");
  var observerContext = canvasObserver.getContext("2d");
  var cameraContext = canvasCamera.getContext("2d");
  // var slider1 = document.getElementById("slider1");
  // slider1.value = 0;
  var slider2 = document.getElementById("slider2");
  slider2.value = 0;

  var ctx = cameraContext; // default to drawing in the camera window

  function draw() {
    // clear both canvas instances
    canvasObserver.width = canvasObserver.width;
    canvasCamera.width = canvasCamera.width;

    // slider vars
    var viewAngle = slider2.value * 0.02 * Math.PI;

    // private settings

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

    var CameraCurve = function (angle) {
      var distance = 120.0;
      var eye = vec3.create();
      eye[0] = distance * Math.sin(viewAngle);
      eye[1] = 100;
      eye[2] = distance * Math.cos(viewAngle);
      return [eye[0], eye[1], eye[2]];
    };

    function drawPortal(TxU) {
      var Tx = mat4.clone(TxU);
      mat4.scale(Tx, Tx, [0.1, 0.0001, 0.1]);
      ctx.beginPath();
      arcToTx([0, 0, 0], Tx, 100, 0, 2 * Math.PI);
      // ctx.stroke();
    }

    function drawRickHeadShape(TxU) {
      // face outline
      var Tx = mat4.clone(TxU);
      ctx.beginPath();

      // draw head shape
      var beginx = -75;
      var beginy = -75;
      moveToTx([beginx, beginy, 0], Tx);
      lineToTx([(beginx += 1), (beginy += 20), 0], Tx);
      lineToTx([(beginx += 2.5), (beginy += 30), 0], Tx);
      lineToTx([(beginx += 4), (beginy += 30), 0], Tx);
      lineToTx([(beginx += 6), (beginy += 30), 0], Tx);
      lineToTx([(beginx += 8), (beginy += 30), 0], Tx);
      lineToTx([(beginx += 10), (beginy += 18), 0], Tx);
      lineToTx([(beginx += 12), (beginy += 16), 0], Tx);
      lineToTx([(beginx += 4), (beginy += 2), 0], Tx);
      lineToTx([(beginx += 2), (beginy += 1.8), 0], Tx);
      lineToTx([(beginx += 2), (beginy += 1.6), 0], Tx);
      lineToTx([(beginx += 2), (beginy += 1.4), 0], Tx);
      lineToTx([(beginx += 2), (beginy += 1.2), 0], Tx);
      lineToTx([(beginx += 2), (beginy += 1), 0], Tx);
      lineToTx([(beginx += 3), (beginy += 0.8), 0], Tx);
      lineToTx([(beginx += 3), (beginy += 0.6), 0], Tx);
      lineToTx([(beginx += 3), (beginy += 0.4), 0], Tx);
      lineToTx([(beginx += 3), (beginy += 0.2), 0], Tx);
      lineToTx([(beginx += 2), (beginy += 0), 0], Tx);

      // symmetric around this point
      lineToTx([(beginx += 2), (beginy += 0.2), 0], Tx);

      lineToTx([(beginx += 2), (beginy += 0), 0], Tx);
      lineToTx([(beginx += 3), (beginy -= 0.2), 0], Tx);
      lineToTx([(beginx += 3), (beginy -= 0.4), 0], Tx);
      lineToTx([(beginx += 3), (beginy -= 0.6), 0], Tx);
      lineToTx([(beginx += 3), (beginy -= 0.8), 0], Tx);
      lineToTx([(beginx += 2), (beginy -= 1), 0], Tx);
      lineToTx([(beginx += 2), (beginy -= 1.2), 0], Tx);
      lineToTx([(beginx += 2), (beginy -= 1.4), 0], Tx);
      lineToTx([(beginx += 2), (beginy -= 1.6), 0], Tx);
      lineToTx([(beginx += 2), (beginy -= 1.8), 0], Tx);
      lineToTx([(beginx += 4), (beginy -= 2), 0], Tx);
      lineToTx([(beginx += 12), (beginy -= 16), 0], Tx);
      lineToTx([(beginx += 10), (beginy -= 18), 0], Tx);
      lineToTx([(beginx += 8), (beginy -= 30), 0], Tx);
      lineToTx([(beginx += 6), (beginy -= 30), 0], Tx);
      lineToTx([(beginx += 4), (beginy -= 30), 0], Tx);
      lineToTx([(beginx += 2.5), (beginy -= 30), 0], Tx);
      lineToTx([(beginx += 1), (beginy -= 20), 0], Tx);
      ctx.stroke();

      // draw right face shape
      ctx.beginPath();
      var faceShapeBeginX = beginx - 10;
      var faceShapeBeginY = beginy + 8;
      moveToTx([faceShapeBeginX, faceShapeBeginY, 0], Tx);
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
      ctx.stroke();

      // draw chin
      ctx.beginPath();
      chineShapeBeginX = faceShapeBeginX + 8;
      chineShapeBeginY = faceShapeBeginY + 4;
      moveToTx([chineShapeBeginX, chineShapeBeginY, 0], Tx);
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
      lineToTx([(chineShapeBeginX -= 3), (chineShapeBeginY -= 0), 0], Tx);
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
      ctx.stroke();

      // draw left face shape
      var faceShapeBeginX = 68;
      var faceShapeBeginY = -70;
      mat4.scale(Tx, Tx, [-1, 1, 1]);
      ctx.beginPath();
      moveToTx([faceShapeBeginX, faceShapeBeginY, 0], Tx);
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
      ctx.stroke();
    }

    function drawRickFrontSide(TxU, scale) {
      drawRickHeadShape(TxU, scale);
    }

    function drawRickBackSide() {}

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
    // the camera points) to the canvas coordinates (250,250)
    mat4.fromTranslation(Tviewport, [
      canvasObserver.width / 2,
      canvasObserver.height / 2,
      0,
    ]);
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
    // mat4.fromTranslation(Tmodel, Ccomp(tParam));
    // var tangent = Ccomp_tangent(tParam);
    // var angle = Math.atan2(tangent[1], tangent[0]);
    // mat4.rotateZ(Tmodel, Tmodel, angle);

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
    drawRickFrontSide(tVP_PROJ_VIEW_MOD_Camera);
    drawPortal(tVP_PROJ_VIEW_MOD_Camera, 100.0);

    // Draw in the Observer window
    ctx = observerContext;
    drawRickFrontSide(tVP_PROJ_VIEW_Observer);
    drawPortal(tVP_PROJ_VIEW_Observer);
  }

  // slider1.addEventListener("input", draw);
  slider2.addEventListener("input", draw);
  draw();
}
window.onload = setup;
