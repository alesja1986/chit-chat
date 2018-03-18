let sendNewTheme;

ui.openChatSettingsBtn.click(function(){
    // Hide chat view
    ui.chatWindow.hide();

    // Show chat settings
    ui.chatSettings.show();
    ui.closeChatSettingsBtn.show();
    showThisChatName();
});

ui.closeChatSettingsBtn.click(function() {
    // Hide chat settings
    ui.chatSettings.hide();
    ui.closeChatSettingsBtn.hide();

    // Show chat view
    ui.chatWindow.show();
    });



function showThisChatName() {
    ui.chatNameInput = firebase.database().ref("chatrooms/" + activeChat + "/settings").once('value', snapshot => {
        ui.chatNameInput.val(snapshot.val().name);
    });
}

//save clicked img name
    $('.chat-theme img').on("click", function () {
        let newTheme = this.src;
        let newThemeLength = newTheme.length;
        sendNewTheme = newTheme.substring(newThemeLength - 7, newThemeLength - 4);
        return sendNewTheme
    });

    //send new name and theme to db
    ui.createChatRoomBtn.on("click", function () {
        let newChatName = ui.chatNameInput.val();
        firebase.database().ref("chatrooms/" + activeChat + "/settings").update({
            "name": newChatName,
            "theme": sendNewTheme
        })
    })

    ui.deleteChatRoomBtn.on("click", function () {

    });