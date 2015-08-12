var geo;
function fetchData(event){
  event.preventDefault();

  // fade out welcome page
  var start = document.getElementById('start') || document.getElementById('welcome');
  start.classList.add('fade');
  setTimeout(function(){
    start.classList.add('remove');
  }, 400);

  // fade in loader
  var loader = document.getElementById('loader');
  loader.className = 'show';

  d3.json('data/world.json', function (err, worldData) {

    var nickInput = document.getElementById('nickInput');
    var apiUrl = '/api/users/';
    var nick = nickInput.value || 'eshuu';

    fetch(apiUrl + nick).then(function(a){
      return a.json();
    }).then(function(res){
      var countries = topojson.feature(worldData, worldData.objects.countries);

      geo = geodecoder(countries.features);
      renderUserDataOnGlobe(res.metadata.countrypercent);

      // fade out loader
      loader.className = 'hide';
      setTimeout(function(){
        start.classList.add('hide-done');
      }, 300);

    });
  });
};
