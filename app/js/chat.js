ui.sendMessageBtn.on('click',sendMessage);

// Load chat
function loadChat(){
    firebase.database().ref("chatrooms/" + activeChat).once("value")
    .then((snapshotChatroom) => {
        let chatroom = snapshotChatroom.val();
        
        // Chat title and background
        ui.chatBarTitle.text(chatroom.settings.name);
        ui.chatView.css("background-image", `url(../img/themes/${chatroom.settings.theme}.png)`);  

        // Sort messages by timestamp
        let messages = chatroom.messages;
        messages = Object.keys(messages).map(key => messages[key]);
        sortObjectArrayByStringKey(messages, "timestamp");

        // Add user info to specific messages
        for(let m of messages){
            m.username = allUsers[m.uid].username;
            m.avatar = allUsers[m.uid].avatar;
        }

        messages.pop();

        // Render HTML
        let HTML = getHTMLFromTemplate("#chat-message-template", messages);
        ui.chatView.children().remove();
        ui.chatView.append(HTML);

        // Hide chat settings and show chat view, if not already so
        ui.chatSettings.hide();
        ui.closeChatSettingsBtn.hide();
        ui.chatWindow.show();

        // Scroll to bottom
        ui.chatView.scrollTop(ui.chatView[0].scrollHeight);

        // Register listener for new messages
        firebase.database().ref("chatrooms/" + activeChat + "/messages" ).limitToLast(1).on('child_added' , function (snapshot) {
            let newMessage = snapshot.val();

            // Add user info to specific messages
            newMessage.username = allUsers[newMessage.uid].username;
            newMessage.avatar = allUsers[newMessage.uid].avatar;

            // Render HTML
            let HTML = getHTMLFromTemplate("#chat-message-template", [newMessage]);

            // Let scroll follow if on bottom
            var isScrolledToBottom = ui.chatView[0].scrollHeight - ui.chatView[0].clientHeight <= ui.chatView[0].scrollTop + 1;
            ui.chatView.append(HTML);
            if(isScrolledToBottom){
                //ui.chatView.animate({scrollTop: ui.chatView[0].scrollHeight - ui.chatView[0].clientHeight}, 1000);
                ui.chatView[0].scrollTop = ui.chatView[0].scrollHeight - ui.chatView[0].clientHeight;
            }
        })
    });

}

// Send a message in chat room
function sendMessage() {
    let messageText = ui.chatMessageInput.val();
    let time = getTimeStampAsString();
    if (ui.chatMessageInput.val()!= "") {
        firebase.database().ref("chatrooms/" + activeChat + "/messages" ).push({
           "text": messageText,
            "timestamp":time,
            "uid": sessionStorage.UID
        });
    }

    ui.chatMessageInput.val('');
}

// Get time stamp for message
function getTimeStampAsString() {

    let date = new  Date();
    let yyyy = date.getFullYear(); //hämtar åren från date
    let dd= date.getDate()   //hämtar dagen från date
    let mm = date.getMonth()+1;  //hämtar månaden från date
    let hour = date.getHours();  //hämtar timmar
    let minut = date.getMinutes(); // hämtar minuter

    return  yyyy + '-' + 
        (mm < 10 ? `0${mm}` : mm) + '-' + 
        (dd < 10 ? `0${dd}` : dd) + ' ' +
        (hour < 10 ? `0${hour}` : hour) + ':' + 
        (minut < 10 ? `0${minut}` : minut);

}

// Adds a special current user class to message, if so
Handlebars.registerHelper("checkIfCurrentUser", (messageUser, options) => {
    if(messageUser === sessionStorage.UID)
        return " this-user-message";
    else
        return "";
});
