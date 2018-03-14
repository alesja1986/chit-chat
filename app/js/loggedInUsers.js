
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

            sortObjectArrayByStringKey(loggedInUsers, "username");

            let HTML = getHTMLFromTemplate("#logged-in-user-template", loggedInUsers);
            ui.loggedInUsers.children(".logged-in-user").remove();
            ui.loggedInUsers.append(HTML);
        });
});
