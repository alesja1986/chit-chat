// Log out when logout button is pressed
ui.userLogoutBtn.on("click", () => logOut());

function logOut(){
    // Announce log out to database
    firebase.database().ref("logged-in").update({
        [localStorage.UID]: false,
    })
        .then(() => {
            // Log out for real
            firebase.auth().signOut()
                .then(() => {
                    localStorage.UID = null;
                    // Change to welcome page
                    window.location.replace("../index.html");
                })
        })
        .catch((err) => console.log(err));
}