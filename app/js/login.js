$("#login").on("submit", e => {
    e.preventDefault();
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(() => logIn())
        .catch(error => console.log(error));
});

function logIn(){
    let email = $("#login .e-mail").val();
    let password = $("#login .password").val();
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            localStorage.UID = firebase.auth().currentUser.uid;
            firebase.database().ref("logged-in").update({
                [localStorage.UID]: true,
            })
            .then(() => window.location.replace("../chat.html"))
        })
        .catch(error => console.log(error));
}