var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { fetchData, postData, deleteData } from "./apiService.js";
document.addEventListener("DOMContentLoaded", () => __awaiter(void 0, void 0, void 0, function* () {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser") || "null");
    if (!loggedInUser) {
        alert("You need to log in to book a course.");
        window.location.href = "login.html";
        return;
    }
    const courseSelect = document.getElementById("course-select");
    const bookingForm = document.getElementById("booking-form");
    const bookingList = document.getElementById("booking-list");
    // 🔹 Extract Course Name from URL (For Pre-filling)
    const params = new URLSearchParams(window.location.search);
    const selectedCourseFromURL = params.get("course");
    // 🔹 Load Courses for Selection
    function populateCourses() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const courses = yield fetchData("courses");
                courseSelect.innerHTML = `<option value="" disabled selected>Select a course</option>` +
                    courses.map(course => `<option value="${course.title}">${course.title}</option>`).join("");
                // Pre-fill course if found in URL
                if (selectedCourseFromURL) {
                    console.log("Prefilling course:", selectedCourseFromURL);
                    courseSelect.value = decodeURIComponent(selectedCourseFromURL);
                }
            }
            catch (error) {
                console.error("Error fetching courses:", error);
            }
        });
    }
    // 🔹 Load User's Bookings
    function loadUserBookings() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allBookings = yield fetchData("bookings");
                const userBookings = allBookings.filter(booking => booking.email === loggedInUser.email);
                bookingList.innerHTML = userBookings.length
                    ? userBookings.map(bookingTemplate).join("")
                    : "<p>No bookings found.</p>";
                attachCancelEvent();
            }
            catch (error) {
                console.error("Error loading bookings:", error);
            }
        });
    }
    // 🔹 Template for Booking Cards
    function bookingTemplate(booking) {
        return `
            <div class="booking-card" data-id="${booking.id}">
                <h3>${booking.course}</h3>
                <p><strong>Name:</strong> ${booking.customerName}</p>
                <p><strong>Email:</strong> ${booking.email}</p>
                <p><strong>Phone:</strong> ${booking.phone}</p>
                <p><strong>Billing Address:</strong> ${booking.billingAddress}</p>
                <button class="cancel-booking" data-id="${booking.id}">Cancel Booking</button>
            </div>`;
    }
    // 🔹 Handle Cancel Booking
    function attachCancelEvent() {
        document.querySelectorAll(".cancel-booking").forEach(button => button.addEventListener("click", (event) => __awaiter(this, void 0, void 0, function* () {
            const bookingId = event.currentTarget.getAttribute("data-id");
            if (!bookingId || !confirm("Are you sure you want to cancel this booking?"))
                return;
            yield deleteData("bookings", parseInt(bookingId, 10));
            loadUserBookings();
        })));
    }
    // 🔹 Handle Course Booking
    bookingForm.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault();
        const selectedCourse = courseSelect.value;
        const customerName = document.getElementById("customer-name").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const billingAddress = document.getElementById("billing-address").value.trim();
        if (!selectedCourse || !customerName || !phone || !billingAddress) {
            alert("Please fill in all fields.");
            return;
        }
        // 🔹 Generate a Numeric ID
        const existingBookings = yield fetchData("bookings");
        const newId = existingBookings.length > 0
            ? Math.max(...existingBookings.map((b) => Number(b.id) || 0)) + 1
            : 1;
        yield postData("bookings", {
            id: newId,
            course: selectedCourse,
            customerName,
            email: loggedInUser.email,
            phone,
            billingAddress
        });
        alert("Booking successful!");
        loadUserBookings();
    }));
    // Initialize
    yield populateCourses();
    yield loadUserBookings();
}));
