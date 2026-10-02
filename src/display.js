import { format, formatDistanceToNow, parseISO } from "date-fns";

export function fillDisplay(todoObject, currentProject) {
    const todoDisplay = document.querySelector(".todoDisplay");
    const card = document.createElement("div");
    card.classList.add("todo-card");
    card.dataset.id = todoObject.id;
    
    const title = document.createElement("h3");
    title.textContent = todoObject.title;

    const description = document.createElement("p");
    description.textContent = todoObject.description;

    const dueDate = document.createElement("p");
    if (todoObject.dueDate) {
        const parsedDate = parseISO(todoObject.dueDate);
        const formattedDate = format(parsedDate, "MMM do, yyyy");
        const timeRemaining = formatDistanceToNow(parsedDate, { addSuffix: true });
        dueDate.textContent = `Due: ${formattedDate} (${timeRemaining})`;
    }

    const priority = document.createElement("div");
    priority.classList.add("priority-badge", todoObject.priority.toLowerCase());
    priority.textContent = `Priority: ${todoObject.priority}`;

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-btn");
    deleteButton.textContent = "Delete Note";

    deleteButton.addEventListener("click", () => {
        if (currentProject) {
            currentProject.deleteTodo(todoObject.id);
        }
        card.remove();
    });

    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(dueDate);
    card.appendChild(priority);
    card.appendChild(deleteButton);

    todoDisplay.appendChild(card);
}


export function renderSidebarProjects(projectsArray, onProjectClick) {
    const projectsList = document.querySelector("#projectsList");
    projectsList.innerHTML = "";

    projectsArray.slice(1).forEach((project) => {
        const btn = document.createElement("button");
        btn.classList.add("project-item-btn");

        const tag = document.createElement("span");
        tag.textContent = "# ";
        tag.style.color = project.color;
        tag.style.fontWeight = "bold";

        const label = document.createElement("span");
        label.textContent = project.name;

        btn.appendChild(tag);
        btn.appendChild(label);

        btn.addEventListener("click", () => {
            onProjectClick(project);
        });

        projectsList.appendChild(btn);
    });
}

export function renderProjectTasks(project) {
    const todoDisplay = document.querySelector(".todoDisplay");
    todoDisplay.innerHTML = "";

    project.todos.forEach((todoNote) => {
        fillDisplay(todoNote, project);
    });
}