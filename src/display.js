export function fillDisplay(todoObject) {
    const todoDisplay = document.querySelector(".todoDisplay");
    const card = document.createElement("div");
    card.classList.add("todo-card");

    const title = document.createElement("h3");
    title.textContent = todoObject.title;

    const description = document.createElement("p");
    description.textContent = todoObject.description;

    const dueDate = document.createElement("p");
    dueDate.textContent = `Due Date: ${todoObject.dueDate}`;

    const priority = document.createElement("div");
    priority.classList.add("priority-badge", todoObject.priority.toLowerCase());
    priority.textContent = `Priority: ${todoObject.priority}`;

    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(dueDate);
    card.appendChild(priority);
    todoDisplay.appendChild(card);
}