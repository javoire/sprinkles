function playArtist(artist, country) {
  fetch('api/toptracks/' + artist + '/' + country).then(function(res){
    return res.json();
  }).then(function (res) {

    var preview_url = res.body.tracks[0].preview_url;

    audioPlayer.src = preview_url;
    audioPlayer.play();
  });
}