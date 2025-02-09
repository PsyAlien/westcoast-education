import { login } from "./authService.js";

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("form") as HTMLFormElement;
    
    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const email = (document.getElementById("email") as HTMLInputElement).value.trim();
        const password = (document.getElementById("password") as HTMLInputElement).value.trim();
        
        if (!email || !password) {
            alert("Please enter both email and password.");
            return;
        }
        
        await login(email, password);
    });
});
