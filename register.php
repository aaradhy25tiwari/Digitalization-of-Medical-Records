<?php 
    include("connection.php");
?>
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>MeDDeck | Signup</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css">
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
      <div id="form">
            <h1 id="heading">SignUp Form</h1><br>
            <form name="form" action="signup.php" method="POST">
                <i class="fa-solid fa-id-card"></i>
                <input type="number" id="aadhaar" name="aadhaar" maxlength="12" minlength="12" placeholder="Enter Aadhaar Number" required></br></br>
                <i class="fa fa-user fa-lg"></i>
                <input type="text" id="user" name="user" placeholder="Enter Name" required></br></br>
                <i class="fa-solid fa-envelope fa-lg"></i>
                <input type="email" id="email" name="email" placeholder="Enter Email" required></br></br>
                <i class="fa-solid fa-lock fa-lg"></i>
                <input type="password" id="pass" name="pass" placeholder="Create Password" required></br></br>
                <i class="fa-solid fa-lock fa-lg"></i>
                <input type="password" id="cpass" name="cpass" placeholder="Confirm Password" required></br></br>
                <i class="fa-solid fa-phone"></i>
                <input type="number" id="phone" name="phone" maxlength="10" minlength="10" placeholder="Enter Phone Number" required></br></br>
                <i class="fa-regular fa-calendar-days"></i>
                <input type="date" id="dob" name="dob" placeholder="Enter Date of Birth" required></br></br>
                <i class="fa-solid fa-venus-mars"></i>
                <select name="gender">
                    <option value="">Select your gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select></br></br>
                <i class="fa-solid fa-globe"></i>
                <select name="country" id="country">
                    <option value="India" selected="selected">India</option>
                </select><br><br>
                <i class="fa-solid fa-map"></i>
                <input type="text" id="state" name="state" placeholder="Enter State" required></br></br>
                <i class="fa-solid fa-location-dot"></i>
                <input type="text" id="city" name="city" placeholder="Enter City" required></br></br>
                <i class="fa-solid fa-map-pin"></i>
                <input type="number" id="pin" name="pin" maxlength="6" minlength="6" placeholder="Enter Postal Code" required></br></br>
                <input type="submit" id="btn" value="SignUp" name = "submit"/>
            </form>
      </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous"></script>
  </body>
</html>