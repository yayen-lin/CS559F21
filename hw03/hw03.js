function setup() {
  var canvas = document.getElementById("hw03Canvas");
  var cxt = canvas.getContext("2d");

  function draw() {
    cxt.clearRect(0, 0, canvas.width, canvas.height); // clear canvas

    var stack = [mat3.create()];

    function drawCircle() {
      var r = 190;
      cxt.beginPath();
      cxt.arc(canvas.width / 2, canvas.height / 2, r, 0, 2 * Math.PI);
      cxt.stroke();
    }

    function drawShinChan() {
      // draw pants
    }

    function main() {
      drawCircle();
    }

    main();
  }

  draw();
}
window.onload = setup;
