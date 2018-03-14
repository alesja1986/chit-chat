
$("#login").on("submit", e => {
    e.preventDefault();
    logIn();
});

function logIn(){
    let email = $("#login .e-mail").val();
    let password = $("#login .password").val();
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            sessionStorage.UID = firebase.auth().currentUser.uid;
            firebase.database().ref("logged-in").update({
                [sessionStorage.UID]: true,
            })
            .then(() => window.location.replace("../chat.html"))
        })
        .catch(() => console.log("Kunde inte logga in :("));
}