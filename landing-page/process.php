<?php
    require __DIR__ . '/vendor/phpmailer/phpmailer/src/PHPMailer.php';
    require __DIR__ . '/vendor/autoload.php';
    $errors = array(); // array to hold validation errors
    $data = array(); // array to pass back data
    $name = stripslashes(trim($_POST['name']));
    $email = stripslashes(trim($_POST['email']));
    $mail = new PHPMailer\PHPMailer\PHPMailer();
    $mail->isSMTP();
    $mail->Host = 'smtp.pepipost.com';
    $mail->Port = 25;
    $mail->SMTPAuth = true;
    // $mail->Username = 'supportt1u40c';
    // $mail->Password = 'supportt1u40c_15368c8c20c5a1bb04078ab9adeb5489';
    $mail->setFrom('support@etq-global.com', 'iOrbit');
    // $mail->addAddress('smita.deshpande@iorbit-tech.com', 'Smita Deshpande');
    $mail->addAddress('karthikcg26@gmail.com', 'Karthik C G');
    if (empty($name)) {
        $errors['name'] = 'Name is required.';
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = 'Email is invalid.';
    }
    if (!empty($errors)) {
        $data['success'] = false;
        $data['errors']  = $errors;
    } else {
        if ($mail->addReplyTo($email, $name)) {
            $mail->Subject = 'Plug-in intelligence request form';
            $mail->isHTML(false);
            $mail->Body = <<<EOT
Please find the details below:
Name: {$name}
Email: {$email}
EOT;
            if (!$mail->send()) {
                $data['success'] = false;
                $data['message'] = 'Sorry, something went wrong. Please try again later.';
            } else {
                $data['success'] = true;
                $data['message'] = 'Thanks for your interest, will get back to you soon!';
            }
        } else {
            $data['success'] = false;
            $data['message'] = 'Sorry, something went wrong. Please try again later.';
        }
    }
    echo json_encode($data);
?>
