function countriesTopList(countries) {
  countries.sort(function(a, b) {
    if (a.percent > b.percent) {
      return -1;
    }
    if (a.percent < b.percent) {
      return 1;
    }
    return 0;
  });

  var countryList = document.querySelector('#country-list ul');
  countryList.innerHTML = '';
  countries.forEach(function(country){
    var li = document.createElement('li');
    li.innerHTML = country.country + ' ' + Math.round(country.percent * 100) + '%';
    countryList.appendChild(li);
  })
}