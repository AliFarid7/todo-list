export default class TodoNote {
    constructor(title, description, dueDate, priority, notes, checklist) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.id = (window.crypto && window.crypto.randomUUID)
            ? window.crypto.randomUUID()
            : Date.now().toString(36) + Math.random().toString(36.2); this.notes = notes;
        this.checklist = checklist;
    }
}