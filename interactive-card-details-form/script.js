document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.form');
    const cardNameInput = document.getElementById('card_name');
    const cardNumberInput = document.getElementById('card_number');
    const mmInput = document.getElementById('mm');
    const yyInput = document.getElementById('yy');
    const cvcInput = document.getElementById('cvc');
    const confirmButton = document.querySelector('.submit');

    confirmButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the form from submitting
        
        // Perform validation
        let isValid = true;

        // Cardholder Name validation
        if (cardNameInput.value.trim() === '') {
            displayErrorMessage(cardNameInput, 'Cardholder name is required.');
            isValid = false;
        } else {
            removeErrorMessage(cardNameInput);
        }

        // Card Number validation
        if (cardNumberInput.value.trim() === '' || !isValidCardNumber(cardNumberInput.value.trim())) {
            displayErrorMessage(cardNumberInput, 'Please enter a valid card number.');
            isValid = false;
        } else {
            removeErrorMessage(cardNumberInput);
        }

        // Expiry Date validation
        const mm = mmInput.value.trim();
        const yy = yyInput.value.trim();
        if (mm === '' || yy === '' || !isValidExpiryDate(mm, yy)) {
            displayErrorMessage(mmInput, 'Please enter a valid expiry date.');
            displayErrorMessage(yyInput, '');
            isValid = false;
        } else {
            removeErrorMessage(mmInput);
            removeErrorMessage(yyInput);
        }

        // CVC validation
        if (cvcInput.value.trim() === '' || !isValidCVC(cvcInput.value.trim())) {
            displayErrorMessage(cvcInput, 'Please enter a valid CVC.');
            isValid = false;
        } else {
            removeErrorMessage(cvcInput);
        }

        // If all inputs are valid, submit the form
        if (isValid) {
            form.submit();
        }
    });

    // Function to display error message
    function displayErrorMessage(input, message) {
        const errorSpan = input.nextElementSibling;
        errorSpan.textContent = message;
    }

    // Function to remove error message
    function removeErrorMessage(input) {
        const errorSpan = input.nextElementSibling;
        errorSpan.textContent = '';
    }

    // Function to validate card number
    function isValidCardNumber(cardNumber) {
        // Your validation logic here
        return /^\d{16}$/.test(cardNumber);
    }

    // Function to validate expiry date
    function isValidExpiryDate(mm, yy) {
        // Your validation logic here
        const currentYear = new Date().getFullYear() % 100; // Get current year's last two digits
        const currentMonth = new Date().getMonth() + 1; // Get current month (0-indexed)
        const expiryYear = parseInt(yy, 10);
        const expiryMonth = parseInt(mm, 10);
        
        return (expiryYear > currentYear || (expiryYear === currentYear && expiryMonth >= currentMonth));
    }
});
