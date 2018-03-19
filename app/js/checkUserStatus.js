// Create User ID if non-existent
if(!localStorage.UID) 
    localStorage.UID = null;
    
// Current HTML page
let page = window.location.pathname.split("/").pop();

if(page === "index.html"){
    // Change page if already logged in
    if(localStorage.UID !== "null")
    window.location.replace("../chat.html")
}
else if(page === "chat.html"){
    // Change page if not logged in
    if(localStorage.UID === "null")
        window.location.replace("../index.html")
}