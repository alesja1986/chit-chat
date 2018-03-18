updateAllUsers();

// Update all users list
function updateAllUsers() { 
    firebase.database().ref("all-users").once("value")
        .then((snapshotAllUsers) => {
            allUsers = snapshotAllUsers.val();
            
            // Load basics
            loadUser();
            loadChatRooms();
            loadChat(defaultChat);
        });
    firebase.database().ref("all-users").on("child_changed",
        (snapshotAllUsers) => {
            allUsers = snapshotAllUsers.val();
        });
}