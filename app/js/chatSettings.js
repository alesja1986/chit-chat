ui.openChatSettingsBtn.click(function(){
      $("#chat-settings").show();
      ui.closeChatSettingsBtn.show();
    $(".chat-content").hide();

});

ui.closeChatSettingsBtn.click(function(){
    ui.closeChatSettingsBtn.hide();
    $("#chat-settings").hide();
    $(".chat-content").show();
});


