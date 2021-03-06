// When register button is pressed
ui.regSubmitBtn.on("click", function(e) {
    e.preventDefault();

    // Create user with e-mail and password
    firebase.auth().createUserWithEmailAndPassword(ui.regEmail.val(), ui.regPassword.val())
        .then(() => {
            localStorage.UID = firebase.auth().currentUser.uid;
            // Save other user info in DB
            firebase.database().ref("all-users/" + localStorage.UID).set({
                "username": ui.regUsername.val(),
                "avatar": 'dog',
                "e-mail": ui.regEmail.val(),
                "name": ui.regFullname.val(),
            })
            .then(() => {
                // Mark as logged in and change to chat page
                firebase.database().ref("logged-in").update({
                    [localStorage.UID]: true,
                })
                .then(() => window.location.replace("../chat.html"))
            });
            return;
        })
        .catch(error => console.log("Something went wrong with the registration\n" + error));

});
