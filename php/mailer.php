<?php /*
  use google\appengine\api\mail\Message;

  // Only process POST reqeusts
  if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Get the form fields and strip whitespace
    $name = strip_tags(trim($_POST["name"]));
    $name = str_replace(array("\r","\n"),array(" "," "),$name);
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $message = trim($_POST["message"]);
    $subject = "New website message from $name";

    // Check that data was sent to the mailer
    if ( empty($name) OR empty($message) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {

      // Set a 400 (bad request) response code and exit
      http_response_code(400);
      echo "Oops! Some info was missing.<br>Please complete the form and try again.";
      exit;
    }

    // Build the email content
    $content = "Name: $name\n";
    $content .= "Email: $email\n\n";
    $content .= "Message:\n$message\n";

    // Send the email
    try {
      $message = new Message();
      $message->setSender("admin@jrod.io");
      $message->addTo("john@jrod.io");
      $message->setSubject($subject);
      $message->setTextBody($content);
      $message->send();
      http_response_code(200);
      echo "Thank You!<br>Your message was delivered.";
    } catch (InvalidArgumentException $e) {
      http_response_code(500);
      echo "Oops! Something went wrong on my end.<br>Your message wasn't delivered.";
    }

  // Not a POST request, set a 403 (forbidden) response code
  } else {
    http_response_code(403);
    echo "Nice try, but I don't think so tough guy =P";
  }
*/
?>
