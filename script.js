// Load JSON data
async function loadData() {
    const patientResponse = await fetch('prescription.json');
    const doctorResponse = await fetch('medication.json');
    
    const patients = await patientResponse.json();
    const doctors = await doctorResponse.json();

    populateDropdown(patients, 'patientSelect');
    populateDropdown(doctors, 'doctorSelect');
    
    // Save data for later use
    window.patientData = patients;
    window.doctorData = doctors;
}

function populateDropdown(data, selectId) {
    const select = document.getElementById(selectId);
    data.forEach(item => {
        const option = document.createElement("option");
        option.value = item.Id;
        option.text = item.Name || item.patient_name;
        select.add(option);
    });
}

function showSection(section) {
    document.querySelectorAll('.section').forEach(div => div.style.display = 'none');
    document.getElementById(section).style.display = 'block';
}

function loadPatientDetails() {
    const selectedId = document.getElementById('patientSelect').value;
    const patient = window.patientData.find(p => p.Id === parseInt(selectedId));

    if (patient) {
        document.getElementById('patientDetails').innerHTML = `
            <p><strong>Aadhar Card:</strong> ${patient.aadhaar}</p>
            <p><strong>Date:</strong> ${patient.date}</p>
            <p><strong>Age:</strong> ${patient.age}</p>
            <p><strong>Gender:</strong> ${patient.sex}</p>
            <p><strong>Height:</strong> ${patient.height} cm</p>
            <p><strong>Weight:</strong> ${patient.weight} kg</p>
            <p><strong>BMI:</strong> ${patient.bmi}</p>
            <p><strong>Diagnosis:</strong> ${patient.diagnosis}</p>
            <p><strong>Allergies:</strong> ${patient.allergies}</p>
        `;
    }
}

function loadDoctorDetails() {
    const selectedId = document.getElementById('doctorSelect').value;
    const doctor = window.doctorData.find(d => d.Id === parseInt(selectedId));

    if (doctor) {
        document.getElementById('doctorDetails').innerHTML = `
            <p><strong>Registration Number:</strong> ${doctor.RegistrationNumber}</p>
            <p><strong>Phone Number:</strong> ${doctor.PhoneNumber}</p>
            <p><strong>Hospital Name:</strong> ${doctor.HospitalName}</p>
            <p><strong>Specialization:</strong> ${doctor.Specification}</p>
            <p><strong>City:</strong> ${doctor.City}</p>
            <p><strong>State:</strong> ${doctor.State}</p>
            <p><strong>Country:</strong> ${doctor.Country}</p>
            <p><strong>Postal Code:</strong> ${doctor.PostalCode}</p>
        `;
    }
}

// Initialize and load data on page load
window.onload = loadData;
