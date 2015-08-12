function countriesTopList(countries) {
  var countryListWrapper = document.getElementById('country-list');
  var countryList = document.querySelector('#country-list ul');
  countryList.innerHTML = '';

  // keeping track of the active list element for removing the active class form it
  var activeItem = null;

  // Fill with countries
  countries.forEach(function(country){
    var li = document.createElement('li');
    li.innerHTML = country.country + ' ' + Math.round(country.percent * 100) + '%';

    li.addEventListener('click', function() {
      if(activeItem) activeItem.classList.remove('active');

      activeItem = li;
      li.classList.add('active');
      showArtistList(country);
      panToCountry(geo.find(country.country));
    });

    countryList.appendChild(li);
  });

  countryListWrapper.className = 'show';
}