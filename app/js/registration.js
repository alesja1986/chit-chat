
// Check if user is logged in. If so, redirect to that page
if(firebase.auth().currentUser){
    window.location.replace("../chat.html");
}

ui.regSubmitBtn.on("click", function(e) {
    e.preventDefault();

    // Create user with e-mail and password
    firebase.auth().createUserWithEmailAndPassword(ui.regEmail.val(), ui.regPassword.val())
        .then(() => {
            sessionStorage.UID = firebase.auth().currentUser.uid;
            firebase.database().ref("all-users/" + sessionStorage.UID).set({
                "username": ui.regUsername.val(),
                "avatar": 'dog',
                "e-mail": ui.regEmail.val(),
                "name": ui.regFullname.val(),
                "theme": 0,
            })
            .then(() => {
                firebase.database().ref("logged-in").update({
                    [sessionStorage.UID]: true,
                })
                .then(() => window.location.replace("../chat.html"))
            });
            return;
        })
        .catch(error => console.log("Something went wrong with the registration\n" + error));

});
