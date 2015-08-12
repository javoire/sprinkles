function showArtistList(country) {
  var artistListWrapper = document.getElementById('artist-list');
  var artistList = document.querySelector('#artist-list ul');

  artistListWrapper.className = ''; // hide
  artistList.className = ''; // reset columns

  // keeping track of the active list element for removing the active class form it
  var playingItem = null;

  var artistListHeader = document.querySelector('#artist-list h2');
  artistList.innerHTML = '';

  artistListHeader.innerHTML = country.country;

  if (country.artists.length > 10) {
    artistList.className = 'columns';
  };

  // save artist nodes for quick access
  var artistNodes = {};

  country.artists.forEach(function(artist){
    
    var icon = document.createElement('div');
    icon.className = 'icon';

    var li = document.createElement('li');
    var text = document.createTextNode(artist.artist);
    li.appendChild(icon);
    li.appendChild(text);
    artistList.appendChild(li);
    artistNodes[artist.artist] = li;

    li.addEventListener('click', function() {
      if(playingItem) playingItem.classList.remove('playing');

      playingItem = li;
      li.classList.add('playing');
      playArtist(artist.artist, country.country)
    });
  });

  // play the first artist in the list
  artistNodes[country.artists[0].artist].classList.add('playing');
  playingItem = artistNodes[country.artists[0].artist];
  playArtist(country.artists[0].artist, country.country);

  artistListWrapper.className = 'show';
}