<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "meddeck";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve form data
$patient_name = $_POST['name'];
$aadhaar = $_POST['aadhaar'];
$mrn = $_POST['mrn'];
$date = $_POST['date'];
$age = $_POST['age'];
$sex = $_POST['sex'];
$height = $_POST['height'];
$weight = $_POST['weight'];
$bmi = $_POST['bmi'];
$diagnosis = $_POST['diagnosis'];
$allergies = $_POST['allergies'];
$followup_date = $_POST['followup-date'];
$doctor_name = $_POST['doctor-name'];
$dispensed_by = $_POST['dispensed-by'];
$checked_by = $_POST['checked-by'];

// Insert into prescriptions table
$sql = "INSERT INTO prescriptions (patient_name, aadhaar, mrn, date, age, sex, height, weight, bmi, diagnosis, allergies, followup_date, doctor_name, dispensed_by, checked_by) 
        VALUES ('$patient_name', '$aadhaar', '$mrn', '$date', '$age', '$sex', '$height', '$weight', '$bmi', '$diagnosis', '$allergies', '$followup_date', '$doctor_name', '$dispensed_by', '$checked_by')";

if ($conn->query($sql) === TRUE) {
    $prescription_id = $conn->insert_id; // Get the last inserted ID

    // Insert medication details
    foreach ($_POST['drug_description'] as $index => $description) {
        $dose_frequency = $_POST['dose_frequency'][$index];
        $sql_med = "INSERT INTO medications (prescription_id, drug_description, dose_frequency) 
                    VALUES ('$prescription_id', '$description', '$dose_frequency')";
        $conn->query($sql_med);
    }

    // echo "Prescription and medication details stored successfully!";
    
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
