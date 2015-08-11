if (!Detector.webgl) {
  Detector.addGetWebGLMessage();
} else {

  var projection = d3.geo.equirectangular()
    .translate([1024, 512])
    .scale(325);

  d3.json('data/world.json', function (err, data) {

    d3.select("#loading").transition().duration(500)
      .style("opacity", 0).remove();

    fetch('/api/javoire').then(function(a){
      return a.json();
    }).then(function(res){
      var countries = topojson.feature(data, data.objects.countries);

      var geo = geodecoder(countries.features);

      var country = geo.find('Sweden');

      // get the geojson for some countries
      var someCountriesGeojson = { features: [], type: "FeatureCollection" };
      res.metadata.countrypercent.forEach(function(country) {
        var countryGeojson = geo.find(country.country);
        if (countryGeojson) {
          someCountriesGeojson.features.push(countryGeojson)
        }
      });

      var overlayTexture = mapTexture(someCountriesGeojson, 'rgb(46, 189, 89)', 'black');

      // google stuff
      var container = document.getElementById('container');
      var globe = new DAT.Globe(container, {
        myCoolTexture: mapTexture(countries, '#222', 'black'),
        overlayTexture: overlayTexture
      });
      console.log(globe);

      globe.animate();

      countriesTopList(res.metadata.countrypercent); // print countries toplist in DOM

      document.body.style.backgroundImage = 'none'; // remove loading
    });
  });
}
