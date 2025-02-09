import { register } from "./authService.js";

document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.querySelector("form") as HTMLFormElement;
    
    registerForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const fullName = (document.getElementById("full-name") as HTMLInputElement).value.trim();
        const email = (document.getElementById("email") as HTMLInputElement).value.trim();
        const password = (document.getElementById("password") as HTMLInputElement).value.trim();
        const confirmPassword = (document.getElementById("confirm-password") as HTMLInputElement).value.trim();
        
        if (!fullName || !email || !password || !confirmPassword) {
            alert("Please fill in all fields.");
            return;
        }
        
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }
        
        await register(fullName, email, password);
    });
});
