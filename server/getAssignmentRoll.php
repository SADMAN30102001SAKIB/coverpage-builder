<?php
// Database connection details
$host = 'localhost';
$username = 'id20997586_testformuser';
$password = 'Flair30102001.com';
$database = 'id20997586_testform';

// Create connection
$connection = mysqli_connect($host, $username, $password, $database);

// Check connection
if (!$connection) {
    die(json_encode(['error' => 'Failed to connect to MySQL: ' . mysqli_connect_error()]));
}

// SQL to select roll numbers and their frequency
$sql = "SELECT roll, COUNT(roll) AS frequency FROM assignment GROUP BY roll ORDER BY roll ASC";

// Execute the query
$result = mysqli_query($connection, $sql);

// Check if there are results
if ($result) {
    $rolls = [];
    while ($row = mysqli_fetch_assoc($result)) {
        // Concatenate the roll number with its frequency
        $rollWithFrequency = $row['roll'] . " - " . $row['frequency'];
        $rolls[] = $rollWithFrequency;
    }
    // Return the rolls with their frequencies as a JSON array
    echo json_encode($rolls);
} else {
    // In case of query failure, return an error message
    echo json_encode(['error' => 'Failed to retrieve data from the database.']);
}

// Close the connection
mysqli_close($connection);
?>