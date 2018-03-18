// When a user changes their login status
firebase.database().ref("logged-in").on("value", (snapshotLoggedIn) => {
    let usersID = snapshotLoggedIn.val();
    let loggedInUsers = [];

    // Load new logged in users list
    firebase.database().ref("all-users").once("value")
        .then((snapshotAllUsers) => {
            let usersInfo = snapshotAllUsers.val();
            // Get info from logged in users
            for(let uid in usersID){
                if(usersID[uid]){
                    loggedInUsers.push(usersInfo[uid]);
                }
            }
      
            // Sort
            sortObjectArrayByStringKey(loggedInUsers, "username");

            // Render
            let HTML = getHTMLFromTemplate("#logged-in-user-template", loggedInUsers);
            ui.loggedInUsers.children(".logged-in-user").remove();
            ui.loggedInUsers.append(HTML);
        });
});
