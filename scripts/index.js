document.addEventListener('DOMContentLoaded', () => {
    // 1. Password Toggle Logic
    const passwordInput = document.getElementById('password');
    const toggleCheckbox = document.getElementById('togglePassword');

    if (passwordInput && toggleCheckbox) {
        toggleCheckbox.addEventListener('change', function() {
            passwordInput.type = this.checked ? 'text' : 'password';
        });
    }

    // 2. Save Username on Submit
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', () => {
            const user = document.getElementById('username').value;
            localStorage.setItem('plantasticUser', user);
        });
    }

    // 3. Date & Welcome Message Logic
    const welcomeHeading = document.getElementById('welcome-message');
    const savedUser = localStorage.getItem('plantasticUser');

    if (savedUser && welcomeHeading) {
        const now = new Date();
        const options = { weekday: 'long', month: 'long', day: 'numeric' };
        const dateString = now.toLocaleDateString('en-US', options);

        welcomeHeading.innerText = `Hey, ${savedUser}! Today is ${dateString}.`;
    }
});