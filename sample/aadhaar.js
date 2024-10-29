const aadhaarNumberInput = document.getElementById("aadhaarNumber");
const generateOTPButton = document.getElementById("generateOTP");
const otpInput = document.getElementById("otp");
const verifyOTPButton = document.getElementById("verifyOTP");
const verificationMessage = document.getElementById("verification-message");

// Simulate OTP generation (not actual API call)
generateOTPButton.addEventListener("click", function() {
  const aadhaarNumber = aadhaarNumberInput.value;
  if (!aadhaarNumber) {
    verificationMessage.textContent = "Please enter your Aadhaar number.";
    return;
  }
  // Simulate OTP generation
  const simulatedOTP = Math.floor(Math.random() * 100000);
  verificationMessage.textContent = `OTP sent to your registered mobile number: ${simulatedOTP}`;

  // Show OTP input and verification button
  document.getElementById("otp-container").style.display = "block";
  generateOTPButton.disabled = true;
});

// Simulate OTP verification (not actual API call)
verifyOTPButton.addEventListener("click", function() {
  const otp = otpInput.value;
  if (!otp) {
    verificationMessage.textContent = "Please enter the OTP.";
    return;
  }
  // Simulate OTP verification (replace with actual API call)
  const simulatedVerification = otp === "123456"; // Replace with actual logic

  verificationMessage.textContent = simulatedVerification
    ? "Aadhaar verified successfully (Demo)"
    : "Invalid OTP. Please try again.";

  // Clear form for next verification
  aadhaarNumberInput.value = "";
  otpInput.value = "";
  generateOTPButton.disabled = false;
  document.getElementById("otp-container").style.display = "none";
});