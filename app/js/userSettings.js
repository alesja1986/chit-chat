ui.userSettingsBtn.on("click", () => ui.userSettings.toggle());

// Load user corner info + settings
function loadUser() {
    let currentUser = allUsers[localStorage.UID];

    // Load user corner info
    ui.userAvatar.attr("src", `img/avatars/${currentUser.avatar}.png`);
    ui.userUsername.html(currentUser.username);

    // Load user settings
    ui.userAvatarPreview.attr("src", `img/avatars/${currentUser.avatar}.png`);
    ui.userUsernameInput.val(currentUser.username);
    $(`#user-settings-form input[value=${currentUser.avatar}]`).prop("checked", true);
}

// Discard user settings button
ui.userSettingsDiscardButton.on("click", e => {
    e.preventDefault();
    let currentUser = allUsers[localStorage.UID];

    // Load previous user settings
    ui.userAvatarPreview.attr("src", `img/avatars/${currentUser.avatar}.png`);
    ui.userUsernameInput.val(currentUser.username);
    $(`#user-settings-form input[value=${currentUser.avatar}]`).prop("checked", true).trigger("click");
    ui.userSettings.toggle()
});

// Save user settings button
ui.userSettingsForm.keypress(e => e.which == 13 ? ui.userSettingsSaveButton.trigger("click") : "");
ui.userSettingsForm.on("submit", e => {
    e.preventDefault();

    // Save in database and reload page
    let newAvatar = $('input[name=avatar]:checked', '#user-settings-form').val();
    firebase.database().ref("all-users/" + localStorage.UID).update({
        "avatar": newAvatar,
        "username": ui.userUsernameInput.val()
    })
    .then(location.reload());

    ui.userSettings.toggle()
});

// Changes avatar preview when selecting an avatar
ui.userAvatarSelection.on("change", "[name=avatar]", function() {
    let selectedAvatar = $(this).val();
    ui.userAvatarPreview.attr("src", `img/avatars/${selectedAvatar}.png`);
})