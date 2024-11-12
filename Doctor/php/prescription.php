<?php
// Database connection details
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "meddeck";

// Create a database connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Prepare and bind the SQL statement to prevent SQL injection
$sql = "INSERT INTO prescriptions (patient_name, aadhaar, mrn, date, age, sex, height, weight, bmi, diagnosis, allergies, followup_date, doctor_name) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("sssssssssssss",
    $patient_name, $aadhaar, $mrn, $date, $age, $sex, $height, $weight, $bmi, $diagnosis, $allergies, $followup_date, $doctor_name);

// Retrieve form data, sanitizing input to prevent security vulnerabilities
$patient_name = htmlspecialchars($_POST['name']);
$aadhaar = htmlspecialchars($_POST['aadhaar']);
$mrn = htmlspecialchars($_POST['mrn']);
$date = htmlspecialchars($_POST['date']);
$age = htmlspecialchars($_POST['age']);
$sex = htmlspecialchars($_POST['sex']);
$height = htmlspecialchars($_POST['height']);
$weight = htmlspecialchars($_POST['weight']);
$bmi = htmlspecialchars($_POST['bmi']);
$diagnosis = htmlspecialchars($_POST['diagnosis']);
$allergies = htmlspecialchars($_POST['allergies']);
$followup_date = htmlspecialchars($_POST['followup_date']);
$doctor_name = htmlspecialchars($_POST['doctor_name']);

// Execute the statement
if ($stmt->execute()) {
    $prescription_id = $conn->insert_id;

    // Insert medication details
    foreach ($_POST['drug_description'] as $index => $description) {
        $dose_frequency = $_POST['dose_frequency'][$index];

        $sql_med = "INSERT INTO medications (prescription_id, drug_description, dose_frequency) 
                    VALUES (?, ?, ?)";

        $stmt_med = $conn->prepare($sql_med);
        $stmt_med->bind_param("iss", $prescription_id, $description, $dose_frequency);
        $stmt_med->execute();

        if ($stmt_med->error) {
            echo "Error inserting medication: " . $stmt_med->error;
            // Consider logging the error or sending a notification
        }

        $stmt_med->close();
    }

    // Display success message and redirect
    echo "<script>alert('Prescription record stored successfully.'); window.location.href = '../prescription.html';</script>";
} else {
    echo "Error: " . $stmt->error;
    // Consider logging the error or sending a notification
}

$stmt->close();
$conn->close();
?>