// User ID
if(!sessionStorage.UID) 
    sessionStorage.UID = null;
    
// Active chat room
let activeChat = null;

// All users
let allUsers = null;
firebase.database().ref("all-users").once("value")
    .then((snapshotAllUsers) => {
        allUsers = snapshotAllUsers.val();
    });
firebase.database().ref("all-users").on("child_changed",
    (snapshotAllUsers) => {
        allUsers = snapshotAllUsers.val();
    });