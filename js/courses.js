var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { fetchData } from "./apiService.js";
document.addEventListener("DOMContentLoaded", () => __awaiter(void 0, void 0, void 0, function* () {
    const courseList = document.getElementById("course-list");
    const categoryFilter = document.getElementById("category-filter");
    const durationFilter = document.getElementById("duration-filter");
    const searchInput = document.getElementById("search");
    let courses = yield fetchData("courses");
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
            filteredCourses = filteredCourses.filter(course => course.title.toLowerCase().includes(searchTerm));
        }
        displayCourses(filteredCourses);
    }
    categoryFilter.addEventListener("change", filterCourses);
    durationFilter.addEventListener("change", filterCourses);
    searchInput.addEventListener("input", filterCourses);
    displayCourses(courses);
}));
