<?php
$connection = mysqli_connect('localhost', 'id20997586_testformuser', 'Flair30102001.com', 'id20997586_testform');

date_default_timezone_set('Asia/Dhaka');
$theDate = date('d/m/y');
$theTime = date('h:i:sA');

// Check connection
if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve the form data
    $courseCode = sanitizeInput($_POST['courseCode']);
    $teacherName = sanitizeInput($_POST['teacherName']);
    $experimentName = sanitizeInput($_POST['experimentName']);
    $experimentNumber = sanitizeInput($_POST['experimentNumber']);
    $roll = sanitizeInput($_POST['roll']);
    $dateOfSubmission = sanitizeInput($_POST['dateOfSubmission']);
    $dateOfExperiment = sanitizeInput($_POST['dateOfExperiment']);
    $Individual_Group_Flag = sanitizeInput($_POST['Individual_Group_Flag']);
    
    // Validate the inputs
    if (empty($courseCode) || empty($teacherName) || empty($experimentName) || empty($experimentNumber) || empty($roll)) {
        echo "All fields are required";
        exit();
    }

    if (!isValidRoll($roll)) {
        echo "Invalid roll number. example: 2103009";
        exit();
    }
    
    // Prepare the SQL statement
    if (intval($Individual_Group_Flag)) {
        $sql = "INSERT INTO `labCover` (`courseCode`, `teacherName`, `experimentName`, `experimentNumber`, `roll`, `dateOfExperiment`, `dateOfSubmission`, `DateOfFormFillup`, `TimeOfFormFillup`) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    }
    else {
        $sql = "INSERT INTO `labGroupCover` (`courseCode`, `teacherName`, `experimentName`, `experimentNumber`, `roll`, `dateOfExperiment`, `dateOfSubmission`, `DateOfFormFillup`, `TimeOfFormFillup`) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    }

    // Create a prepared statement
    $stmt = mysqli_prepare($connection, $sql);

    // Bind the parameters to the statement
    mysqli_stmt_bind_param($stmt, 'sssssssss', $courseCode, $teacherName, $experimentName, $experimentNumber, $roll, $dateOfExperiment, $dateOfSubmission, $theDate, $theTime);

    // Execute the statement
    if (mysqli_stmt_execute($stmt)) {
        echo "Data Successfully Submitted to MySQL";
    } else {
        echo "Data submission to MySQL has failed";
    }

    // Close the statement
    mysqli_stmt_close($stmt);
}

// Close the connection
mysqli_close($connection);

function sanitizeInput($input) {
    if (strpos($input, '*') !== false || strpos($input, ';') !== false) {
        echo "Invalid input. Input contains restricted characters ('*', ';')";
        exit();
    }

    $sanitizedInput = trim($input);
    $sanitizedInput = stripslashes($sanitizedInput);
    $sanitizedInput = htmlspecialchars($sanitizedInput, ENT_QUOTES, 'UTF-8');

    return $sanitizedInput;
}

function isValidRoll($roll) {
    $rollNumber = intval($roll);
    return ($rollNumber >= 2103001 && $rollNumber <= 2103180);
}
?>
