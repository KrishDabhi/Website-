document.getElementById('signin-form').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Show loader during the process
    const loader = document.getElementById('loader');
    loader.style.display = 'block'; // Make sure loader is displayed

    // Retrieve user inputs
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // Basic validation with improved messages
    if (!email) {
        alert('Please enter your email address.');
        document.getElementById('email').classList.add('invalid');
        loader.style.display = 'none'; // Hide loader
        return;
    } else if (!isEmailValid(email)) {
        alert('Please enter a valid email address.');
        document.getElementById('email').classList.add('invalid');
        loader.style.display = 'none'; // Hide loader
        return;
    }

    if (!password) {
        alert('Please enter your password.');
        document.getElementById('password').classList.add('invalid');
        loader.style.display = 'none'; // Hide loader
        return;
    } else if (password.length < 6) {
        alert('Password must be at least 6 characters long.');
        document.getElementById('password').classList.add('invalid');
        loader.style.display = 'none'; // Hide loader
        return;
    }

    // URL for Google Apps Script
    const targetUrl = 'https://script.google.com/macros/s/AKfycbysWBRpO5P-XnwqBMctPMSAlO3XEhykU2aHajLW3kyp31txf35-2dctin81U1MwtjOd/exec'; // Replace with your actual URL
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

    try {
        // Send POST request to Google Apps Script
        const response = await fetch(targetUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'signin', // Action to handle sign-in logic in Apps Script
                email: email,
                password: password, // In production, you should hash the password
            }),
        });

        // Hide loader after response
        loader.style.display = 'none';

        // Check if the response is OK
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the response data
        const data = await response.json();

        // Handle success or failure
        if (data.status === 'success') {
            alert(data.message || 'Sign-in successful!');
            setTimeout(() => {
                window.location.href = '../dashboard/dashboard.html'; // Redirect to the dashboard after a delay
            }, 3000);
        } else {
            alert(data.message || 'Invalid credentials. Please try again.');
        }
    } catch (error) {
        // Handle errors
        console.error('Error during sign-in:', error);
        alert('There was an error processing your request.');
        loader.style.display = 'none'; // Hide loader in case of an error
    }
});

// Function to validate email format
function isEmailValid(email) {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[a-zA-Z]{2,4}$/; // Regular expression for email format
    return emailRegex.test(email);
}

// Real-time feedback for email field
const emailInput = document.getElementById('email');
emailInput.addEventListener('input', function () {
    if (!this.value.trim()) {
        this.classList.remove('valid', 'invalid');
    } else if (!isEmailValid(this.value.trim())) {
        this.classList.add('invalid');
        this.classList.remove('valid');
    } else {
        this.classList.add('valid');
        this.classList.remove('invalid');
    }
});

// Real-time feedback for password field
const passwordInput = document.getElementById('password');
passwordInput.addEventListener('input', function () {
    if (!this.value.trim()) {
        this.classList.remove('valid', 'invalid');
    } else if (this.value.trim().length < 6) {
        this.classList.add('invalid');
        this.classList.remove('valid');
    } else {
        this.classList.add('valid');
        this.classList.remove('invalid');
    }
});
