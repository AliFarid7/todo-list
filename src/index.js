import "./styles.css";
import { fillDisplay, renderSidebarProjects, renderProjectTasks } from "./display.js";
import TodoNote from "./todo.js";
import Project from "./projects.js";
import { saveProjects, loadProjects } from "./storage.js"; // Import storage functions

const dialog = document.querySelector("#todoDialog");
const addNewTodoBtn = document.querySelector("#add-new-todo");
const todoForm = document.querySelector("#todoForm");
const closeDialogBtn = document.querySelector("#closeDialogBtn");

const projectDialog = document.querySelector("#projectDialog");
const openProjectModalBtn = document.querySelector("#openProjectModalBtn");
const closeProjectModalBtn = document.querySelector("#closeProjectModalBtn");
const projectForm = document.querySelector("#projectForm");

const inboxBtn = document.querySelector(".inboxBtn");

const projects = loadProjects();
let currentProject = projects[0];

let editingTodoId = null;

openProjectModalBtn.addEventListener("click", () => projectDialog.showModal());
closeProjectModalBtn.addEventListener("click", () => projectDialog.close());
closeDialogBtn.addEventListener("click", () => {
    resetTodoModal();
    dialog.close();
});

if (inboxBtn) {
    inboxBtn.addEventListener("click", () => {
        currentProject = projects[0];
        renderProjectTasks(currentProject, openEditModal, deleteTodo);
    });
}

function updateProjectDropdown(selectedProject = currentProject) {
    const projectSelect = document.querySelector("#projectSelect");
    projectSelect.innerHTML = "";

    projects.forEach((project, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = project.name;

        if (project === selectedProject) {
            option.selected = true;
        }

        projectSelect.appendChild(option);
    });
}

addNewTodoBtn.addEventListener("click", () => {
    resetTodoModal();
    updateProjectDropdown();
    dialog.showModal();
});

todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.querySelector("#title").value;
    const description = document.querySelector("#description").value;
    const dueDate = document.querySelector("#dueDate").value;
    const priority = document.querySelector("#priority").value;
    const selectedProjectIndex = document.querySelector("#projectSelect").value;
    const chosenProject = projects[selectedProjectIndex];

    if (editingTodoId) {
        let sourceProject = projects.find(proj => proj.todos.some(t => t.id === editingTodoId));
        if (!sourceProject) sourceProject = currentProject;

        const todoUpdate = sourceProject.todos.find(todo => todo.id === editingTodoId);

        if (todoUpdate) {
            todoUpdate.title = title;
            todoUpdate.description = description;
            todoUpdate.dueDate = dueDate;
            todoUpdate.priority = priority;

            if (chosenProject !== sourceProject) {
                sourceProject.deleteTodo(editingTodoId);
                chosenProject.addTodo(todoUpdate);
            }
        }
        editingTodoId = null;
    } else {
        const userTodo = new TodoNote(title, description, dueDate, priority);
        chosenProject.addTodo(userTodo);
    }

    saveProjects(projects);
    renderProjectTasks(currentProject, openEditModal, deleteTodo);

    resetTodoModal();
    dialog.close();
});

projectForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.querySelector("#projectName").value;
    const color = document.querySelector('input[name="projectColor"]:checked').value;

    const newProject = new Project(name, color);
    projects.push(newProject);

    saveProjects(projects);

    renderSidebarProjects(projects, (selectedProject) => {
        currentProject = selectedProject;
        renderProjectTasks(currentProject, openEditModal, deleteTodo);
    });

    projectForm.reset();
    projectDialog.close();
});

function openEditModal(todo) {
    editingTodoId = todo.id;
    document.querySelector("#title").value = todo.title;
    document.querySelector("#description").value = todo.description;
    document.querySelector("#dueDate").value = todo.dueDate;
    document.querySelector("#priority").value = todo.priority;

    document.querySelector("#todoDialog h2").textContent = "Edit Todo";
    document.querySelector("#saveTodoBtn").textContent = "Save Changes";

    const ownerProject = projects.find(proj => proj.todos.some(t => t.id === todo.id)) || currentProject;
    updateProjectDropdown(ownerProject);

    dialog.showModal();
}

function deleteTodo(todo) {
    currentProject.deleteTodo(todo.id);
    saveProjects(projects);
}

function resetTodoModal() {
    editingTodoId = null;
    todoForm.reset();
    document.querySelector("#todoDialog h2").textContent = "New Todo";
    document.querySelector("#saveTodoBtn").textContent = "Save Task";
}

renderSidebarProjects(projects, (selectedProject) => {
    currentProject = selectedProject;
    renderProjectTasks(currentProject, openEditModal, deleteTodo);
});
renderProjectTasks(currentProject, openEditModal, deleteTodo);