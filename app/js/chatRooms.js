activeChat  = "id1";



loadChatRooms();
function loadChatRooms() {

    firebase.database().ref("chatrooms").on('child_added', snapshot => {
        let chatRooms = snapshot.val();
        console.log(chatRooms);

        let html = getHTMLFromTemplate('#chat-room-template',chatRooms);
        ui.chatRooms.append(html);
    }

   );
}