document.addEventListener("DOMContentLoaded", () => {
    let logoutButton = document.getElementById("logout-btn");
    function updateLogoutButton() {
        const isLoggedIn = localStorage.getItem("loggedInUser");
        if (logoutButton) {
            logoutButton.style.display = isLoggedIn ? "block" : "none";
        }
    }
    // If logout button doesn't exist, create and append it to the header
    if (!logoutButton) {
        logoutButton = document.createElement("button");
        logoutButton.id = "logout-btn";
        logoutButton.textContent = "Logout";
        logoutButton.style.display = "none";
        // Append the button to the header if it exists
        const header = document.querySelector("header");
        if (header) {
            header.appendChild(logoutButton);
        }
        else {
            document.body.insertBefore(logoutButton, document.body.firstChild);
        }
    }
    logoutButton.addEventListener("click", () => {
        localStorage.removeItem("loggedInUser");
        alert("You have logged out.");
        window.location.href = "index.html";
    });
    updateLogoutButton();
});
