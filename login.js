const main = document.getElementById('main-view');

const loginDescription = document.createElement('p');
loginDescription.appendChild(document.createTextNode('Welcome!'));
main.appendChild(loginDescription);

const usernameLabel = document.createElement('label');
usernameLabel.setAttribute('for', 'username-input');
usernameLabel.appendChild(document.createTextNode('Username: '));
main.appendChild(usernameLabel);

const usernameInput = document.createElement('input');
usernameInput.setAttribute('type', 'text');
usernameInput.setAttribute('id', 'username-input');
main.appendChild(usernameInput);

main.appendChild(document.createElement('br'));

const passwordLabel = document.createElement('label');
passwordLabel.setAttribute('for', 'password-input');
passwordLabel.appendChild(document.createTextNode('Password: '));
main.appendChild(passwordLabel);

const passwordInput = document.createElement('input');
passwordInput.setAttribute('type', 'password');
passwordInput.setAttribute('id', 'password-input');
main.appendChild(passwordInput);

main.appendChild(document.createElement('br'));

const loginButton = document.createElement('button');
loginButton.appendChild(document.createTextNode('LOGIN'));
loginButton.addEventListener('click', () =>
  fetch('https://boiling-reef-89836.herokuapp.com/lock_owners/api/authenticate/', {
    method: 'POST',
    body: JSON.stringify({ username: usernameInput.value, password: passwordInput.value }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(responseJson => {
      console.log(responseJson);
      if (responseJson.hasOwnProperty('token')) {
        // Successful login. Get user id and store that in session storage also.
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
      }
    })
);

main.appendChild(loginButton);
