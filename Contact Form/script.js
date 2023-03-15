//contact form js
use strict
const form = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

form.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent the form from submitting

  // Send the form data to a server-side script (e.g. PHP)
  const formData = new FormData();
  formData.append('name', nameInput.value);
  formData.append('email', emailInput.value);
  formData.append('message', messageInput.value);
  
  // Replace "submit.php" with the URL of your server-side script
  fetch('submit.php', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    console.log(data); // Log the server's response
    alert('Your message has been sent!'); // Show a success message to the user
    form.reset(); // Clear the form
  })
  .catch(error => {
    console.error(error); // Log any errors
    alert('There was an error sending your message. Please try again.'); // Show an error message to the user
  });
});
