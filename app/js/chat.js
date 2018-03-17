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

<<<<<<< HEAD
        let out = document.getElementById("chat-view");

        var c = 0;
        var add = setInterval(function() {
            // allow 1px inaccuracy by adding 1
            var isScrolledToBottom = out.scrollHeight - out.clientHeight <= out.scrollTop + 1;
            console.log(out.scrollHeight - out.clientHeight,  out.scrollTop + 1);
            var newElement = document.createElement("div");
            newElement.innerHTML = c++;
            out.appendChild(newElement);
            // scroll to bottom if isScrolledToBotto
            if(isScrolledToBottom)
                out.scrollTop = out.scrollHeight - out.clientHeight;
        }, 1000);



        messages.pop();
=======
        messages.pop(); // Hack to make listener for new messages work.
>>>>>>> ba17dd61b2b4d5ccbbea4cae2c5bbdbaf45a3978
        // Render HTML
        let HTML = getHTMLFromTemplate("#chat-message-template", messages);
        ui.chatView.children().remove();
        ui.chatView.append(HTML);

        // Register listener for new messages
        firebase.database().ref("chatrooms/" + activeChat + "/messages" ).limitToLast(1).on('child_added' , function (snapshot) {
            let newMessage = snapshot.val();

            // Add user info to specific messages
<<<<<<< HEAD
                newMessage.username = allUsers[newMessage.uid].username;
                newMessage.avatar = allUsers[newMessage.uid].avatar;

=======
            newMessage.username = allUsers[newMessage.uid].username;
            newMessage.avatar = allUsers[newMessage.uid].avatar;
>>>>>>> ba17dd61b2b4d5ccbbea4cae2c5bbdbaf45a3978

            // Render HTML
            let HTML = getHTMLFromTemplate("#chat-message-template", [newMessage]);
            ui.chatView.append(HTML);
        })
    });

}

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


<<<<<<< HEAD
    return  yyyy + '-'+(mm < 10 ? `0${mm}` : mm) + '-'+(dd < 10 ? `0${dd}` : dd)+' '+(hour < 10 ? `0${hour}` : hour+ ':'+(minut < 10 ? `0${minut}` : minut));

}



=======
    return  yyyy + '-' + 
        (mm < 10 ? `0${mm}` : mm) + '-' + 
        (dd < 10 ? `0${dd}` : dd) + ' ' +
        (hour < 10 ? `0${hour}` : hour) + ':' + 
        (minut < 10 ? `0${minut}` : minut);

}

Handlebars.registerHelper("checkIfCurrentUser", (messageUser, options) => {
    if(messageUser === sessionStorage.UID)
        return " this-user-message";
    else
        return "";
});
>>>>>>> ba17dd61b2b4d5ccbbea4cae2c5bbdbaf45a3978
