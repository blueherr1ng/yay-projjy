// friends.js - Handles friends

const Friends = {
    container: null,
    emptyState: null,
    header: null,

    //initialize
    init: function() {
        this.header = document.getElementById('friends-header');

         // Event listeners
        this.addBtn.addEventListener('click', () => this.goFriendGarden());
    },

    goFriendGarden: function() {
        friendgarden.init();
    },
    
    // Update friends header
    updateHeader: function(active, completed) {
        this.header.textContent = `
         FRIENDS
        `;
    }
}