// Basic password protection script
(function() {
    // Configuration
    const PASSWORD = "magnolia2023"; // Change this to your desired password
    const STORAGE_KEY = "snm_authenticated";
    const EXPIRY_DAYS = 7; // How long the authentication lasts
    
    // Check if user is already authenticated
    function isAuthenticated() {
        const authData = localStorage.getItem(STORAGE_KEY);
        if (!authData) return false;
        
        try {
            const { timestamp, expires } = JSON.parse(authData);
            const now = new Date().getTime();
            return now < expires;
        } catch (e) {
            return false;
        }
    }
    
    // Set authentication
    function setAuthenticated() {
        const now = new Date().getTime();
        const expires = now + (EXPIRY_DAYS * 24 * 60 * 60 * 1000);
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
            timestamp: now,
            expires: expires
        }));
    }
    
    // Create and show login overlay
    function showLoginOverlay() {
        // Create overlay elements
        const overlay = document.createElement('div');
        overlay.className = 'password-overlay';
        
        const container = document.createElement('div');
        container.className = 'password-container';
        
        const logo = document.createElement('h2');
        logo.textContent = 'Seattle North Magnolia';
        
        const form = document.createElement('form');
        form.className = 'password-form';
        
        const heading = document.createElement('h3');
        heading.textContent = 'Protected Page';
        
        const instruction = document.createElement('p');
        instruction.textContent = 'Please enter the password to access this page:';
        
        const inputGroup = document.createElement('div');
        inputGroup.className = 'password-input-group';
        
        const input = document.createElement('input');
        input.type = 'password';
        input.placeholder = 'Enter password';
        input.required = true;
        
        const button = document.createElement('button');
        button.type = 'submit';
        button.className = 'btn primary-btn';
        button.textContent = 'Submit';
        
        const errorMsg = document.createElement('p');
        errorMsg.className = 'password-error';
        errorMsg.style.display = 'none';
        errorMsg.textContent = 'Incorrect password. Please try again.';
        
        // Assemble the elements
        inputGroup.appendChild(input);
        inputGroup.appendChild(button);
        
        form.appendChild(heading);
        form.appendChild(instruction);
        form.appendChild(inputGroup);
        form.appendChild(errorMsg);
        
        container.appendChild(logo);
        container.appendChild(form);
        
        overlay.appendChild(container);
        
        // Add to document
        document.body.appendChild(overlay);
        
        // Prevent scrolling on the body
        document.body.style.overflow = 'hidden';
        
        // Handle form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (input.value === PASSWORD) {
                setAuthenticated();
                document.body.removeChild(overlay);
                document.body.style.overflow = '';
            } else {
                errorMsg.style.display = 'block';
                input.value = '';
                input.focus();
            }
        });
        
        // Focus the input
        setTimeout(() => input.focus(), 100);
    }
    
    // Main function
    function init() {
        if (!isAuthenticated()) {
            // Hide content briefly to prevent flash
            document.body.style.opacity = '0';
            
            // Wait for DOM to be fully loaded
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => {
                    showLoginOverlay();
                    document.body.style.opacity = '1';
                });
            } else {
                showLoginOverlay();
                document.body.style.opacity = '1';
            }
        }
    }
    
    // Run the protection
    init();
})(); 