import { fetchData } from "./apiService.js";

document.addEventListener("DOMContentLoaded", async () => {
    const courseList = document.getElementById("course-list") as HTMLDivElement;
    const categoryFilter = document.getElementById("category-filter") as HTMLSelectElement;
    const durationFilter = document.getElementById("duration-filter") as HTMLSelectElement;
    const searchInput = document.getElementById("search") as HTMLInputElement;

    let courses = await fetchData("courses");

    function displayCourses(filteredCourses) {
        courseList.innerHTML = filteredCourses.length
            ? filteredCourses.map(courseTemplate).join("")
            : "<p>No courses available.</p>";
    }

    function courseTemplate(course) {
        return `
            <div class="course-card">
                <img src="${course.image}" alt="${course.title}" class="course-image">
                <h3>${course.title}</h3>
                <p><strong>Category:</strong> ${course.category}</p>
                <p><strong>Duration:</strong> ${course.duration} days</p>
                <p><strong>Cost:</strong> $${course.cost}</p>
                <a href="course.html?id=${course.id}" class="button">View Details</a>
            </div>`;
    }

    function filterCourses() {
        let filteredCourses = courses;
        
        const selectedCategory = categoryFilter.value;
        if (selectedCategory !== "all") {
            filteredCourses = filteredCourses.filter(course => course.category === selectedCategory);
        }

        const selectedDuration = durationFilter.value;
        if (selectedDuration !== "all") {
            const durationAsNumber = parseInt(selectedDuration, 10);
            filteredCourses = filteredCourses.filter(course => course.duration === durationAsNumber);
        }

        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm) {
            filteredCourses = filteredCourses.filter(course =>
                course.title.toLowerCase().includes(searchTerm)
            );
        }

        displayCourses(filteredCourses);
    }

    categoryFilter.addEventListener("change", filterCourses);
    durationFilter.addEventListener("change", filterCourses);
    searchInput.addEventListener("input", filterCourses);

    displayCourses(courses);
});
