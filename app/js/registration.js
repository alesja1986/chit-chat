

ui.regSubmitBtn.on("click", function(e) {
    e.preventDefault();
    console.log(ui.regEmail.val());
    // Create user with e-mail and password
    firebase.auth().createUserWithEmailAndPassword(ui.regEmail.val(), ui.regPassword.val()).catch(function (error) {
        console.log("Something went wrong with the registration");
    });

    var messageListRef = firebase.database().ref("all-users/" + ui.regUsername.val()).set({
        "avatar": 'default',
        "e-mail": ui.regEmail.val(),
        "logged-in": true,
        "name": ui.regFullname.val(),
        "theme": 0,
    });
    var path = messageListRef.toString();
    // path will be something like
    // 'https://sample-app.firebaseio.com/message_list/-IKo28nwJLH0Nc5XeFmj'
});