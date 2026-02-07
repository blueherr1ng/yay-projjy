// storage.js - Handle localStorage for todos

const Storage = {
    STORAGE_KEY: 'garden-todos',
    
    // Get all todos from storage
    getTodos: function() {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    },
    
    // Save todos to storage
    saveTodos: function(todos) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(todos));
    },
    
    // Add a new todo
    addTodo: function(todo) {
        const todos = this.getTodos();
        todos.push(todo);
        this.saveTodos(todos);
        return todos;
    },
    
    // Update a todo by id
    updateTodo: function(id, updates) {
        const todos = this.getTodos();
        const index = todos.findIndex(t => t.id === id);
        if (index !== -1) {
            todos[index] = { ...todos[index], ...updates };
            this.saveTodos(todos);
        }
        return todos;
    },
    
    // Delete a todo by id
    deleteTodo: function(id) {
        const todos = this.getTodos();
        const filtered = todos.filter(t => t.id !== id);
        this.saveTodos(filtered);
        return filtered;
    },
    
    // Clear all completed todos
    clearCompleted: function() {
        const todos = this.getTodos();
        const active = todos.filter(t => !t.completed);
        this.saveTodos(active);
        return active;
    }
};
