"use strict"

window.onload = loadLogin;

function loadLogin() {
    let btnSubmit = document.getElementById("submit-login");

    btnSubmit.addEventListener("click", login);
}

async function login(event) {
    event.preventDefault();
    document.getElementById("error-login").innerHTML = "";

    //Hämta alla DOM element
    let userNameInput = document.getElementById("username").value;
    let passwordInput = document.getElementById("password").value;

    //Fetch anrop för att logga in
    try {
        const response = await fetch("https://dt207g-moment4-1.onrender.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: userNameInput,
                password: passwordInput
            })
        });
        const data = await response.json();
        //console.log(data);
        if (response.ok) {
            //Redirect till startsida
            localStorage.setItem('token', data.response.token);
            localStorage.setItem('username', userNameInput);
            window.location.replace("/users.html");
        } else {
            document.getElementById("error-login").innerHTML = "Det går inte att logga in, fel användarnamn/lösenord";
        }

    } catch {
        document.getElementById("error-login").innerHTML = "Det går inte att logga in";
    }
}
