import { fetchData } from "./apiService.js";

document.addEventListener("DOMContentLoaded", async () => {
    const featuredCourses = document.getElementById("course-list") as HTMLDivElement;

    async function displayFeaturedCourses() {
        try {
            const courses = await fetchData("courses");
            if (!featuredCourses) {
                console.error("Featured courses element not found!");
                return;
            }
            featuredCourses.innerHTML = courses.length
                ? courses.slice(0, 3).map(courseTemplate).join("")
                : "<p>No featured courses available.</p>";
        } catch (error) {
            console.error("Error displaying featured courses:", error);
            featuredCourses.innerHTML = "<p>Failed to load courses.</p>";
        }
    }

    function courseTemplate(course) {
        return `
            <div class="course-card">
                <img src="${course.image}" alt="${course.title}" class="course-image">
                <h3>${course.title}</h3>
                <p><strong>Duration:</strong> ${course.duration} days</p>
                <p><strong>Cost:</strong> $${course.cost}</p>
                <a href="course.html?id=${course.id}" class="button">View Details</a>
            </div>`;
    }

    displayFeaturedCourses();
});
