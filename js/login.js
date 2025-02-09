var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { login } from "./authService.js";
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("form");
    loginForm.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        if (!email || !password) {
            alert("Please enter both email and password.");
            return;
        }
        yield login(email, password);
    }));
});
