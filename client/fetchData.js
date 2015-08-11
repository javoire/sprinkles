function fetchData(event){
  event.preventDefault();

  d3.json('data/world.json', function (err, worldData) {

    var nickInput = document.getElementById('nickInput');
    var start = document.getElementById('start');
    var apiUrl = '/api/users/';
    var nick = nickInput.value || 'eshuu';

    start.classList.add('fade');
    setTimeout(function(){
      start.classList.add('remove');
    }, 400);

    fetch(apiUrl + nick).then(function(a){
      return a.json();
    }).then(function(res){
      renderUserDataOnGlobe(res.metadata.countrypercent, worldData);
    });
  });
};
