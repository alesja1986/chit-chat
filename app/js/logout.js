
function logOut(){
    firebase.auth().signOut()
        .then(() => console.log("Du är utloggad"))
        .catch(() => console.log("Kunde inte logga ut :("));
}