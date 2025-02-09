import { fetchData, postData, deleteData } from "./apiService.js";

document.addEventListener("DOMContentLoaded", async () => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser") || "null");
    
    if (!loggedInUser) {
        alert("You need to log in to book a course.");
        window.location.href = "login.html";
        return;
    }

    const courseSelect = document.getElementById("course-select") as HTMLSelectElement;
    const bookingForm = document.getElementById("booking-form") as HTMLFormElement;
    const bookingList = document.getElementById("booking-list") as HTMLDivElement;

    // 🔹 Extract Course Name from URL (For Pre-filling)
    const params = new URLSearchParams(window.location.search);
    const selectedCourseFromURL = params.get("course");

    // 🔹 Load Courses for Selection
    async function populateCourses() {
        try {
            const courses = await fetchData("courses");
            courseSelect.innerHTML = `<option value="" disabled selected>Select a course</option>` + 
                courses.map(course => `<option value="${course.title}">${course.title}</option>`).join("");

            // Pre-fill course if found in URL
            if (selectedCourseFromURL) {
                console.log("Prefilling course:", selectedCourseFromURL);
                courseSelect.value = decodeURIComponent(selectedCourseFromURL);
            }
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
    }

    // 🔹 Load User's Bookings
    async function loadUserBookings() {
        try {
            const allBookings = await fetchData("bookings");
            const userBookings = allBookings.filter(booking => booking.email === loggedInUser.email);
            
            bookingList.innerHTML = userBookings.length 
                ? userBookings.map(bookingTemplate).join("") 
                : "<p>No bookings found.</p>";

            attachCancelEvent();
        } catch (error) {
            console.error("Error loading bookings:", error);
        }
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
        document.querySelectorAll(".cancel-booking").forEach(button => 
            button.addEventListener("click", async (event) => {
                const bookingId = (event.currentTarget as HTMLButtonElement).getAttribute("data-id");
                
                if (!bookingId || !confirm("Are you sure you want to cancel this booking?")) return;

                await deleteData("bookings", parseInt(bookingId, 10));
                loadUserBookings();
            })
        );
    }

    // 🔹 Handle Course Booking
    bookingForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const selectedCourse = courseSelect.value;
        const customerName = (document.getElementById("customer-name") as HTMLInputElement).value.trim();
        const phone = (document.getElementById("phone") as HTMLInputElement).value.trim();
        const billingAddress = (document.getElementById("billing-address") as HTMLInputElement).value.trim();

        if (!selectedCourse || !customerName || !phone || !billingAddress) {
            alert("Please fill in all fields.");
            return;
        }

        // 🔹 Generate a Numeric ID
        const existingBookings = await fetchData("bookings");
        const newId = existingBookings.length > 0 
            ? Math.max(...existingBookings.map((b: any) => Number(b.id) || 0)) + 1 
            : 1;

        await postData("bookings", { 
            id: newId, 
            course: selectedCourse, 
            customerName, 
            email: loggedInUser.email, 
            phone, 
            billingAddress 
        });

        alert("Booking successful!");
        loadUserBookings();
    });

    // Initialize
    await populateCourses();
    await loadUserBookings();
});
