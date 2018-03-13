
firebase.database().ref("logged-in").on("value", (snapshotLoggedIn) => {
    let usersID = snapshotLoggedIn.val();
    let loggedInUsers = [];

    firebase.database().ref("all-users").once("value")
        .then((snapshotAllUsers) => {
            let usersInfo = snapshotAllUsers.val();
            for(let uid in usersID){
                if(usersID[uid]){
                    loggedInUsers.push(usersInfo[uid]);
                }
            }
            console.log(loggedInUsers);
        });
});