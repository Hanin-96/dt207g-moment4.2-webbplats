"use strict"


window.onload = loadUsers;

async function loadUsers() {

    //Logga ut knapp
    let btnSignOut = document.getElementById("btn-logout");
    btnSignOut.addEventListener("click", signOut);

    let token = localStorage.getItem('token');

    const response = await fetch("https://dt207g-moment4-1.onrender.com/user", {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });

    //Ifall man är utloggad skickas man till startsidan
    if (!response.ok) {
        window.location.replace("/index.html");
    } else {
        //Vid lyckad inloggning skrivs datan ut på användarsidan
        const data = await response.json();

        console.log(data);

        displayUsers(data.users);
        loadImage();
    }

}

//Skriv ut foto
import userImage from '../img/user.png';

function loadImage() {
    let imageWrap = document.getElementById("image-user");
    let imageEl = document.createElement("img");
    imageEl.src = userImage;
    imageEl.alt = "user icon";

    imageWrap.appendChild(imageEl);
}

//Skriva ut värden på Användarsidan
function displayUsers(users) {

    //Skriva ut användare från localStorage
    let userId = document.getElementById("usernameId");
    let usernameSignedIn = localStorage.getItem('username');

    userId.innerHTML = usernameSignedIn;


    let userWrap = document.querySelector(".users-wrap");
    userWrap.innerHTML = "";

    users.forEach(user => {
        userWrap.innerHTML += `<p>${user.username + ": " + user.firstname + " " + user.lastname}</p>`

    });

}

//Funktion för att logga ut & rensa token i localStorage
function signOut() {
    localStorage.removeItem("token");
    window.location.replace("/index.html")
}