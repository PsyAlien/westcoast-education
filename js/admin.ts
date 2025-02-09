import { fetchData, patchData, postData, deleteData } from "./apiService.js";

document.addEventListener("DOMContentLoaded", async () => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser") || "null");
    if (!loggedInUser || loggedInUser.role !== "admin") {
        alert("Access denied! Admins only.");
        window.location.href = "index.html";
        return;
    }

    const courseList = document.getElementById("admin-course-list") as HTMLDivElement;

    async function displayCourses() {
        try {
            const courses = await fetchData("courses");
            courseList.innerHTML = courses.length ? courses.map(courseTemplate).join("") : "<p>No courses available.</p>";
            attachEventListeners();
        } catch (error) {
            console.error("Error displaying courses:", error);
            courseList.innerHTML = "<p>Failed to load courses.</p>";
        }
    }

    function courseTemplate(course) {
        return `
            <div class="course-card" data-id="${course.id}">
                <p><strong>Course:</strong> ${course.title}</p>
                <p><strong>Duration:</strong> ${course.duration} days</p>
                <p><strong>Cost:</strong> $${course.cost}</p>
                <p><strong>Mode:</strong> ${course.mode}</p>
                <p><strong>Description:</strong> ${course.description}</p>
                <button class="edit-course" data-id="${course.id}">Edit</button>
                <button class="delete-course" data-id="${course.id}">Delete</button>
            </div>`;
    }

    function attachEventListeners() {
        document.querySelectorAll(".edit-course").forEach(button => button.addEventListener("click", handleEdit));
        document.querySelectorAll(".delete-course").forEach(button => button.addEventListener("click", handleDelete));
    }

    function handleEdit(event) {
        const courseId = event.currentTarget.getAttribute("data-id");
        if (!courseId) return;
        makeCourseEditable(parseInt(courseId, 10));
    }

    function handleDelete(event) {
        const courseId = event.currentTarget.getAttribute("data-id");
        if (!courseId) return;
        if (confirm("Are you sure you want to delete this course?")) {
            deleteData("courses", parseInt(courseId, 10)).then(displayCourses);
        }
    }

    function makeCourseEditable(courseId) {
        const courseCard = document.querySelector(`.course-card[data-id="${courseId}"]`);
        if (!courseCard) return;

        courseCard.innerHTML = `
            <input type="text" class="edit-title" placeholder="Course Title">
            <input type="number" class="edit-duration" placeholder="Duration (days)">
            <input type="number" class="edit-cost" placeholder="Cost ($)">
            <select class="edit-mode">
                <option value="Online">Online</option>
                <option value="Classroom">Classroom</option>
            </select>
            <textarea class="edit-description" placeholder="Course Description"></textarea>
            <button class="save-course" data-id="${courseId}">Save</button>
        `;
        document.querySelector(`.save-course[data-id="${courseId}"]`)?.addEventListener("click", () => saveCourse(courseId));
    }

    async function saveCourse(courseId) {
        const courseCard = document.querySelector(`.course-card[data-id="${courseId}"]`);
        if (!courseCard) return;

        const title = (courseCard.querySelector(".edit-title") as HTMLInputElement).value.trim();
        const duration = parseInt((courseCard.querySelector(".edit-duration") as HTMLInputElement).value, 10);
        const cost = parseFloat((courseCard.querySelector(".edit-cost") as HTMLInputElement).value);
        const mode = (courseCard.querySelector(".edit-mode") as HTMLSelectElement).value;
        const description = (courseCard.querySelector(".edit-description") as HTMLTextAreaElement).value.trim();

        if (!title || isNaN(duration) || isNaN(cost) || !mode || !description) {
            alert("Please fill in all fields correctly.");
            return;
        }

        await patchData(`courses/${courseId}`, { title, duration, cost, mode, description });
        alert("Course updated successfully!");
        displayCourses();
    }

    displayCourses();
});
