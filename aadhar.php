<?php

// curl request for generating auth token
// $url='https://api.sandbox.co.in/authenticate';

$headers[]='accept: application/json';
$headers[]='x-api-key: key_live_2vnFW2NGW00I1GvYgWDpo2VVqihqeXwY';
// $headers[]='x-api-secret: secret_live_DHQvjABIr1JzkOt2d6x1alN4F212FEGi';
$headers[]='x-api-version: 1.0';



// $ch = curl_init($url);
// curl_setopt($ch,CURLOPT_POST,1);
// curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
// curl_setopt($ch,CURLOPT_HTTPHEADER,$headers);
// $result = curl_exec($ch);
// echo $result;


$auth_token='eyJhbGciOiJIUzUxMiJ9.eyJhdWQiOiJBUEkiLCJyZWZyZXNoX3Rva2VuIjoiZXlKaGJHY2lPaUpJVXpVeE1pSjkuZXlKaGRXUWlPaUpCVUVraUxDSnpkV0lpT2lKa1lYSndZVzV3WVhKcllYSXhRR2R0WVdsc0xtTnZiU0lzSW1Gd2FWOXJaWGtpT2lKclpYbGZiR2wyWlY4eWRtNUdWekpPUjFjd01Fa3hSM1paWjFkRWNHOHlWbFp4YVdoeFpWaDNXU0lzSW1semN5STZJbUZ3YVM1ellXNWtZbTk0TG1OdkxtbHVJaXdpWlhod0lqb3hOelUzTkRNNE56RTRMQ0pwYm5SbGJuUWlPaUpTUlVaU1JWTklYMVJQUzBWT0lpd2lhV0YwSWpveE56STFPVEF5TnpFNGZRLnZteDVvaHdYZUtOWUhCbVFDRVdEX01vRWxjZTgzMVFhUTRsMzl6M3N1S1hBWURrLTRfYWtqWXJ2Z0YyR2I5YldqS2FMNlFERTlsNFpIU1VDMlRhWE1BIiwic3ViIjoiZGFycGFucGFya2FyMUBnbWFpbC5jb20iLCJhcGlfa2V5Ijoia2V5X2xpdmVfMnZuRlcyTkdXMDBJMUd2WWdXRHBvMlZWcWlocWVYd1kiLCJpc3MiOiJhcGkuc2FuZGJveC5jby5pbiIsImV4cCI6MTcyNTk4OTExOCwiaW50ZW50IjoiQUNDRVNTX1RPS0VOIiwiaWF0IjoxNzI1OTAyNzE4fQ.Lt0wOsS64-Epj83tn3NvqSbS-HYKRb-sZaUjFZs-_g1Mc_0KyBLmwWTkvwL-bPkFfNRj4GfWAzRQJrqRBul6Ww';

if(isset($_GET['sendotp'])){
    $aadharno=$_POST['aadhar_no'];
    $url='https://api.sandbox.co.in/kyc/aadhaar/okyc/otp';

    $data = '{
        "aadhaar_number":"'.$aadharno.'"
    }';

    $headers[]='Authorization :'.$auth_token;
    $ch = curl_init($url);
    curl_setopt($ch,CURLOPT_POST,1);
    curl_setopt($ch,CURLOPT_POSTFIELDS,$data);
    curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
    curl_setopt($ch,CURLOPT_HTTPHEADER,$headers);
    $result = curl_exec($ch);
    echo $result;
    

}elseif(isset($_GET['verifyotp'])){
    $refid=$_POST['ref_id'];
    $otp=$_POST['otp'];

    $url='https://api.sandbox.co.in/kyc/aadhaar/okyc/otp/verify';

    $data = '{
        "ref_id":"'.$refid.'",
        "otp":"'.$otp.'"

    }';

    $headers[]='Authorization :'.$auth_token;
    $ch = curl_init($url);
    curl_setopt($ch,CURLOPT_POST,1);
    curl_setopt($ch,CURLOPT_POSTFIELDS,$data);
    curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
    curl_setopt($ch,CURLOPT_HTTPHEADER,$headers);
    $result = curl_exec($ch);
    echo $result;
    
}


