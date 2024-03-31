const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let interval = null;

function startLetterHack(element) {
    let iteration = 0;

    clearInterval(interval);

    interval = setInterval(() => {
        element.innerText = element.innerText
            .split("")
            .map((letter, index) => {
                if (index < iteration) {
                    return element.dataset.value[index];
                }

                return letters[Math.floor(Math.random() * 26)];
            })
            .join("");

        if (iteration >= element.dataset.value.length) {
            clearInterval(interval);
        }

        iteration += 1 / 3;
    }, 30);
}

// Call the function on page load
document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("fade-in");
    const headingElement = document.querySelector(".headingval");
    startLetterHack(headingElement);
});

// Validation functions
function validateCardNumber(cardNumber) {
    // Card number should be 12 digits
    return /^\d{12}$/.test(cardNumber);
}

// Function to validate expiry date format (MM / YY)
function validateExpiryDate(expiryDate) {
    // Split the expiryDate into month and year
    const parts = expiryDate.split('/').map(part => part.trim()); // Trim whitespace from each part

    if (parts.length !== 2) {
        return false;
    }

    const [month, year] = parts;

    // Get the current date to compare with the expiry date
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100; // Get last two digits of the current year
    const currentMonth = currentDate.getMonth() + 1; // Month is zero-indexed

    // Validate MM (month) and YY (year)
    const isValidMonth = /^\d{1,2}$/.test(month) && parseInt(month, 10) >= 1 && parseInt(month, 10) <= 12;
    const isValidYear = /^\d{2}$/.test(year) && parseInt(year, 10) >= currentYear;

    // Check if both month and year are valid
    if (isValidMonth && isValidYear) {
        // If the year is the same as the current year, check if the month is greater than or equal to the current month
        const isFutureYear = parseInt(year, 10) > currentYear;
        const isSameYear = parseInt(year, 10) === currentYear;
        const isFutureMonth = parseInt(month, 10) >= currentMonth;

        return isFutureYear || (isSameYear && isFutureMonth);
    }

    return false;
}

// Function to validate CVV format (3 digits)
function validateCVV(cvv) {
    // CVV should be a 3-digit number
    return /^\d{3}$/.test(cvv);
}

// Function to validate zip code format (digits only)
function validateZipCode(zipCode) {
    // Zip code should only contain digits
    return /^\d+$/.test(zipCode);
}

function validateEmail(email) {
    // Email address should end with "@gmail.com"
    return email.toLowerCase().endsWith("@gmail.com");
}

// Function to validate phone number format (10 digits)
function validatePhoneNumber(phoneNumber) {
    // Phone number should be a 10-digit number
    return /^\d{10}$/.test(phoneNumber);
}

// Function to validate and clear input fields
function validateAndClear() {
    const cardNumberInput = document.querySelector('input[placeholder="0000 0000 0000 0000"]');
    const expiryInput = document.querySelector('input[placeholder="MM / YY"]');
    const cvvInput = document.querySelector('input[placeholder="123"]');
    const firstNameInput = document.querySelector('input[placeholder="First Name"]');
    const lastNameInput = document.querySelector('input[placeholder="Last Name"]');
    const emailInput = document.querySelector('input[placeholder="Email Address"]');
    const selectedCountry = document.getElementById('selecteCountry');
    const cityInput = document.querySelector('input[placeholder="City"]');
    const zipCodeInput = document.querySelector('input[placeholder="Zipcode"]');
    const phoneInput = document.querySelector('input[placeholder="Phone Number"]');

    // Clear previous error messages
    document.querySelectorAll('.error-message').forEach(error => error.remove());

    if (!validateCardNumber(cardNumberInput.value.trim())) {
        displayErrorMessage(cardNumberInput, '*Please enter your card number');
        return;
    }

    // Validate expiry date format
    if (!validateExpiryDate(expiryInput.value.trim())) {
        displayErrorMessage(expiryInput, '*Please enter the correct expiry date (MM / YY)');
        return;
    }

    // Validate CVV format
    if (!validateCVV(cvvInput.value.trim())) {
        displayErrorMessage(cvvInput, '*Please enter a valid 3-digit CVV');
        return;
    }

    // Validate zip code format
    if (!validateZipCode(zipCodeInput.value.trim())) {
        displayErrorMessage(zipCodeInput, '*Please enter a valid zip code (digits only)');
        return;
    }

    if (!validateEmail(emailInput.value.trim())) {
        displayErrorMessage(emailInput, '*Please enter a valid email address');
        return;
    }

    // Validate phone number format
    if (!validatePhoneNumber(phoneInput.value.trim())) {
        displayErrorMessage(phoneInput, '*Please enter a valid 10-digit phone number');
        return;
    }

    if (
        !firstNameInput.value.trim() ||
        !lastNameInput.value.trim() ||
        selectedCountry.innerText.toLowerCase() === 'country'
    ) {
        displayErrorMessage(null, '*All fields are required');
        return;
    }

    // Clear all input fields
    cardNumberInput.value = '';
    expiryInput.value = '';
    cvvInput.value = '';
    firstNameInput.value = '';
    lastNameInput.value = '';
    emailInput.value = '';
    selectedCountry.innerText = 'Country';
    selectedCountry.style.color = '#999';

    // Clear additional input fields
    cityInput.value = '';
    zipCodeInput.value = '';
    phoneInput.value = '';
}

// Function to display error message
function displayErrorMessage(target, message) {
    if (target) {
        const errorMessage = document.createElement('p');
        errorMessage.className = 'error-message';
        errorMessage.style.color = 'red';
        errorMessage.textContent = message;
        target.parentNode.appendChild(errorMessage);
    } else {
        alert(message);
    }
}


// JS code for dropdown
const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
    const select = dropdown.querySelector('.select');
    const caret = dropdown.querySelector('.caret');
    const menu = dropdown.querySelector('.menu');
    const options = dropdown.querySelectorAll('.menu li');
    const selected = dropdown.querySelector('.selected');

    // Create a variable to track the dropdown menu's visibility
    let isMenuOpen = false;

    select.addEventListener('click', () => {
        // Toggle the visibility of the dropdown menu
        isMenuOpen = !isMenuOpen;

        // Update the styles based on the menu's visibility
        select.classList.toggle('select-clicked', isMenuOpen);
        caret.classList.toggle('caret-rotate', isMenuOpen);
        menu.classList.toggle('menu-open', isMenuOpen);
    });

    options.forEach(option => {
        option.addEventListener('click', () => {
            selected.innerText = option.innerText;

            // Set the text color to black for the selected country
            selected.style.color = 'black';

            // Close the dropdown menu after selecting an option
            isMenuOpen = false;

            // Update the styles based on the menu's visibility
            select.classList.remove('select-clicked');
            caret.classList.remove('caret-rotate');
            menu.classList.remove('menu-open');

            options.forEach(opt => {
                opt.classList.remove('active');
            });

            option.classList.add('active');
        });
    });
});

const payButton = document.querySelector('.paybutton');
payButton.addEventListener('click', validateAndClear);