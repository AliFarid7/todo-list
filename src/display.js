import { format, formatDistanceToNow, parseISO } from "date-fns";

export function fillDisplay(todoObject, currentProject, onEdit) {
    const todoDisplay = document.querySelector(".todoDisplay");
    const card = document.createElement("div");
    card.classList.add("todo-card");
    card.dataset.id = todoObject.id;

    card.classList.add(`priority-${todoObject.priority.toLowerCase()}`);

    const headerRow = document.createElement("div");
    headerRow.classList.add("todo-header-row");

    const title = document.createElement("h3");
    title.textContent = todoObject.title;

    const dueDate = document.createElement("span");
    dueDate.classList.add("todo-due-date");
    if (todoObject.dueDate) {
        const parsedDate = parseISO(todoObject.dueDate);
        const formattedDate = format(parsedDate, "MMM do, yyyy");
        dueDate.textContent = formattedDate;
    } else {
        dueDate.textContent = "No due date";
    }

    headerRow.appendChild(title);
    headerRow.appendChild(dueDate);

    const detailsContainer = document.createElement("div");
    detailsContainer.classList.add("todo-details");

    const description = document.createElement("p");
    description.textContent = todoObject.description || "No description provided.";

    const priority = document.createElement("div");
    priority.classList.add("priority-badge", todoObject.priority.toLowerCase());
    priority.textContent = `Priority: ${todoObject.priority}`;

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("todo-actions");

    const editButton = document.createElement("button");
    editButton.classList.add("edit-btn");
    editButton.textContent = "Edit Todo";
    editButton.addEventListener("click", (e) => {
        e.stopPropagation();
        onEdit(todoObject);
    });

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-btn");
    deleteButton.textContent = "Delete Note";
    deleteButton.addEventListener("click", (e) => {
        e.stopPropagation();
        if (currentProject) {
            currentProject.deleteTodo(todoObject.id);
        }
        card.remove();
    });

    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(deleteButton);

    detailsContainer.appendChild(description);
    detailsContainer.appendChild(priority);
    detailsContainer.appendChild(buttonContainer);

    card.appendChild(headerRow);
    card.appendChild(detailsContainer);

    card.addEventListener("click", () => {
        card.classList.toggle("expanded");
    });

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

export function renderProjectTasks(project, onEdit) {
    const todoDisplay = document.querySelector(".todoDisplay");
    todoDisplay.innerHTML = "";

    project.todos.forEach((todoNote) => {
        fillDisplay(todoNote, project, onEdit);
    });
}