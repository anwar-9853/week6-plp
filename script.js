// ====================
// GLOBAL VARIABLES
// ====================

// Theme toggle element
const themeToggleBtn = document.getElementById('theme-toggle');
// Counter elements
const counterValue = document.getElementById('counter-value');
const decrementBtn = document.getElementById('decrement-btn');
const incrementBtn = document.getElementById('increment-btn');
const resetCounterBtn = document.getElementById('reset-counter');
// FAQ elements
const faqItems = document.querySelectorAll('.faq-item');
// Form elements
const form = document.getElementById('validation-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');
const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');
const confirmPasswordError = document.getElementById('confirm-password-error');
const formSuccess = document.getElementById('form-success');

// ====================
// PART 1: EVENT HANDLING
// ====================

// Click event example
document.getElementById('click-btn').addEventListener('click', function() {
    document.getElementById('click-output').textContent = 'Button was clicked! 🎉';
    
    // Reset message after 2 seconds
    setTimeout(() => {
        document.getElementById('click-output').textContent = 'Waiting for click...';
    }, 2000);
});

// Mouse events example
const mouseBox = document.getElementById('mouse-box');
const mouseOutput = document.getElementById('mouse-output');

mouseBox.addEventListener('mouseover', () => {
    mouseOutput.textContent = 'Mouse is over the box!';
    mouseBox.style.backgroundColor = '#3a9d96';
});

mouseBox.addEventListener('mouseout', () => {
    mouseOutput.textContent = 'Mouse left the box!';
    mouseBox.style.backgroundColor = '#4cb5ae';
});

mouseBox.addEventListener('mousedown', () => {
    mouseOutput.textContent = 'Mouse button pressed down!';
    mouseBox.style.transform = 'scale(0.95)';
});

mouseBox.addEventListener('mouseup', () => {
    mouseOutput.textContent = 'Mouse button released!';
    mouseBox.style.transform = 'scale(1)';
});

// Keyboard events example
const keyboardInput = document.getElementById('keyboard-input');
const keyboardOutput = document.getElementById('keyboard-output');

keyboardInput.addEventListener('keydown', (e) => {
    keyboardOutput.textContent = `Key down: ${e.key}`;
});

keyboardInput.addEventListener('keyup', (e) => {
    keyboardOutput.textContent = `Key up: ${e.key}`;
});

keyboardInput.addEventListener('input', (e) => {
    keyboardOutput.textContent = `Input: ${e.target.value}`;
});

// ====================
// PART 2: INTERACTIVE ELEMENTS
// ====================

// Theme toggle functionality
themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    
    if (currentTheme === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        themeToggleBtn.textContent = '🌙 Dark Mode';
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggleBtn.textContent = '☀️ Light Mode';
        localStorage.setItem('theme', 'dark');
    }
});

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggleBtn.textContent = '☀️ Light Mode';
}

// Counter functionality
let count = 0;

function updateCounter() {
    counterValue.textContent = count;
    // Change color based on value
    if (count > 0) {
        counterValue.style.color = 'var(--success-color)';
    } else if (count < 0) {
        counterValue.style.color = 'var(--error-color)';
    } else {
        counterValue.style.color = 'var(--primary-color)';
    }
}

incrementBtn.addEventListener('click', () => {
    count++;
    updateCounter();
});

decrementBtn.addEventListener('click', () => {
    count--;
    updateCounter();
});

resetCounterBtn.addEventListener('click', () => {
    count = 0;
    updateCounter();
});

// FAQ functionality
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Toggle active class on the clicked item
        item.classList.toggle('active');
        
        // Close other open FAQ items
        faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
            }
        });
    });
});

// ====================
// PART 3: FORM VALIDATION
// ====================

// Validation functions
function validateName() {
    const nameValue = nameInput.value.trim();
    
    if (nameValue === '') {
        nameError.textContent = 'Name is required';
        return false;
    } else if (nameValue.length < 2) {
        nameError.textContent = 'Name must be at least 2 characters';
        return false;
    } else if (!/^[a-zA-Z\s]+$/.test(nameValue)) {
        nameError.textContent = 'Name can only contain letters and spaces';
        return false;
    } else {
        nameError.textContent = '';
        return true;
    }
}

function validateEmail() {
    const emailValue = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (emailValue === '') {
        emailError.textContent = 'Email is required';
        return false;
    } else if (!emailRegex.test(emailValue)) {
        emailError.textContent = 'Please enter a valid email address';
        return false;
    } else {
        emailError.textContent = '';
        return true;
    }
}

function validatePassword() {
    const passwordValue = passwordInput.value;
    
    if (passwordValue === '') {
        passwordError.textContent = 'Password is required';
        return false;
    } else if (passwordValue.length < 8) {
        passwordError.textContent = 'Password must be at least 8 characters';
        return false;
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(passwordValue)) {
        passwordError.textContent = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
        return false;
    } else {
        passwordError.textContent = '';
        return true;
    }
}

function validateConfirmPassword() {
    const passwordValue = passwordInput.value;
    const confirmPasswordValue = confirmPasswordInput.value;
    
    if (confirmPasswordValue === '') {
        confirmPasswordError.textContent = 'Please confirm your password';
        return false;
    } else if (confirmPasswordValue !== passwordValue) {
        confirmPasswordError.textContent = 'Passwords do not match';
        return false;
    } else {
        confirmPasswordError.textContent = '';
        return true;
    }
}

// Real-time validation
nameInput.addEventListener('input', validateName);
emailInput.addEventListener('input', validateEmail);
passwordInput.addEventListener('input', validatePassword);
confirmPasswordInput.addEventListener('input', validateConfirmPassword);

// Form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validate all fields
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();
    
    // If all fields are valid
    if (isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid) {
        // Show success message
        formSuccess.classList.remove('hidden');
        
        // Reset form after 3 seconds
        setTimeout(() => {
            form.reset();
            formSuccess.classList.add('hidden');
        }, 3000);
    }
});

// ====================
// ADDITIONAL ENHANCEMENTS
// ====================

// Add animation to counter value changes
const originalUpdateCounter = updateCounter;
updateCounter = function() {
    counterValue.style.transform = 'scale(1.1)';
    setTimeout(() => {
        counterValue.style.transform = 'scale(1)';
    }, 100);
    originalUpdateCounter();
};

// Add input animation for better UX
const inputs = document.querySelectorAll('input');
inputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.style.transform = 'translateY(-2px)';
        input.parentElement.style.transition = 'transform 0.2s ease';
    });
    
    input.addEventListener('blur', () => {
        input.parentElement.style.transform = 'translateY(0)';
    });
});