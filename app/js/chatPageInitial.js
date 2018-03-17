updateAllUsers();
loadChatRooms();
loadChat();

function updateAllUsers() { // Update all users list
    firebase.database().ref("all-users").once("value")
        .then((snapshotAllUsers) => {
            allUsers = snapshotAllUsers.val();
        });
    firebase.database().ref("all-users").on("child_changed",
        (snapshotAllUsers) => {
            allUsers = snapshotAllUsers.val();
        });
}