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
    firebase.database().ref("chatrooms/" + activeChat + "/messages").orderByChild('timestamp').startAt(getCurrentTime()).on("child_added", snapshot => {
        let message = snapshot.val();
        let HTML = constructMessage(message);

        // Let scroll follow if on bottom
        let isScrolledToBottom = ui.chatView[0].scrollHeight - ui.chatView[0].clientHeight <= ui.chatView[0].scrollTop + 1;
        ui.chatView.append(HTML);
        if(isScrolledToBottom){
            ui.chatView.animate({scrollTop: ui.chatView[0].scrollHeight - ui.chatView[0].clientHeight}, 200);
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
    let time = getCurrentTime();
    if (ui.chatMessageInput.val()!= "") {
        firebase.database().ref("chatrooms/" + activeChat + "/messages" ).push({
           "text": messageText,
            "timestamp":time,
            "uid": localStorage.UID
        });
    }

    ui.chatMessageInput.val('');
}

// Get time stamp for message
function getCurrentTime() {

    let date = new Date();
    let yyyy = date.getFullYear(); 
    let mm = ("0" + (date.getMonth()+1)).slice(-2); 
    let dd= ("0" + date.getDate()).slice(-2);
    let hour = ("0" + date.getHours()).slice(-2); 
    let minute = ("0" + date.getMinutes()).slice(-2);
    let second = ("0" + date.getSeconds()).slice(-2);
    let ms = ("00" + date.getMilliseconds()).slice(-3);

    return `${yyyy}-${mm}-${dd} ${hour}:${minute}:${second}.${ms}`;
}

// Adds a special current user class to message, if so
Handlebars.registerHelper("checkIfCurrentUser", (messageUser, options) => {
    if(messageUser === localStorage.UID)
        return " this-user-message";
    else
        return "";
});

// Shortens timestamp, by removing seconds and milliseconds
Handlebars.registerHelper("shortenTimestamp", (timestamp, options) => {
    return timestamp.slice(0, 16);
});