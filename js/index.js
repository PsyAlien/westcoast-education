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
    const featuredCourses = document.getElementById("course-list");
    function displayFeaturedCourses() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const courses = yield fetchData("courses");
                if (!featuredCourses) {
                    console.error("Featured courses element not found!");
                    return;
                }
                featuredCourses.innerHTML = courses.length
                    ? courses.slice(0, 3).map(courseTemplate).join("")
                    : "<p>No featured courses available.</p>";
            }
            catch (error) {
                console.error("Error displaying featured courses:", error);
                featuredCourses.innerHTML = "<p>Failed to load courses.</p>";
            }
        });
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
}));
