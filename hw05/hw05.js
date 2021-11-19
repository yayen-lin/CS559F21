function setup() {
  var canvasObserver = document.getElementById("hw05CanvasObserver");
  var canvasCamera = document.getElementById("hw05CanvasCamera");
  var observerContext = canvasObserver.getContext("2d");
  var cameraContext = canvasCamera.getContext("2d");
  // var slider1 = document.getElementById("slider1");
  // slider1.value = 0;
  var slider2 = document.getElementById("slider2");
  slider2.value = 5;

  var ctx = cameraContext; // default to drawing in the camera window

  function draw() {
    // clear both canvas instances
    ctx.clearRect(0, 0, canvasObserver.width, canvasObserver.height);
    ctx.clearRect(0, 0, canvasCamera.width, canvasCamera.height);

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

    function arcToTx(cx, cy, r, sr, er) {
      var res = vec3.create();
      vec2.transformMat4(res, [cx, cy], stack[0]);
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

    function drawRickFrontSide(TxU, scale) {
      var Tx = mat4.clone(TxU);
      mat4.scale(Tx, Tx, [scale, scale, scale]);
      ctx.beginPath();
      moveToTx([-0.05, -0.05, 0], Tx);
      lineToTx([-0.05, 0.05, 0], Tx);
      lineToTx([0.05, 0.05, 0], Tx);
      lineToTx([0.1, 0, 0], Tx);
      lineToTx([0.05, -0.05, 0], Tx);
      ctx.closePath();
      ctx.fill();
    }

    function drawRickBackSide() {}

    // create two lookAt transforms; one for the camera
    // and one for the "external observer"
    // make sure you understand these
    // Create Camera (lookAt) transform
    var eyeCamera = CameraCurve(viewAngle);
    var targetCamera = vec3.fromValues(0, 0, 0); // Aim at the origin of the world coords
    var upCamera = vec3.fromValues(0, 100, 0); // Y-axis of world coords to be vertical
    var TlookAtCamera = mat4.create();
    // (matrix written into, position of observer, point be looking at, vec3 pointing up)
    mat4.lookAt(TlookAtCamera, eyeCamera, targetCamera, upCamera);

    // Create Observer (lookAt) transform
    var eyeObserver = vec3.fromValues(500, 300, 500);
    var targetObserver = vec3.fromValues(0, 50, 0); // Observer still looks at origin
    var upObserver = vec3.fromValues(0, 1, 0); // Y-axis of world coords to be vertical
    var TlookAtObserver = mat4.create();
    mat4.lookAt(TlookAtObserver, eyeObserver, targetObserver, upObserver);

    // [we only need one viewport transformation for both views]
    // Create ViewPort (canvas coordinate) transform
    // (assumed the same for both canvas instances)
    var Tviewport = mat4.create();
    // Move the center of the "lookAt" transform (where
    // the camera points) to the canvas coordinates (200,300)
    mat4.fromTranslation(Tviewport, [200, 300, 0]);
    // Flip the Y-axis, scale everything by 100x
    mat4.scale(Tviewport, Tviewport, [100, -100, 1]);

    ctx = cameraContext;

    // Create Camera projection transform
    // (orthographic for now)
    var TprojectionCamera = mat4.create();
    mat4.ortho(TprojectionCamera, -100, 100, -100, 100, -1, 1);
    // mat4.perspective(TprojectionCamera, Math.PI / 4, 1, -1, 1); // Use for perspective teaser!

    // Create Observer projection transform
    // (orthographic for now)
    var TprojectionObserver = mat4.create();
    mat4.ortho(TprojectionObserver, -120, 120, -120, 120, -1, 1);

    // Create transform t_VP_PROJ_CAM that incorporates
    // Viewport, projection and camera transforms
    var tVP_PROJ_VIEW_Camera = mat4.create();
    mat4.multiply(tVP_PROJ_VIEW_Camera, Tviewport, TprojectionCamera);
    mat4.multiply(tVP_PROJ_VIEW_Camera, tVP_PROJ_VIEW_Camera, TlookAtCamera);

    // Create transorm tVP_PROJ_VIEW_Observer that incorporates
    // Viewport, projection and observer transforms
    var tVP_PROJ_VIEW_Observer = mat4.create();
    mat4.multiply(tVP_PROJ_VIEW_Observer, Tviewport, TprojectionObserver);
    mat4.multiply(
      tVP_PROJ_VIEW_Observer,
      tVP_PROJ_VIEW_Observer,
      TlookAtObserver
    );

    // [we only need one model transformation for both view]
    // Create model(ing) transform
    // (from moving object to world)
    var Tmodel = mat4.create();
    // mat4.fromTranslation(Tmodel, Ccomp(tParam));
    // var tangent = Ccomp_tangent(tParam);
    // var angle = Math.atan2(tangent[1], tangent[0]);
    // mat4.rotateZ(Tmodel, Tmodel, angle);

    // Create transform t_VP_PROJ_VIEW_MOD that incorporates
    // Viewport, projection, camera, and modeling transform
    var tVP_PROJ_VIEW_MOD_Camera = mat4.create();
    mat4.multiply(tVP_PROJ_VIEW_MOD_Camera, tVP_PROJ_VIEW_Camera, Tmodel);
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

    // Draw the following in the Camera window
    ctx = cameraContext;
    drawRickFrontSide(tVP_PROJ_VIEW_MOD_Camera, 100.0);

    // Draw the following in the Observer window
    ctx = observerContext;
    drawRickFrontSide(tVP_PROJ_VIEW_MOD1_Observer, 100.0);
  }

  // slider1.addEventListener("input", draw);
  slider2.addEventListener("input", draw);
  draw();
}
window.onload = setup;
