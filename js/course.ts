import { fetchData } from "./apiService.js";

document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get("id");

    if (!courseId) {
        console.error("Course ID missing in URL.");
        return;
    }

    try {
        const courses = await fetchData("courses");
        const course = courses.find(c => c.id.toString() === courseId);

        if (!course) {
            document.getElementById("course-details")!.innerHTML = "<p>Course not found.</p>";
            return;
        }

        (document.getElementById("course-title") as HTMLElement).textContent = course.title;
        (document.getElementById("course-number") as HTMLElement).textContent = course.id;
        (document.getElementById("course-duration") as HTMLElement).textContent = `${course.duration} days`;
        (document.getElementById("course-format") as HTMLElement).textContent = course.mode;
        (document.getElementById("course-date") as HTMLElement).textContent = course.date || "Not Scheduled";
        (document.getElementById("course-image") as HTMLImageElement).src = course.image;
        (document.getElementById("course-description") as HTMLElement).textContent = course.description;
    } catch (error) {
        console.error("Error fetching course details:", error);
    }
});
