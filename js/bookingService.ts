import { fetchData, postData } from "./apiService.js";

export async function bookCourse(course: string, customerName: string, email: string, phone: string, billingAddress: string) {
    try {
        console.log("Booking course:", course, customerName, email, phone, billingAddress);

        // Fetch existing bookings to determine the next numeric ID
        const existingBookings = await fetchData("bookings");
        
        // Ensure the ID is always a number
        const newId = existingBookings.length > 0 
            ? Math.max(...existingBookings.map((b: any) => Number(b.id) || 0)) + 1 
            : 1;

        await postData("bookings", {
            id: newId, // Ensure the ID is numeric
            course,
            customerName,
            email,
            phone,
            billingAddress
        });

        alert("Booking successful!");
        window.location.href = "index.html";
    } catch (error) {
        console.error("Error during booking:", error);
        alert("Failed to book the course. Try again later.");
    }
}
