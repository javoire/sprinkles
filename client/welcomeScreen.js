function welcomeScreen() {
  // elements
  var nickInput = document.getElementById('nickInput');
  var getButton = document.getElementById('getButton');

  getButton.addEventListener('click', fetchData.bind(this));
}