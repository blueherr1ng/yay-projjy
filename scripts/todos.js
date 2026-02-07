// scripts/todos.js

const TodoList = {
    init: function() {
        // 1. Get Elements
        this.input = document.getElementById('todo-input');
        this.container = document.getElementById('todo-items');
        this.addBtn = document.getElementById('add-todo-btn');
        this.clearGardenBtn = document.getElementById('dev-clear-btn'); // New Dev Button

        // 2. Attach Event Listeners
        
        // Button Click
        if (this.addBtn) {
            this.addBtn.addEventListener('click', () => this.addTask());
        }
        
        // Enter Key (Fixed)
        if (this.input) {
            this.input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    this.addTask();
                }
            });
        }

        // Dev Button Listener
        if (this.clearGardenBtn) {
            this.clearGardenBtn.addEventListener('click', () => {
                if(confirm("NUKE THE GARDEN? (This cannot be undone)")) {
                    gardata.clear();
                    redraw();
                }
            });
        }

        // 3. Initial Render
        this.render();
    },

    addTask: function() {
        const text = this.input.value.trim();
        if (!text) return;

        const task = {
            id: Date.now(),
            text: text,
            done: false
        };

        const todos = this.getTodos();
        todos.push(task);
        this.saveTodos(todos);

        this.input.value = '';
        this.render();
    },

    toggleTask: function(id) {
        const todos = this.getTodos();
        const task = todos.find(t => t.id === id);
        
        if (task) {
            task.done = !task.done;
            
            // --- GARDEN TRIGGER (UPDATED) ---
            if (task.done) {
                // 1. X Position: Random spot in the left 66%
                const safeWidth = (window.innerWidth * 0.66); 
                const randomX = Math.random() * safeWidth;
                
                // 2. Y Position: DIVERSIFIED
                // We define a "Ground Zone" (the bottom 20% of the screen)
                const groundFloor = window.innerHeight - 20; // Bottom edge (minus padding)
                const horizonLine = window.innerHeight * 0.80; // 80% down the screen
                
                // Randomly pick a Y value between the Horizon and the Floor
                const randomY = Math.random() * (groundFloor - horizonLine) + horizonLine;

                if (typeof gardata !== 'undefined') {
                    gardata.addPlant(randomX, randomY);
                }
                
                if (typeof redraw === 'function') {
                    redraw();
                }
            }
            // --------------------------------

            this.saveTodos(todos);
            this.render();
        }
    },

    deleteTask: function(id) {
        let todos = this.getTodos();
        todos = todos.filter(t => t.id !== id);
        this.saveTodos(todos);
        this.render();
    },

    getTodos: function() {
        const data = localStorage.getItem('simple_todos');
        return data ? JSON.parse(data) : [];
    },

    saveTodos: function(todos) {
        localStorage.setItem('simple_todos', JSON.stringify(todos));
    },

    render: function() {
        const todos = this.getTodos();
        this.container.innerHTML = '';

        todos.forEach(task => {
            const item = document.createElement('div');
            item.className = 'todo-item';
            
            const textStyle = task.done ? 'text-decoration: line-through; opacity: 0.5;' : '';
            
            item.innerHTML = `
                <button class="check-btn">[${task.done ? 'x' : ' '}]</button>
                <span style="${textStyle}">${task.text}</span>
                <button class="del-btn" style="margin-left: auto;">[DEL]</button>
            `;

            item.querySelector('.check-btn').onclick = () => this.toggleTask(task.id);
            item.querySelector('.del-btn').onclick = () => this.deleteTask(task.id);

            this.container.appendChild(item);
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    TodoList.init();
});