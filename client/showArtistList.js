function showArtistList(country) {
  var artistListWrapper = document.getElementById('artist-list');
  artistListWrapper.className = ''; // hide

  var artistListHeader = document.querySelector('#artist-list h2');
  var artistList = document.querySelector('#artist-list ul');
  artistList.innerHTML = '';

  artistListHeader.innerHTML = country.country;

  country.artists.forEach(function(artist){
    var li = document.createElement('li');
    li.innerHTML = artist.artist;
    artistList.appendChild(li);
  });

  artistListWrapper.className = 'show';
}