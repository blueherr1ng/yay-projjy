// garden.js - Handle flower rendering in the garden

const Garden = {
    container: null,
    emptyState: null,
    header: null,
    
    // Flower ASCII art templates
    FLOWER_ASCII: {
        rose: [
            '   🌹',
            '  /|\\',
            ' / | \\',
            '   |'
        ],
        tulip: [
            '  \\|/',
            '   🌷',
            '   |',
            '   |'
        ],
        daisy: [
            '  \\|/',
            ' -🌼-',
            '  /|\\',
            '   |'
        ],
        sunflower: [
            ' \\\\|//',
            ' -🌻-',
            ' //|\\\\',
            '   |'
        ],
        lily: [
            '  *|*',
            '  🌸',
            '   |',
            '   |'
        ]
    },
    
    // Flower type to emoji mapping
    FLOWER_ICONS: {
        rose: '🌹',
        tulip: '🌷',
        daisy: '🌼',
        sunflower: '🌻',
        lily: '🌸'
    },
    
    // Initialize the garden
    init: function() {
        this.container = document.getElementById('flowers-container');
        this.emptyState = document.getElementById('garden-empty');
        this.header = document.getElementById('garden-header');
    },
    
    // Render all flowers from todos
    renderFlowers: function(todos) {
    if (!this.container) return;
    
    if (typeof window.clearGardenCanvas === 'function') {
        window.clearGardenCanvas();
    }

    // 1. Clear the p5 canvas so we don't draw flowers on top of old ones
    if (window.clearGardenCanvas) {
        window.clearGardenCanvas();
    }

    const flowers = todos.filter(t => t.completed && t.flowerType);
    this.container.innerHTML = '';
    
    if (flowers.length === 0) {
        this.emptyState.style.display = 'flex';
    } else {
        this.emptyState.style.display = 'none';
        flowers.forEach((flower, index) => {
            // This now triggers both the ASCII and the p5.js flower
            this.addFlower(flower.flowerType, flower.position, index);
        });
    }
    this.updateHeader(flowers.length);
},

    // Add a single flower to the garden
    addFlower: function(type, position, index) {
    // Keep your ASCII emoji logic here if you want both!

    // Trigger the L-System in sketch.js using the stored position
    if (window.plantLSystemFlower) {
        window.plantLSystemFlower(position.x, position.y);
    }
},
    // Update garden header with flower count
    updateHeader: function(count) {
        const plural = count !== 1 ? 's' : '';
        this.header.textContent = `
┌────────────────────────────────────┐
│         🌻 YOUR GARDEN 🌻          │
│  ${count} flower${plural} blooming
└────────────────────────────────────┘
        `;
    },
    
    // Get random flower type
    getRandomFlowerType: function() {
        const types = Object.keys(this.FLOWER_ASCII);
        return types[Math.floor(Math.random() * types.length)];
    },
    
    // Get random position in the garden
    getRandomPosition: function() {
        return {
            x: Math.random() * 80,  // 0-80% of width
            y: Math.random() * 80   // 0-80% of height
        };
    },
    
    // Get flower icon emoji
    getFlowerIcon: function(type) {
        return this.FLOWER_ICONS[type] || '🌸';
    }
};
