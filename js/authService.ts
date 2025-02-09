import { fetchData, postData } from "./apiService.js";

export async function register(fullName: string, email: string, password: string) {
    try {
        console.log("Registering user:", fullName, email);
        const users = await fetchData("users");

        if (users.some((u: { email: string }) => u.email === email)) {
            alert("Email already registered!");
            return;
        }

        await postData("users", { fullName, email, password, role: "user" });
        alert("Registration successful! You can now log in.");
        window.location.href = "login.html";
    } catch (error) {
        console.error("Registration error:", error);
        alert("Failed to register. Try again later.");
    }
}

export async function login(email: string, password: string) {
    try {
        console.log("Logging in user:", email);
        const users = await fetchData("users");

        const user = users.find((u: { email: string; password: string }) =>
            u.email === email && u.password === password
        );

        if (!user) {
            alert("Invalid email or password.");
            return;
        }

        localStorage.setItem("loggedInUser", JSON.stringify(user));
        alert("Login successful!");
        window.location.href = user.role === "admin" ? "admin.html" : "index.html";
    } catch (error) {
        console.error("Login error:", error);
        alert("Failed to log in. Try again later.");
    }
}
