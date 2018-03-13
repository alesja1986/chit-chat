
ui.userLogoutBtn.on("click", () => logOut());

function logOut(){
    firebase.auth().signOut()
        .then(() => window.location.replace("../index.html"))
        .catch(() => console.log("Kunde inte logga ut :("));
}