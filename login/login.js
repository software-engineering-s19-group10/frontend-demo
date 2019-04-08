class LoginView {
  constructor() {
    // Set up input fields and button to click.
    const main = document.getElementById('main-view');

    const loginDescription = document.createElement("p");
    const loginText = document.createTextNode("This is the login page");
    loginDescription.appendChild(loginText);
    main.appendChild(loginDescription)

    const usernameLabel = document.createElement("label");
    usernameLabel.setAttribute("for", "username-input");
    usernameLabel.appendChild(document.createTextNode("Username: "));
    main.appendChild(usernameLabel);

    const usernameInput = document.createElement("input");
    usernameInput.setAttribute("type", "text");
    usernameInput.setAttribute("id", "username-input");
    main.appendChild(usernameInput);

    main.appendChild(document.createElement("br"));

    const passwordLabel = document.createElement("label");
    passwordLabel.setAttribute("for", "password-input");
    passwordLabel.appendChild(document.createTextNode("Password: "));
    main.appendChild(passwordLabel);

    const passwordInput = document.createElement("input");
    passwordInput.setAttribute("type", "password");
    passwordInput.setAttribute("id", "password-input");
    main.appendChild(passwordInput);

    main.appendChild(document.createElement("br"));

    const loginButton = document.createElement("button");
    loginButton.setAttribute("type", "button");
    loginButton.appendChild(document.createTextNode("Login"));
    loginButton.addEventListener("click", () => {
      const username = document.getElementById("username-input").value;
      const password = document.getElementById("password-input").value;

      fetch("https://boiling-reef-89836.herokuapp.com/lock_owners/api/authenticate/", {
        method: "POST",
        body: JSON.stringify({ username: username, password: password }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => response.json()).then(responseJson =>
        console.log(JSON.stringify(responseJson)));
    });
    main.appendChild(loginButton);
  }
}

new LoginView();
