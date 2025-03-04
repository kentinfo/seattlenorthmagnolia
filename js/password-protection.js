// Basic password protection script
(function() {
    // Configuration
    const PASSWORD = "magnolia25"; // Change this to your desired password
    const STORAGE_KEY = "snm_authenticated";
    const EXPIRY_DAYS = 7; // How long the authentication lasts
    const redirectUrl = "//www.seattlenorthmagnolia.com/";
    
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
    
    // Apply blur effect to page content
    function applyBlurEffect() {
        // Create a style element
        const style = document.createElement('style');
        style.id = 'blur-style';
        style.textContent = `
            body > *:not(.password-overlay) {
                filter: blur(8px);
                user-select: none;
                pointer-events: none;
                transition: filter 0.3s ease;
            }
            
            .password-overlay {
                backdrop-filter: none !important;
                background-color: rgba(0, 0, 0, 0.5) !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Remove blur effect
    function removeBlurEffect() {
        const blurStyle = document.getElementById('blur-style');
        if (blurStyle) {
            blurStyle.remove();
        }
    }
    
    // Create and show login overlay
    function showLoginOverlay() {
        // Apply blur effect first
        applyBlurEffect();
        
        // Create overlay elements
        const overlay = document.createElement('div');
        overlay.className = 'password-overlay';
        // Force full-screen positioning
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.display = 'flex';
        overlay.style.justifyContent = 'center';
        overlay.style.alignItems = 'center';
        overlay.style.zIndex = '10000';
        
        const container = document.createElement('div');
        container.className = 'password-container';
        // Ensure container is properly centered
        container.style.position = 'relative';
        container.style.margin = 'auto';
        container.style.zIndex = '10001';
        container.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.5)';
        
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
                removeBlurEffect();
            } else {
                errorMsg.style.display = 'block';
                input.value = '';
                input.focus();
                // Add shake animation to the container for wrong password
                container.style.animation = 'shake 0.5s';
                setTimeout(() => {
                    container.style.animation = '';
                }, 500);
            }
        });
        
        // Focus the input
        setTimeout(() => input.focus(), 100);
    }
    
    // Main function
    function init() {
        if (!isAuthenticated()) {
            // Let the content be visible but blurred
            document.body.style.opacity = '1';
            
            // Wait for DOM to be fully loaded
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => {
                    showLoginOverlay();
                });
            } else {
                showLoginOverlay();
            }
        } else {
            // Make sure blur is removed for authenticated users
            removeBlurEffect();
        }
    }
    
    // Add shake animation for wrong password
    const shakeStyle = document.createElement('style');
    shakeStyle.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(shakeStyle);
    
    // Run the protection
    init();
})(); 