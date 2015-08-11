if (!Detector.webgl) {
  Detector.addGetWebGLMessage();
} else {

  // vars
  var apiUrl = '/api/users/';

  // elements
  var nickInput = document.getElementById('nickInput');
  var getButton = document.getElementById('getButton');
  var start = document.getElementById('start');
  var container = document.getElementById('container');


  // map hackery
  var projection = d3.geo.equirectangular()
    .translate([1024, 512])
    .scale(325);




  var draw = function(res) {

    d3.json('data/world.json', function (err, data) {

      d3.select("#loading").transition().duration(500)
        .style("opacity", 0).remove();

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
      var globe = new DAT.Globe(container, {
        myCoolTexture: mapTexture(countries, '#222', 'black'),
        overlayTexture: overlayTexture
      });
      console.log(globe);

      globe.animate();

      countriesTopList(res.metadata.countrypercent); // print countries toplist in DOM

      document.body.style.backgroundImage = 'none'; // remove loading

    }.bind(this));
  };



  var fetchData = function(event){
    event.preventDefault();
    var nick = nickInput.value || 'eshuu';

    start.classList.add('fade');
    setTimeout(function(){
      start.classList.add('remove');
    }, 400);


    fetch(apiUrl + nick).then(function(a){
      return a.json();
    }).then(function(res){
      d3.json('data/world.json', function (err, data) {

        d3.select("#loading").transition().duration(500)
          .style("opacity", 0).remove();

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
  };


  getButton.addEventListener('click', fetchData.bind(this));
}
