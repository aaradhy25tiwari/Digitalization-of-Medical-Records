<?php
    include('connection.php');
    if (isset($_POST['submit'])) {
        $aadhaar = mysqli_real_escape_string($conn, $_POST['aadhaar']);
        $name = mysqli_real_escape_string($conn, $_POST['user']);
        $email = mysqli_real_escape_string($conn, $_POST['email']);
        $password = mysqli_real_escape_string($conn, $_POST['pass']);
        $cpassword = mysqli_real_escape_string($conn, $_POST['cpass']);
        $phone = mysqli_real_escape_string($conn, $_POST['phone']);
        $dob = mysqli_real_escape_string($conn, $_POST['dob']);
        $gender = mysqli_real_escape_string($conn, $_POST['gender']);
        $country = mysqli_real_escape_string($conn, $_POST['country']);
        $state = mysqli_real_escape_string($conn, $_POST['state']);
        $city = mysqli_real_escape_string($conn, $_POST['city']);
        $pincode = mysqli_real_escape_string($conn, $_POST['pin']);

        
        
        $sql = "Select * from signup1 where username='$email'";
        $result = mysqli_query($conn, $sql);        
        $count_user = mysqli_num_rows($result);  

        $sql = "Select * from signup1 where AadharCard='$aadhaar'";
        $result = mysqli_query($conn, $sql);        
        $count_aadhaar = mysqli_num_rows($result);  
        
        if($count_user == 0 && $count_aadhaar==0){  
            
            if($password == $cpassword) {
    
                $hash = password_hash($password, PASSWORD_DEFAULT);
                    
                // Password Hashing is used here. 
                $sql = "INSERT INTO signup(AadharCard, name, username, password, phone, DOB, gender, city, state, country, postal) VALUES('$aadhaar','$name', '$email','$hash', '$phone', '$dob', '$gender','$city', '$state', '$country', '$pincode')";
        
                $result = mysqli_query($conn, $sql);
        
                if ($result) {
                    header("Location: welcome.php");
                }
            } 
            else { 
                echo  '<script>
                        alert("Passwords do not match")
                        window.location.href = "register.php";
                    </script>';
            }      
        }  
        else{  
            if($count_user>0){
                echo  '<script>
                        window.location.href = "register.php";
                        alert("Username already exists!!")
                    </script>';
            }
            if($count_aadhaar>0){
                echo  '<script>
                        window.location.href = "register.php";
                        alert("Aadhaar Card already registered!!")
                    </script>';
            }
        }     
    }
    ?>