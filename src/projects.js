export default class Project {
    constructor(name, color = "#3b82f6") {
        this.id = (window.crypto && window.crypto.randomUUID)
            ? window.crypto.randomUUID()
            : Date.now().toString(36) + Math.random().toString(36.2);
        this.name = name;
        this.color = color;
        this.todos = [];
    }

    addTodo(todo) {
        this.todos.push(todo);
    }

    deleteTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
    }
}