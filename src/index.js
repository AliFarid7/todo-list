import "./styles.css";
import { fillDisplay } from "./display.js";

const dialog = document.querySelector("#todoDialog");
const addNewTodoBtn = document.querySelector("#add-new-todo");
const todoForm = document.querySelector("#todoForm");
const closeDialogBtn = document.querySelector("#closeDialogBtn");

addNewTodoBtn.addEventListener("click", () => {
    dialog.showModal();
});

closeDialogBtn.addEventListener("click", () => {
    dialog.close();
});

todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.querySelector("#title").value;
    const description = document.querySelector("#description").value;
    const dueDate = document.querySelector("#dueDate").value;
    const priority = document.querySelector("#priority").value;

    const userTodo = { title, description, dueDate, priority };

    fillDisplay(userTodo);
    todoForm.reset();
    dialog.close();
});