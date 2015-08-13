function welcomeScreen() {
  // elements
  var form = document.getElementById('form');
  if (form) form.addEventListener('submit', fetchData.bind(this));
}