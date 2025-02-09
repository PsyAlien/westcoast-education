var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { fetchData, deleteData } from "./apiService.js";
document.addEventListener("DOMContentLoaded", () => __awaiter(void 0, void 0, void 0, function* () {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser") || "null");
    if (!loggedInUser || loggedInUser.role !== "admin") {
        alert("Access denied! Admins only.");
        window.location.href = "index.html";
        return;
    }
    const bookingList = document.getElementById("booking-list");
    function displayBookings() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bookings = yield fetchData("bookings");
                console.log("Fetched bookings:", bookings); // Debugging Log
                if (!bookingList) {
                    console.error("Booking list element not found!");
                    return;
                }
                if (bookings.length === 0) {
                    bookingList.innerHTML = "<p>No bookings available.</p>";
                    return;
                }
                bookingList.innerHTML = bookings.map(booking => `
                <div class="booking-card">
                    <h3>Course: ${booking.course}</h3>
                    <p><strong>Name:</strong> ${booking.customerName}</p>
                    <p><strong>Email:</strong> ${booking.email}</p>
                    <p><strong>Phone:</strong> ${booking.phone}</p>
                    <p><strong>Billing Address:</strong> ${booking.billingAddress}</p>
                    <button class="cancel-booking" data-id="${booking.id}">Cancel</button>
                </div>
            `).join("");
                attachCancelEvents();
            }
            catch (error) {
                console.error("Error displaying bookings:", error);
                bookingList.innerHTML = "<p>Failed to load bookings.</p>";
            }
        });
    }
    function attachCancelEvents() {
        document.querySelectorAll(".cancel-booking").forEach(button => {
            button.addEventListener("click", (event) => __awaiter(this, void 0, void 0, function* () {
                const target = event.currentTarget;
                const bookingId = target.getAttribute("data-id");
                if (!bookingId)
                    return;
                if (confirm("Are you sure you want to cancel this booking?")) {
                    yield deleteData("bookings", parseInt(bookingId, 10));
                    displayBookings();
                }
            }));
        });
    }
    displayBookings();
}));
