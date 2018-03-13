
ui.userLogoutBtn.on("click", () => logOut());

function logOut(){
    firebase.auth().signOut()
        .then(() => {
            firebase.database().ref("all-users/" + UID).update({
                "logged-in": false,
            })
            .then(() => {
                UID = null;
                window.location.replace("../index.html")
            })
        })
        .catch(() => console.log("Kunde inte logga ut :("));
}