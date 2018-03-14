
// Active chat room
let activeChat = null;

// All users
let allUsers = null;
firebase.database().ref("all-users").once("value")
    .then((snapshotAllUsers) => {
        allUsers = snapshotAllUsers.val();
    });
firebase.database().ref("all-users").on("child_added",
    (snapshotAllUsers) => {
        allUsers = snapshotAllUsers.val();
    });