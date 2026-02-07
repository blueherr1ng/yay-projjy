// todos.js - Handle todo list rendering and interaction

const TodoList = {
    container: null,
    input: null,
    addBtn: null,
    emptyState: null,
    statsContainer: null,
    statsText: null,
    header: null,
    
    // Initialize todo list
    init: function() {
        this.container = document.getElementById('todo-items');
        this.input = document.getElementById('todo-input');
        this.addBtn = document.getElementById('add-todo-btn');
        this.emptyState = document.getElementById('empty-todos');
        this.statsContainer = document.getElementById('todo-stats');
        this.statsText = document.getElementById('stats-text');
        this.header = document.getElementById('todo-header');
        
        // Event listeners
        this.addBtn.addEventListener('click', () => this.handleAddTodo());
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleAddTodo();
        });
    },
    
    // Handle adding a new todo
    handleAddTodo: function() {
        const text = this.input.value.trim();
        if (!text) return;
        
        const todo = {
            id: Date.now().toString(),
            text: text,
            completed: false
        };
        
        Storage.addTodo(todo);
        this.input.value = '';
        this.render();
    },
    
    // Handle toggling todo completion
    handleToggle: function(id) {
        const todos = Storage.getTodos();
        const todo = todos.find(t => t.id === id);
        
        if (!todo) return;
        
        if (!todo.completed) {
            // Completing a todo - grow a flower!
            const flowerType = Garden.getRandomFlowerType();
            const position = Garden.getRandomPosition();
            
            Storage.updateTodo(id, {
                completed: true,
                flowerType: flowerType,
                position: position
            });
        } else {
            // Uncompleting - remove flower data
            Storage.updateTodo(id, {
                completed: false,
                flowerType: undefined,
                position: undefined
            });
        }
        
        this.render();
    },
    
    // Handle deleting a todo
    handleDelete: function(id) {
        Storage.deleteTodo(id);
        this.render();
    },
    
    // Handle clearing all completed todos
    handleClearCompleted: function() {
        if (confirm('Clear all completed tasks and their flowers?')) {
            Storage.clearCompleted();
            this.render();
        }
    },
    
    // Render the todo list
    render: function() {
        const todos = Storage.getTodos();
        const activeTodos = todos.filter(t => !t.completed);
        const completedTodos = todos.filter(t => t.completed);
        
        // Clear container
        this.container.innerHTML = '';
        
        // Show/hide empty state
        if (todos.length === 0) {
            this.emptyState.style.display = 'flex';
            this.statsContainer.style.display = 'none';
        } else {
            this.emptyState.style.display = 'none';
            this.statsContainer.style.display = 'block';
            
            // Render active todos
            if (activeTodos.length > 0) {
                this.renderSection('Active Tasks', activeTodos, false);
            }
            
            // Render completed todos
            if (completedTodos.length > 0) {
                this.renderSection('Completed Tasks', completedTodos, true);
            }
            
            // Update stats
            this.updateStats(todos.length, activeTodos.length, completedTodos.length);
        }
        
        // Update header
        this.updateHeader(activeTodos.length, completedTodos.length);
        
        // Update garden
        Garden.renderFlowers(todos);
    },
    
    // Render a section (active or completed)
    renderSection: function(title, todos, isCompleted) {
        const section = document.createElement('div');
        section.className = 'todo-section' + (isCompleted ? ' completed-section' : '');
        
        // Section header
        const headerDiv = document.createElement('div');
        headerDiv.className = 'section-header';
        
        const titlePre = document.createElement('pre');
        titlePre.className = 'section-title';
        titlePre.textContent = `[ ${title.toUpperCase()} ]`;
        headerDiv.appendChild(titlePre);
        
        // Clear completed button
        if (isCompleted) {
            const clearBtn = document.createElement('button');
            clearBtn.className = 'clear-button';
            clearBtn.innerHTML = '<pre>[CLEAR ALL]</pre>';
            clearBtn.addEventListener('click', () => this.handleClearCompleted());
            headerDiv.appendChild(clearBtn);
        }
        
        section.appendChild(headerDiv);
        
        // Render todos
        todos.forEach(todo => {
            section.appendChild(this.createTodoItem(todo));
        });
        
        this.container.appendChild(section);
    },
    
    // Create a single todo item element
    createTodoItem: function(todo) {
        const item = document.createElement('div');
        item.className = 'todo-item';
        
        // Checkbox
        const checkbox = document.createElement('button');
        checkbox.className = 'todo-checkbox' + (todo.completed ? ' checked' : '');
        checkbox.innerHTML = todo.completed ? '<pre>[✓]</pre>' : '<pre>[ ]</pre>';
        checkbox.addEventListener('click', () => this.handleToggle(todo.id));
        
        // Text
        const text = document.createElement('span');
        text.className = 'todo-text' + (todo.completed ? ' completed' : '');
        text.textContent = todo.text;
        
        // Add flower icon if completed
        if (todo.completed && todo.flowerType) {
            const icon = document.createElement('span');
            icon.className = 'flower-icon';
            icon.textContent = ' ' + Garden.getFlowerIcon(todo.flowerType);
            text.appendChild(icon);
        }
        
        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-button';
        deleteBtn.innerHTML = '<pre>[X]</pre>';
        deleteBtn.title = 'Delete task';
        deleteBtn.addEventListener('click', () => this.handleDelete(todo.id));
        
        item.appendChild(checkbox);
        item.appendChild(text);
        item.appendChild(deleteBtn);
        
        return item;
    },
    
    // Update stats footer
    updateStats: function(total, active, completed) {
        this.statsText.textContent = `
┌────────────────────────────────────┐
│ Total: ${total.toString().padEnd(3)} │ Active: ${active.toString().padEnd(3)} │ Done: ${completed.toString().padEnd(3)} │
└────────────────────────────────────┘
        `;
    },
    
    // Update todo header
    updateHeader: function(active, completed) {
        this.header.textContent = `
┌────────────────────────────────────┐
│          ✓ TASK LIST ✓            │
│  ${active} active · ${completed} completed
└────────────────────────────────────┘
        `;
    }
};
