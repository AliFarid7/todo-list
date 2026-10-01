import "./styles.css";
import { fillDisplay, renderSidebarProjects, renderProjectTasks } from "./display.js";
import TodoNote from "./todo.js";
import Project from "./projects.js";

const dialog = document.querySelector("#todoDialog");
const addNewTodoBtn = document.querySelector("#add-new-todo");
const todoForm = document.querySelector("#todoForm");
const closeDialogBtn = document.querySelector("#closeDialogBtn");

const projectDialog = document.querySelector("#projectDialog");
const openProjectModalBtn = document.querySelector("#openProjectModalBtn");
const closeProjectModalBtn = document.querySelector("#closeProjectModalBtn");
const projectForm = document.querySelector("#projectForm");

const defaultProject = new Project("Inbox", "#3b82f6");
const projects = [defaultProject];
let currentProject = defaultProject;

openProjectModalBtn.addEventListener("click", () => projectDialog.showModal());
closeProjectModalBtn.addEventListener("click", () => projectDialog.close());
closeDialogBtn.addEventListener("click", () => dialog.close());

addNewTodoBtn.addEventListener("click", () => {
    updateProjectDropdown();
    dialog.showModal();
});

function updateProjectDropdown() {
    const projectSelect = document.querySelector("#projectSelect");
    projectSelect.innerHTML = "";

    projects.forEach((project, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = project.name;
        projectSelect.appendChild(option);
    });
}

todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.querySelector("#title").value;
    const description = document.querySelector("#description").value;
    const dueDate = document.querySelector("#dueDate").value;
    const priority = document.querySelector("#priority").value;
    const selectedProjectIndex = document.querySelector("#projectSelect").value;
    const chosenProject = projects[selectedProjectIndex];

    const userTodo = new TodoNote(title, description, dueDate, priority);
    chosenProject.addTodo(userTodo);

    fillDisplay(userTodo, chosenProject);
    todoForm.reset();
    dialog.close();
});

projectForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.querySelector("#projectName").value;
    const color = document.querySelector("#projectColor").value;

    const newProject = new Project(name, color);
    projects.push(newProject);

    renderSidebarProjects(projects, (selectedProject) => {
        currentProject = selectedProject;
        renderProjectTasks(currentProject);
    });
    
    projectForm.reset();
    projectDialog.close();
});