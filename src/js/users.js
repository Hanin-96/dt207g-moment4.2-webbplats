"use strict"

window.onload = loadUsers;

async function loadUsers() {
    let token = localStorage.getItem('token');

    const response = await fetch("http://192.168.0.137:3000/user", {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });

    console.log(response);
}