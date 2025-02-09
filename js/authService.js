var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { fetchData, postData } from "./apiService.js";
export function register(fullName, email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("Registering user:", fullName, email);
            const users = yield fetchData("users");
            if (users.some((u) => u.email === email)) {
                alert("Email already registered!");
                return;
            }
            yield postData("users", { fullName, email, password, role: "user" });
            alert("Registration successful! You can now log in.");
            window.location.href = "login.html";
        }
        catch (error) {
            console.error("Registration error:", error);
            alert("Failed to register. Try again later.");
        }
    });
}
export function login(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("Logging in user:", email);
            const users = yield fetchData("users");
            const user = users.find((u) => u.email === email && u.password === password);
            if (!user) {
                alert("Invalid email or password.");
                return;
            }
            localStorage.setItem("loggedInUser", JSON.stringify(user));
            alert("Login successful!");
            window.location.href = user.role === "admin" ? "admin.html" : "index.html";
        }
        catch (error) {
            console.error("Login error:", error);
            alert("Failed to log in. Try again later.");
        }
    });
}
