if (!Detector.webgl) {
  Detector.addGetWebGLMessage();
} else {
  // Start app
  // show welcome screen
  d3.json('data/world.json', function (err, data) {
    globe = renderGlobe(data);
    globe.animate();
    welcomeScreen();
  });
}

var audioPlayer = new Audio();