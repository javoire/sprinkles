// AUDIO PLAYER
var audioPlayer = new Audio();

// AUDIO CONTROLS
function playerControls(audio) {
  this.audio = audio;
  this.playing = false;
  this.isClicked = false;
  this.player = document.getElementById('audio-player');
  this.toggler = this.player.querySelector('.toggle');

  this.play = function(controlAudio){
    if(controlAudio) {
      this.audio.play();
    }
    this.playing = true;
    this.toggler.classList.remove('pause')
    this.toggler.classList.add('play');
  }

  this.pause = function(controlAudio){
    if(controlAudio) {
      this.audio.pause();
    }
    this.playing = false;
    this.toggler.classList.remove('play')
    this.toggler.classList.add('pause');
  }


  this.toggle = function(isClick){
    if(this.playing) {
      this.pause(isClick);
    }
    else {
      this.play(isClick)
    }
  };
}

var pc = new playerControls(audioPlayer);
console.log(pc);

pc.toggler.addEventListener('click', function () {
  pc.toggle(true);
});

audioPlayer.addEventListener('play', pc.play.bind(pc));
audioPlayer.addEventListener('pause', pc.pause.bind(pc));

