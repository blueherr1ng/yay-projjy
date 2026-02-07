// This tells the browser: "Wait until the HTML is fully finished loading"
document.addEventListener('DOMContentLoaded', () => {
    
    const passwordInput = document.getElementById('password');
    const toggleCheckbox = document.getElementById('togglePassword');

    console.log("Script loaded! Found input:", !!passwordInput, "Found checkbox:", !!toggleCheckbox);

    if (passwordInput && toggleCheckbox) {
        toggleCheckbox.addEventListener('change', function() {
            passwordInput.type = this.checked ? 'text' : 'password';
            console.log("Password type is now:", passwordInput.type);
        });
    }

    const loginForm = document.querySelector('form');
    const usernameInput = document.getElementById('username');

    if (loginForm) {
        loginForm.addEventListener('submit', () => {
            const nameValue = usernameInput.value;
            localStorage.setItem('plantasticUser', nameValue);
        });
    }
});