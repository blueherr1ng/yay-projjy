// main.js - Initialize and coordinate the app

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('🌸 Garden Task Manager initializing...');
    
    // Initialize components
    Garden.init();
    TodoList.init();
    
    // Render initial state
    TodoList.render();
    
    console.log('✨ Garden Task Manager ready!');
});

// Optional: Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K to focus input
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('todo-input').focus();
    }
});
