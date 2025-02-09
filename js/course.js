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
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get("id");
    if (!courseId) {
        console.error("Course ID missing in URL.");
        return;
    }
    try {
        const courses = yield fetchData("courses");
        const course = courses.find(c => c.id.toString() === courseId);
        if (!course) {
            document.getElementById("course-details").innerHTML = "<p>Course not found.</p>";
            return;
        }
        document.getElementById("course-title").textContent = course.title;
        document.getElementById("course-number").textContent = course.id;
        document.getElementById("course-duration").textContent = `${course.duration} days`;
        document.getElementById("course-format").textContent = course.mode;
        document.getElementById("course-date").textContent = course.date || "Not Scheduled";
        document.getElementById("course-image").src = course.image;
        document.getElementById("course-description").textContent = course.description;
    }
    catch (error) {
        console.error("Error fetching course details:", error);
    }
}));
