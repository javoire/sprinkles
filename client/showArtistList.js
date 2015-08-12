function showArtistList() {
  var artistListWrapper = document.getElementById('artist-list');
  var artistListHeader = document.querySelector('#artist-list h2');
  var artistList = document.querySelector('#artist-list ul');
  artistList.innerHTML = '';
  countries.forEach(function(country){
    var li = document.createElement('li');
    li.innerHTML = country.country + ' ' + Math.round(country.percent * 100) + '%';

    li.addEventListener('click', function() {
      console.log('asdsadas');
    })

    artistList.appendChild(li);
  });

  artistListWrapper.className = 'show';
}