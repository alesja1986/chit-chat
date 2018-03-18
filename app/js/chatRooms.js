// Listens for click on chat room annd loads that chat
ui.chatRooms.on("click", ".chat-room", function(){
    let newChat = $(this).attr("data-chat-room-id");
    ui.chatRooms.children().removeClass("active-chat");
    $(this).addClass("active-chat");
    loadChat(newChat);
});


// Load chat rooms
function loadChatRooms() {
    firebase.database().ref("chatrooms").on('child_added', snapshot => {
        let chatRooms = snapshot.val();
        chatRooms.chatid = snapshot.key;

        // Render HTML
        let html = getHTMLFromTemplate('#chat-room-template', chatRooms);
        ui.chatRooms.append(html);
    });
}

// Adds a special active class to HTML if it's the default chat room
Handlebars.registerHelper("checkIfDefaultRoom", (chatid, options) => {
    if(chatid === defaultChat)
        return " active-chat";
    else
        return "";
});
