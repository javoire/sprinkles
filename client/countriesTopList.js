function countriesTopList(countries) {
  var countryListWrapper = document.getElementById('country-list');
  var countryList = document.querySelector('#country-list ul');
  countryList.innerHTML = '';
  countries.forEach(function(country){
    var li = document.createElement('li');
    li.innerHTML = country.country + ' ' + Math.round(country.percent * 100) + '%';

    li.addEventListener('click', function() {
      console.log('asdsadas');
    })

    countryList.appendChild(li);
  });

  countryListWrapper.className = 'show';
}