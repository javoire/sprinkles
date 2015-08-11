function renderUserDataOnGlobe(userCountryData, worldData) {
  var nickInput = document.getElementById('nickInput');
  var nick = nickInput.value || 'eshuu';

  var countries = topojson.feature(worldData, worldData.objects.countries);

  var geo = geodecoder(countries.features);


  var baseRed = 46;
  var baseGreen = 189;
  var baseBlue = 89;
  var textures = [];
  var rgb = d3.rgb(baseRed, baseGreen, baseBlue);
  userCountryData.sort(function(a, b) {
    return b.percent - a.percent;
  });
  userCountryData.forEach(function (country) {
    var countryGeojson = geo.find(country.country);
    if (countryGeojson) {
      console.log(rgb);
      textures.push(mapTexture({features: [countryGeojson], type: "FeatureCollection"}, rgb, 'black'));
      rgb = rgb.darker();
    }
  });

  // google stuff
  var map = document.getElementById('map');
  var globe = new DAT.Globe(map, {
    myCoolTexture: mapTexture(countries, '#222', 'black'),
    overlayTextures: textures
  });
  console.log(globe);
  var titlebar = document.querySelector('#country-list h2');
  titlebar.appendChild(document.createTextNode('These are your top countries, ' + nick));
  globe.animate();

  document.body.style.backgroundImage = 'none'; // remove loading
}

function renderGlobe(worldData) {
  var countries = topojson.feature(worldData, worldData.objects.countries);
  var map = document.getElementById('map');
  var globe = new DAT.Globe(map, {
    myCoolTexture: mapTexture(countries, '#222', 'black')
  });
  globe.animate();

  document.body.style.backgroundImage = 'none'; // remove loading
}