<?php
    //This script will handle login
    session_start();
    // check if the user is already logged in
    if(isset($_SESSION['email'])){
        header("location: ../welcome.html");
        exit;
    }
    require_once "connect.php";

    $username = $password = "";
    $err = "";
    // if request method is post
    if ($_SERVER['REQUEST_METHOD'] == "POST"){
        if(empty(trim($_POST['email'])) || empty(trim($_POST['pass']))){
            $err = "Please enter username + password";
        }
        else{
            $username = trim($_POST['email']);
            $password = trim($_POST['pass']);
        }

        if(empty($err)){
            $sql = "SELECT username, password FROM signup WHERE username = ?";
            $stmt = mysqli_prepare($conn, $sql);
            mysqli_stmt_bind_param($stmt, "s", $param_username);
            $param_username = $username;
        
            // Try to execute this statement
            if(mysqli_stmt_execute($stmt)){
                mysqli_stmt_store_result($stmt);
                if(mysqli_stmt_num_rows($stmt) == 1){
                    mysqli_stmt_bind_result($stmt, $username, $hashed_password);
                    if(mysqli_stmt_fetch($stmt)){
                        if(password_verify($password, $hashed_password)){
                            // this means the password is corrct. Allow user to login
                            session_start();
                            $_SESSION["username"] = $username;
                            $_SESSION["id"] = $id;
                            $_SESSION["loggedin"] = true;

                            //Redirect user to welcome page
                            header("location: ../welcome.html");   
                        }
                        else{
                            header("location: ../login.html");
                        }
                    }
                }

            }
        }    

    }
?>