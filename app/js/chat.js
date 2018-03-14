
Handlebars.registerHelper("checkIfCurrentUser", (messageUser, options) => {
    console.log(messageUser);
    console.log(sessionStorage.UID);
    if(messageUser === sessionStorage.UID)
        return " this-user-message";
    else
        return "";
});


loadChat();

function loadChat(){
    firebase.database().ref("chatrooms/" + activeChat).once("value")
    .then((snapshotChatroom) => {
        let chatroom = snapshotChatroom.val();
        
        // Chat title and background
        ui.chatBarTitle.text(chatroom.settings.name);
        ui.chatView.css("background-image", `url(../img/themes/${chatroom.settings.theme}.png)`);  

        // Sort messages by timestamp
        let messages = chatroom.messages;
        sortObjectArrayByStringKey(messages, "timestamp");

        // Add user info to specific messages
        for(let m of messages){
            m.username = allUsers[m.uid].username;
            m.avatar = allUsers[m.uid].avatar;
        }

        // Render HTML
        let HTML = getHTMLFromTemplate("#chat-message-template", messages);
        ui.chatView.append(HTML);
    });
}
