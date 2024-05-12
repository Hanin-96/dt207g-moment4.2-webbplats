"use strict"

window.onload = loadLogin;

function loadLogin() {
    let btnSubmit = document.getElementById("submit-register");

    btnSubmit.addEventListener("click", register);
}

async function register(event) {
    event.preventDefault();
    let errorSubmit = document.getElementById("error-submit");
    errorSubmit.innerHTML = "";

    //Hämta alla DOM element
    let userNameInput = document.getElementById("username").value;
    let passwordInput = document.getElementById("password").value;
    let firstnameInput = document.getElementById("firstname").value;
    let lastnameInput = document.getElementById("lastname").value;
    let emailInput = document.getElementById("email").value;

    if (passwordInput.length < 6) {
        errorSubmit.innerHTML = "Lösenordet måste vara minst 6 tecken";
        return;
    }

        //Fetch anrop för att logga in
        try {
            const response = await fetch("http://192.168.0.137:3000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: userNameInput,
                    firstname: firstnameInput,
                    lastname: lastnameInput,
                    email: emailInput,
                    password: passwordInput
                })
            });
            const data = await response.json();
            if (response.ok) {
                //Redirect till startsida
                window.location.replace("http://localhost:1234/login.html");
            } else {
                document.getElementById("error-submit").innerHTML = "Det går inte att registrera ny användare: " + data.error;
            }

        } catch {
            document.getElementById("error-submit").innerHTML = "Det går inte att registrera ny användare";
        }
}