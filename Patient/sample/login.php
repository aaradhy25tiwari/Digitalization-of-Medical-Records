<?php
$login = false;
$showError = false;
if($_SERVER["REQUEST_METHOD"] == "POST"){
    include 'php/connection.php';
    $username = $_POST["user"];
    $password = $_POST["pass"]; 
    
     
    // $sql = "Select * from signup where username='$username' AND password='$password'";
    $sql = "Select * from signup where username='$username'";
    $result = mysqli_query($conn, $sql);
    $num = mysqli_num_rows($result);
    if ($num == 1){/*
        while($row=mysqli_fetch_assoc($result)){
            if (password_verify($password, $row['password'])){ */
                $login = true;
                session_start();
                $_SESSION['loggedin'] = true;
                $_SESSION['username'] = $username;
                header("location: welcome.php");
           /* }
            else{
                $showError = "Invalid Credentials";
            }
        }*/
        
    } 
    else{
        $showError = "Invalid Credentials";
    }
}
    
?>

<html>
    <head>
        <title>MeDDeck | Login</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
        <link rel="stylesheet" href="CSS/style.css">
        <link rel="shortcut icon" href="Images/icon.ico" type="image/x-icon" />

    </head>
    <body>

    <?php
    if($login){
    echo ' <div class="alert alert-success alert-dismissible fade show" role="alert">
        <strong>Success!</strong> You are logged in
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div> ';
    }
    if($showError){
    echo ' <div class="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>Error!</strong> '. $showError.'
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div> ';
    }
    ?>
    

        <br><br>
        
        <div id="form">
            <h1 id="heading">MeDDeck | Login</h1>
            <form name="form" action="login.php" method="POST" required onsubmit="return isvalid()">
                <label>Enter Email: </label>
                <input type="text" id="user" name="user"></br></br>
                <label>Password: </label>
                <input type="password" id="pass" name="pass" required></br></br>
                <input type="submit" id="btn" value="Login" name = "submit"/></br></br>
                <a href="./register.php">new user? signup</a>
            </form>
        </div>
        <script>
            function isvalid(){
                var user = document.form.user.value;
                if(user.length=="" && pass.length==""){
                    alert(" Username and password field is empty!!!");
                    return false;
                }
                else if(user.length==""){
                    alert(" Username field is empty!!!");
                    return false;
                }
                else if(pass.length==""){
                    alert(" Password field is empty!!!");
                    return false;
                }
            }
        </script>
    </body>
</html>