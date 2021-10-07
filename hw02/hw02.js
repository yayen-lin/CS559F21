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

    var center_x = canvas.width / 2;
    var center_y = canvas.height / 2;
    var tire_size = ((canvas.width / 2) * 3) / 4;
    var tire_thickness = tire_size - 25;
    var rim_outline = tire_thickness - 5;

    /**
     * Return the radian of a given degree
     * @param {*} degree: to be converted to radian
     * @returns a radian of float type
     */
    function toRadian(degree) {
      return (degree * Math.PI) / 180;
    }

    function drawRim() {
      // ################################## draw tire ##################################
      // draw outer tire
      cnt.beginPath();
      cnt.arc(center_x, center_y, tire_size, toRadian(0), toRadian(360));
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
    }

    function rotateRim() {
      cnt.translate(center_x, center_y);
      cnt.rotate(toRadian(-5));
      cnt.translate(-center_x, -center_y);
      drawRim();
    }

    // drawRim();

    // cnt.translate(center_x, center_y);

    // var turnsPerSecond = 3;
    // var speed = (turnsPerSecond * 2 * Math.PI) / 1000; // in radian per millisecond
    // cnt.rotate(speed);
    // // cnt.translate(105, 0);

    var rnd = Math.ceil(Math.random() * 100);
    rotateRim();
    // window.addEventListener("click", mouseClick, false);

    window.requestAnimationFrame(draw);
  };

  draw();
};

window.onload = setup;
