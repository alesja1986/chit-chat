$(() => logOut());

ui.regSubmitBtn.on("click", function(e) {
    e.preventDefault();

    // Create user with e-mail and password
    firebase.auth().createUserWithEmailAndPassword(ui.regEmail.val(), ui.regPassword.val())
        .then(() => {
            var messageListRef = firebase.database().ref("all-users/" + ui.regUsername.val()).set({
                "avatar": 'default',
                "e-mail": ui.regEmail.val(),
                "logged-in": true,
                "name": ui.regFullname.val(),
                "theme": 0,
            });
            return console.log("Inloggad!");
        })
        .catch(function (error) {console.log("Something went wrong with the registration");});

});

function logIn(){
    firebase.auth().signInWithEmailAndPassword("a.lymalm@gmail.com", "kanelbulle")
        .then(() => console.log("Du är inloggad"))
        .catch(() => console.log("Kunde inte logga in :("));
}

function logOut(){
    firebase.auth().signOut()
        .then(() => console.log("Du är utloggad"))
        .catch(() => console.log("Kunde inte logga ut :("));
}

