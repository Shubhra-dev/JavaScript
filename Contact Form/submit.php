<?php
// Get the form data
$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];

// Validate the email address
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(400);
  echo json_encode(array('error' => 'Invalid email address'));
  exit;
}

// Compose the email message
$to = 'you@example.com'; // Replace with your own email address
$subject = 'New message from ' . $name;
$body = "Name: $name\nEmail: $email\nMessage:\n$message";

// Send the email
if (mail($to, $subject, $body)) {
  http_response_code(200);
  echo json_encode(array('message' => 'Message sent successfully'));
} else {
  http_response_code(500);
  echo json_encode(array('error' => 'Failed to send message'));
}
