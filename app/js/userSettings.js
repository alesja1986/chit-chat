ui.userSettingsBtn.on("click", () => ui.userSettings.toggle());

// Load user corner info
function loadUser() {
    let currentUser = allUsers[sessionStorage.UID];
    console.log(currentUser);
    ui.userAvatar.attr("src", `img/avatars/${currentUser.avatar}.png`);
    ui.userUsername.html(currentUser.username);
}