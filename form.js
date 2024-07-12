// script.js
function validateForm() {
    // Reset all error messages
    resetErrorMessages();

    // Fetch form data
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const genderMale = document.getElementById('male').checked;
    const genderFemale = document.getElementById('female').checked;
    const address = document.getElementById('address').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Validate name
    if (name === '') {
        showError('nameError', 'Please enter your name.');
        return false;
    }

    // Validate email
    if (!isValidEmail(email)) {
        showError('emailError', 'Please enter a valid email address.');
        return false;
    }

    // Validate gender
    if (!genderMale && !genderFemale) {
        showError('genderError', 'Please select your gender.');
        return false;
    }

    // Validate address
    if (address === '') {
        showError('addressError', 'Please enter your address.');
        return false;
    }

    // Validate phone number
    if (!isValidPhoneNumber(phone)) {
        showError('phoneError', 'Please enter a valid 10-digit phone number starting with 6, 7, 8, or 9.');
        return false;
    }

    // Validate password
    if (!isValidPassword(password)) {
        showError('passwordError', 'Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long.');
        return false;
    }

    // Validate password match
    if (password !== confirmPassword) {
        showError('confirmPasswordError', 'Passwords do not match.');
        return false;
    }

    // If all validations pass, return true to submit the form
    return true;
}

function resetErrorMessages() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(element => element.textContent = '');
}

function showError(id, message) {
    const errorElement = document.getElementById(id);
    errorElement.textContent = message;
}

function isValidEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

function isValidPhoneNumber(phone) {
    const regex = /^[6-9]{1}[0-9]{9}$/;
    return regex.test(phone);
}

function isValidPassword(password) {
    // Password criteria: at least one uppercase, one lowercase, one number, one special character, and minimum 8 characters
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+}{:;'?/><.,])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
}

const passwordInput = document.getElementById('password');
const passwordStrength = document.getElementById('password-strength');

passwordInput.addEventListener('input', function() {
    const password = passwordInput.value;
    const strength = calculatePasswordStrength(password);
    updatePasswordMeter(strength);
});

function calculatePasswordStrength(password) {
    // Define strength criteria
    const regex = {
        lower: /[a-z]/,
        upper: /[A-Z]/,
        numeric: /[0-9]/,
        special: /[!@#$%^&*()_+}{:;'?/><.,]/,
        minLength: /.{8,}/
    };

    // Check each criterion
    let strength = 0;
    strength += regex.lower.test(password) ? 1 : 0;
    strength += regex.upper.test(password) ? 1 : 0;
    strength += regex.numeric.test(password) ? 1 : 0;
    strength += regex.special.test(password) ? 1 : 0;
    strength += regex.minLength.test(password) ? 1 : 0;

    return strength;
}

function updatePasswordMeter(strength) {
    let meterClass = '';
    switch (strength) {
        case 0:
        case 1:
            meterClass = 'strength-weak';
            break;
        case 2:
        case 3:
            meterClass = 'strength-medium';
            break;
        case 4:
        case 5:
            meterClass = 'strength-strong';
            break;
            default:
                meterClass = 'strength-weak';
        }
        passwordStrength.className = 'strength-meter-fill ' + meterClass;
    }
           
