export default class Project {
    constructor(name, color = "#3b82f6") {
        this.id = crypto.randomUUID();
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