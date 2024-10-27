<?php
session_start();
// Database connection details (replace with your actual credentials)
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

// Get the Aadhaar number from the user (e.g., from a form or session)
$aadhaar = $_SESSION['aadhaar'];

// Query for active prescriptions, deleting expired ones
$sql = "DELETE FROM prescriptions WHERE followup_date < CURDATE();";
$stmt = $conn->prepare($sql);
$stmt->execute();

// Query for active prescriptions
$sql = "SELECT p.id, p.diagnosis, p.followup_date
        FROM prescriptions p
        WHERE p.aadhaar = ? AND p.followup_date >= CURDATE()";

$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $aadhaar);
$stmt->execute();
$result = $stmt->get_result();


?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MeDDeck | My Prescription</title>
    <link rel="shortcut icon" href="Images/icon.ico" type="image/x-icon" />
    <link rel="stylesheet" href="CSS/style.css" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
</head>
<body>
    <!--Header section starts here-->
    <section class="header">
        <nav class="navbar">
            <a href="welcome.html" class="logo">
                <img src="Images/logo.png" alt="MeDDeck" height="20">
            </a>
            <a href="./welcome.html">Home</a>
            <a href="./news.html">News</a>
            <a href="./findcare.html">Find Care</a>
            <a class="active" href="./my_prescription.php">My prescriptions</a>
            <a href="#about">About</a>
            <div class="login">
                <a href="./login.html">Logout</a>
            </div>
        </nav>
    </section>
    <h1>Your Active Prescriptions</h1>

    <?php
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $prescription_id = $row['prescription_id'];
            $diagnosis = $row['diagnosis'];
            $followup_date = $row['followup_date'];
    ?>
        <div class="prescription">
            <p><strong>Diagnosis:</strong> <?php echo $diagnosis; ?></p>
            <p><strong>Follow-up Date:</strong> <?php echo $followup_date; ?></p>
            <button class="show-medications" data-prescription-id="<?php echo $prescription_id; ?>">Show Medications</button>
            <div class="medications" style="display: none;">
                </div>
        </div>
    <?php
        }
    } else {
        echo "<p>You have no active prescriptions at this time.</p>";
    }
    ?>

    <script>
        $(document).ready(function() {
            $('.show-medications').click(function() {
                var prescriptionId = $(this).data('prescription-id');
                var medicationsDiv = $(this).next('.medications');
                $.ajax({
                    url: 'fetch_medications.php',
                    type: 'POST',
                    data: {prescription_id: prescriptionId},
                    success: function(response) {
                        medicationsDiv.html(response);
                        medicationsDiv.show();
                    }
                });
            });
        });
    </script>
</body>
</html>
