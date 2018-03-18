// Send message when message button is clicked or ENTER key (13) is pressed
ui.sendMessageBtn.on('click', sendMessage);
ui.chatMessageInput.keypress(e => e.which == 13 ? sendMessage() : "");

// Load chat
function loadChat(newChat){
    // Hide chat settings and show chat view, if not already so
    ui.chatSettings.hide();
    ui.closeChatSettingsBtn.hide();
    ui.chatWindow.show();

    // Remove old HTML
    ui.chatView.children().remove();

    // Remove old listeners
    firebase.database().ref("chatrooms/" + activeChat + "/settings").off();
    firebase.database().ref("chatrooms/" + activeChat + "/messages").off();
    activeChat = newChat;

    // Loads chat settings and listens for future changes
    firebase.database().ref("chatrooms/" + activeChat + "/settings")
        .on("child_added", settings => renderChatSettings(settings));
    firebase.database().ref("chatrooms/" + activeChat + "/settings")
        .on("child_changed", settings => renderChatSettings(settings));
    function renderChatSettings(settings) {
        // Chat title and background
        if(settings.key === "name")
            ui.chatBarTitle.text(settings.val());
        else if(settings.key === "theme")
            ui.chatView.css("background-image", `url(../img/themes/${settings.val()}.png)`);
    }

    // Loads messages
    firebase.database().ref("chatrooms/" + activeChat + "/messages").orderByChild("timestamp").once("value")
        .then(snapshot => {
            let messages = snapshot.val();
            
            // Make it iterable as an array
            messages = Object.keys(messages).map(key => messages[key]);

            // Render messages
            for(let m of messages){
                let HTML = constructMessage(m);
                ui.chatView.append(HTML);
            }
            
            // Scroll to bottom
            ui.chatView.scrollTop(ui.chatView[0].scrollHeight);

        });

    // Listens for and loads new messages
    firebase.database().ref("chatrooms/" + activeChat + "/messages").orderByChild('timestamp').startAt(getTimeStampAsString()).on("child_added", snapshot => {
        let message = snapshot.val();
        let HTML = constructMessage(message);

        // Let scroll follow if on bottom
        let isScrolledToBottom = ui.chatView[0].scrollHeight - ui.chatView[0].clientHeight <= ui.chatView[0].scrollTop + 1;
        ui.chatView.append(HTML);
        if(isScrolledToBottom){
            ui.chatView.animate({scrollTop: ui.chatView[0].scrollHeight - ui.chatView[0].clientHeight}, 1000);
            // ui.chatView[0].scrollTop = ui.chatView[0].scrollHeight - ui.chatView[0].clientHeight;
        }
    });

    // Constructs HTML for a message
    function constructMessage(message){
        // Add user info to specific messages
        message.username = allUsers[message.uid].username;
        message.avatar = allUsers[message.uid].avatar;
        
        // Render HTML
        let HTML = getHTMLFromTemplate("#chat-message-template", message);
        return HTML;
    }
}

// Send a message in chat room
function sendMessage(){
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

    let date = new Date();
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
