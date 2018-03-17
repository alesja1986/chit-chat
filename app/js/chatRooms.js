// Listens for click on chat room annd loads that chat
ui.chatRooms.on("click", ".chat-room", function(){
    activeChat = $(this).attr("data-chat-room-id");
    ui.chatRooms.children().removeClass("active-chat");
    $(this).addClass("active-chat");
    loadChat();
});


// Load chat rooms
function loadChatRooms() {
    firebase.database().ref("chatrooms").on('child_added', snapshot => {
        let chatRooms = snapshot.val();
        chatRooms.uid = snapshot.key;

        // Render HTML
        let html = getHTMLFromTemplate('#chat-room-template',chatRooms);
        ui.chatRooms.append(html);
    });
}
