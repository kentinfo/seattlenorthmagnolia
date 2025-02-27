document.addEventListener('DOMContentLoaded', function() {
    // Toggle between login and signup forms
    const toggleLinks = document.querySelectorAll('.toggle-form');
    
    if (toggleLinks) {
        toggleLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetFormId = this.getAttribute('data-target');
                const targetForm = document.getElementById(targetFormId);
                const currentForm = document.querySelector('.login-box:not(.hidden)');
                
                currentForm.classList.add('hidden');
                targetForm.classList.remove('hidden');
            });
        });
    }
    
    // Handle login form submission
    const loginForm = document.querySelector('#login-form form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('#email').value;
            const password = this.querySelector('#password').value;
            
            // In a real application, you would send this data to a server for authentication
            // For now, we'll just show an alert
            alert(`Login attempt with email: ${email}. In a real application, this would authenticate with a server.`);
            
            // Simulate successful login
            window.location.href = '#'; // In a real app, this might redirect to a members dashboard
        });
    }
    
    // Handle signup form submission
    const signupForm = document.querySelector('#signup-form form');
    
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = this.querySelector('#full-name').value;
            const email = this.querySelector('#signup-email').value;
            const password = this.querySelector('#signup-password').value;
            const confirmPassword = this.querySelector('#confirm-password').value;
            
            // Simple validation
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }
            
            // In a real application, you would send this data to a server to create an account
            // For now, we'll just show an alert
            alert(`Account creation attempt for ${name} (${email}). In a real application, this would create an account on the server.`);
            
            // Simulate successful signup
            window.location.href = '#'; // In a real app, this might redirect to a welcome page
        });
    }
    
    // Scroll to signup form when "Sign Up Now" button is clicked
    const scrollToButtons = document.querySelectorAll('.scroll-to');
    
    if (scrollToButtons) {
        scrollToButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                // Show signup form if it's hidden
                if (targetId === '#signup-form' && targetElement.classList.contains('hidden')) {
                    document.querySelector('#login-form').classList.add('hidden');
                    targetElement.classList.remove('hidden');
                }
                
                // Scroll to the element
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        });
    }
}); 