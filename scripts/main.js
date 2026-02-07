// main.js - Initialize and coordinate the app

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('🌸 Garden Task Manager initializing...');
    
    // Initialize components
    Garden.init();
    TodoList.init();
    Friends.init();
    
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

// --- 1. CONFIGURATION ---
const MOCK_FRIENDS = [
    { name: "Saphira", tasks: 12 },
    { name: "Atlas", tasks: 5 },
    { name: "Luna", tasks: 20 }
];

// --- 2. THE TOGGLE LOGIC ---
const popup = document.getElementById('friends-popup');
const trigger = document.getElementById('community-trigger');
const closeBtn = document.getElementById('close-popup');

trigger.onclick = () => popup.classList.add('show');
closeBtn.onclick = () => popup.classList.remove('show');

// Close popup if they click outside the white box
window.onclick = (event) => {
    if (event.target == popup) popup.classList.remove('show');
};

// --- 3. THE VIEW SWITCHER ---
function renderGardenView(name, count, isVisiting) {
    const gardenContainer = document.getElementById('garden'); // Replace with your garden ID
    const todoSection = document.getElementById('todo-container'); // Replace with your to-do ID
    const title = document.querySelector('h1');
    const exitBtn = document.getElementById('exit-visit');

    // Hide popup after selection
    popup.classList.remove('show');

    // UPDATE UI
    title.innerText = isVisiting ? `${name}'s Garden` : "My Garden";
    exitBtn.style.display = isVisiting ? 'block' : 'none';
    
    // SAFETY: Hide your list while visiting so it's not overwritten
    if (todoSection) todoSection.style.display = isVisiting ? 'none' : 'block';

    // DRAW FLOWERS (Use your existing flower-creation loop here)
    gardenContainer.innerHTML = ''; 
    for (let i = 0; i < count; i++) {
        const flower = document.createElement('div');
        flower.className = 'flower'; 
        // ... (insert your original positioning logic here) ...
        gardenContainer.appendChild(flower);
    }
}

// --- 4. INITIALIZE FRIENDS LIST ---
function initFriends() {
    const list = document.getElementById('friends-list');
    MOCK_FRIENDS.forEach(friend => {
        const row = document.createElement('div');
        row.style.margin = "10px 0";
        row.style.display = "flex";
        row.style.justifyContent = "space-between";
        
        row.innerHTML = `
            <span>${friend.name} (${friend.tasks} 🌸)</span>
            <button class="visit-btn" style="cursor:pointer">Visit</button>
        `;
        
        row.querySelector('.visit-btn').onclick = () => {
            renderGardenView(friend.name, friend.tasks, true);
        };
        list.appendChild(row);
    });

    // Exit visit logic
    document.getElementById('exit-visit').onclick = () => {
        // Calculate your REAL current task count
        const myTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const completed = myTasks.filter(t => t.completed).length;
        renderGardenView("Me", completed, false);
    };
}

document.addEventListener('DOMContentLoaded', initFriends);