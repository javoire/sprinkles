function showArtistList(country) {
  var artistListWrapper = document.getElementById('artist-list');
  var artistList = document.querySelector('#artist-list ul');

  artistListWrapper.className = ''; // hide
  artistList.className = ''; // reset columns

  var artistListHeader = document.querySelector('#artist-list h2');
  artistList.innerHTML = '';

  artistListHeader.innerHTML = country.country;

  if (country.artists.length > 10) {
    artistList.className = 'columns';
  };

  country.artists.forEach(function(artist){
    var li = document.createElement('li');
    li.innerHTML = artist.artist;
    artistList.appendChild(li);
  });

  artistListWrapper.className = 'show';
}