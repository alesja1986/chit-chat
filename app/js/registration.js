
// Check if user is logged in. If so, redirect to that page
if(firebase.auth().currentUser){
    window.location.replace("../chat.html");
}

ui.regSubmitBtn.on("click", function(e) {
    e.preventDefault();

    // Create user with e-mail and password
    firebase.auth().createUserWithEmailAndPassword(ui.regEmail.val(), ui.regPassword.val())
        .then(() => {
            firebase.database().ref("all-users/" + ui.regUsername.val()).set({
                "avatar": 'default',
                "e-mail": ui.regEmail.val(),
                "logged-in": true,
                "name": ui.regFullname.val(),
                "theme": 0,
            })
            .then(() => window.location.replace("../chat.html"));
            return;
        })
        .catch(error => console.log("Something went wrong with the registration\n" + error));

});
