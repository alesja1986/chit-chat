
ui.userLogoutBtn.on("click", () => logOut());

function logOut(){
    // Announce log out to database
    firebase.database().ref("all-users/" + sessionStorage.UID).update({
        "logged-in": false,
    })
        .then(() => {
            // Log out for real
            firebase.auth().signOut()
                .then(() => {
                    sessionStorage.UID = null;
                    window.location.replace("../index.html");
                })
        })
        .catch((err) => console.log(err));
}