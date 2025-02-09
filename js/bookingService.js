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
export function bookCourse(course, customerName, email, phone, billingAddress) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("Booking course:", course, customerName, email, phone, billingAddress);
            // Fetch existing bookings to determine the next numeric ID
            const existingBookings = yield fetchData("bookings");
            // Ensure the ID is always a number
            const newId = existingBookings.length > 0
                ? Math.max(...existingBookings.map((b) => Number(b.id) || 0)) + 1
                : 1;
            yield postData("bookings", {
                id: newId, // Ensure the ID is numeric
                course,
                customerName,
                email,
                phone,
                billingAddress
            });
            alert("Booking successful!");
            window.location.href = "index.html";
        }
        catch (error) {
            console.error("Error during booking:", error);
            alert("Failed to book the course. Try again later.");
        }
    });
}
