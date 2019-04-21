const loginButton = document.getElementById('log-in'),
      passwordInput = document.getElementById('password-input'),
      usernameInput = document.getElementById('username-input');

loginButton.addEventListener('click', () =>
  fetch('https://boiling-reef-89836.herokuapp.com/lock_owners/api/authenticate/', {
    method: 'POST',
    body: JSON.stringify({ username: usernameInput.value, password: passwordInput.value }),
    headers: { 'Content-Type': 'application/json' }
  })
    .then(response => response.json())
    .then(responseJson => {
      console.log(responseJson);
      if (responseJson.hasOwnProperty('token')) {
        // Successful login, get user id and store that in session storage
        const token = responseJson.token;
        fetch("https://boiling-reef-89836.herokuapp.com/lock_owners/api/authenticate/get_user_id/?token=" + token)
          .then(response2 => response2.json())
          .then(responseJson => {
            if (responseJson.status == 200) {
              // Successfully got user ID. Save both user ID and token to session storage.
              sessionStorage.setItem('token', token);
              sessionStorage.setItem('userId', responseJson.id)
              window.location.replace('/');
            }
          })
      } else {
        // Unsuccessful login, display error message
        console.log('Error logging in');
      }
    })
);

// Create the honeycomb elements
const honeyContainer = document.getElementById('honeywarp');

for (let i = 1; i < 12; i++) {
  const honeycomb = document.createElement('div');
  honeycomb.classList.add('honeycomb');
  honeycomb.classList.add(`terminal_honeycomb${i}`);

  switch(i) {
    case 1:
    case 4:
    case 7:
    case 11:
      honeycomb.classList.add('type1');
      break;
    case 2:
    case 5:
    case 6:
    case 8:
      honeycomb.classList.add('type2');
      break;
    case 3:
    case 9:
    case 10:
      honeycomb.classList.add('type3');
      break;
  }

  honeyContainer.appendChild(honeycomb);
}