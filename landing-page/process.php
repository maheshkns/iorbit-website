<?php

error_reporting(-1);
ini_set('display_errors', 'On');
set_error_handler("var_dump");
// Configure your Subject Prefix and Recipient here
$subjectPrefix = '[iOrbit SEO Enquiry]';
$emailTo       = 'abhisuri244@gmail.com'; //Replace Your Email Here..
$errors = array(); // array to hold validation errors
$data   = array(); // array to pass back data
if($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name    = stripslashes(trim($_POST['name']));
    $email   = stripslashes(trim($_POST['email']));

    // $phone = stripslashes(trim($_POST['phone']));
    // $message = stripslashes(trim($_POST['message']));
    if (empty($name)) {
        $errors['name'] = 'Name is required.';
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = 'Email is invalid.';
    }
    // if (empty($phone)) {
    //     $errors['phone'] = 'Phone is required.';
    // }
    // if (empty($message)) {
    //     $errors['message'] = 'Message is required.';
    // }
    // if there are any errors in our errors array, return a success boolean or false
    if (!empty($errors)) {
        $data['success'] = false;
        $data['errors']  = $errors;
    } else {
        $subject = "$subjectPrefix";
        $body    = '
            <strong>Name: </strong>'.$name.'<br />
            <strong>Email: </strong>'.$email.'<br />
        ';
	/*	$body    = '
            <strong>Name: </strong>'.$name.'<br />
            <strong>Email: </strong>'.$email.'<br />
            <strong>Subject: </strong>'.$phone.'<br />
        ';*/
        $headers  = "MIME-Version: 1.0" . PHP_EOL;
        $headers .= "Content-type: text/html" . PHP_EOL;
        $headers .= "Content-Transfer-Encoding: 8bit" . PHP_EOL;
        $headers .= "Date: " . date('r', $_SERVER['REQUEST_TIME']) . PHP_EOL;
        // $headers .= "Message-ID: <" . $_SERVER['REQUEST_TIME'] . md5($_SERVER['REQUEST_TIME']) . '@' . $_SERVER['SERVER_NAME'] . '>' . PHP_EOL;
        $headers .= "From: support@iorbit-tech.com" . PHP_EOL;
		// $headers .= "CC: karthikcg26@gmail.com" . PHP_EOL;
		// $headers .= "BCC: abhisuri244@gmail.com" . PHP_EOL;
        // $headers .= "Return-Path: $emailTo" . PHP_EOL;
        $headers .= "Reply-To: $email" . PHP_EOL;
        $headers .= "X-Mailer: PHP/". phpversion() . PHP_EOL;
        // $headers .= "X-Originating-IP: " . $_SERVER['SERVER_ADDR'] . PHP_EOL;

        $headers2 = "MIME-Version: 1.0\r\n";
        $headers2 .= "Content-type: text/html\r\n";
        $headers2 .= 'From: karthikcg26@gmail.com' . "\r\n" .
        'Reply-To: karthikcg26@gmail.com' . "\r\n" .
        'X-Mailer: PHP/' . phpversion();

        $headers3   = array();
        $headers3[] = "MIME-Version: 1.0";
        $headers3[] = "Content-type: text/plain; charset=utf-8";
        $headers3[] = "From: karthik.cg@iorbit-tech.com"; 
        $headers3[] = "X-Mailer: PHP/".phpversion();

        // $status = mail($emailTo, $subject, $body, $headers);
        // $status = mail("karthikcg26@gmail.com", "test", "test", $headers2);
        $status = mail("karthikcg26@gmail.com", "subject", "message", implode("\r\n",$headers3));
        $data['success'] = true;
        echo json_encode($status);
        $data['message'] = 'Thanks for your interest, will get back to you soon!';
    }
    // return all our data to an AJAX call
    echo json_encode($data);
}