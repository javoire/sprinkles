function fetchData(event){
  event.preventDefault();

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
    renderGlobe(res.metadata.countrypercent);
  });
};
