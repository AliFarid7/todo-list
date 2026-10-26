import Project from "./projects.js";
import TodoNote from "./todo.js";

const STORAGE_KEY = "todo_projects";

export function saveProjects(projects) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export function loadProjects() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
        return [new Project("Inbox", "#3b82f6")];
    }

    const parsedData = JSON.parse(data);
    return parsedData.map(projData => {
        const project = new Project(projData.name, projData.color);
        project.id = projData.id || project.id;
        
        project.todos = projData.todos.map(todoData => {
            const todo = new TodoNote(
                todoData.title, 
                todoData.description, 
                todoData.dueDate, 
                todoData.priority
            );
            todo.id = todoData.id || todo.id;
            return todo;
        });

        return project;
    });
}