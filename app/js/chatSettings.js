ui.openChatSettingsBtn.click(function(){
    // Hide chat view
    ui.chatWindow.hide();

    // Show chat settings
    ui.chatSettings.show();
    ui.closeChatSettingsBtn.show();
});

ui.closeChatSettingsBtn.click(function(){
    // Hide chat settings
    ui.chatSettings.hide();
    ui.closeChatSettingsBtn.hide();

    // Show chat view
    ui.chatWindow.show();
});


