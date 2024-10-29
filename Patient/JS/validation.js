const form = document.getElementById('form')
const phone_input = document.getElementById('phone')
const email_input = document.getElementById('email')
const password_input = document.getElementById('pass')
const cpassword_input = document.getElementById('cpass')
const blood_input = document.getElementById('blood')
const error_message = document.getElementById('error-message')

form.addEventListener('submit', (e) => {
    let errors = []
    
    if(phone_input){
        // If we have blood type input then we are in signup form
        errors = getSignupFormErrors(phone_input.value, email_input.value, password_input.value, cpassword_input.value, blood_input.value)
    }
    else{
        // If we don't have blood type input then we are in login form
        errors = getLoginFormErrors(email_input.value, password_input.value)
    }
    if(errors.length > 0){
        // If there are any errors
        e.preventDefault()
        error_message.innerText  = errors.join(" ")
    }
})

function getSignupFormErrors(phone, email, password, repeatPassword, blood){
    let errors = []
  
    if(phone === '' || phone == null){
        errors.push('Phone Number is required\n')
        phone_input.parentElement.classList.add('incorrect')
    }
    else if(phone.length < 10){
        errors.push('Phone Number must have 10 digits\n')
        phone_input.parentElement.classList.add('incorrect')
    }
    // else if(phone.pattern != '[6, 7, 8, 9][0-9]{9}'){
    //     errors.push('Please enter a valid number\n')
    //     phone_input.parentElement.classList.add('incorrect')
    // }
    if(email === '' || email == null){
        errors.push('Email is required\n')
        email_input.parentElement.classList.add('incorrect')
    }
    if(password === '' || password == null){
        errors.push('Password is required\n')
        password_input.parentElement.classList.add('incorrect')
    }
    else if(password.length < 8){
        errors.push('Password must have at least 8 characters\n')
        password_input.parentElement.classList.add('incorrect')
    }
    else if(password !== repeatPassword){
        errors.push('Password does not match\n')
        password_input.parentElement.classList.add('incorrect')
        cpassword_input.parentElement.classList.add('incorrect')
    }
    if(blood == '' || blood == null){
        errors.push('Blood Type is required\n')
        blood_input.parentElement.classList.add('incorrect')
    }
    return errors;
}

function getLoginFormErrors(email, password){
    let errors = []
  
    if(email === '' || email == null){
      errors.push('Email is required')
      email_input.parentElement.classList.add('incorrect')
    }
    if(password === '' || password == null){
      errors.push('Password is required')
      password_input.parentElement.classList.add('incorrect')
    }
  
    return errors;
}
  
const citiesByState = {
    "Andaman and Nicobar Islands": ["North Andamans", "Middle Andamans", "South Andamans", "Nicobar"],
    "Arunachal Pradesh": ["Anjaw", "Changlang", "East Siang", "West Siang", "Lower Subansiri", "Upper Subansiri", "Lower Dibang Valley", "Upper Dibang Valley", "Siang", "Tawang", "West Kameng", "East Kameng", "Papum Pare", "Kurung Kumey", "Kra Daadi"],
    "Assam": ["Kokrajhar", "Darrang", "Nalbari", "Barpeta", "Bongaigaon", "Chirang", "Goalpara", "Kamrup", "Kamrup Metropolitan", "Udalguri", "Morigaon", "Jorhat", "Golaghat", "Majuli", "Sibsagar", "Sivasagar", "Dibrugarh", "Tinsukia", "Dhemaji", "Lakhimpur", "Sonitpur"],
    "Bihar": ["Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Bhojpur", "Buxar", "Darbhanga", "East Champaran", "Gaya", "Gopalganj", "Jamui", "Jehanabad", "Kaimur", "Katihar", "Khagaria", "Kishanganj",   
    "Madhubani", "Munger", "Muzaffarpur", "Nalanda", "Nawada", "Patna", "Purnia", "Rohtas", "Saharsa", "Samastipur", "Sheikhpura", "Sheohar", "Siwan", "Supaul", "Vaishali"],
    "Chandigarh": ["Chandigarh"],
    "Chhattisgarh": ["Raipur", "Bilaspur", "Durg", "Rajnandgaon", "Kanker", "Bastar", "Dantewada", "Bijapur", "Sukma", "Narayanpur", "Koriya", "Surguja", "Balrampur", "Gariaband", "Mungeli", "Dhamtari", "Mahasamund", "Raigarh", "Jashpur", "Balod", "Balodabazar", "Bemetara", "Durgapur", "Janjgir-Champa"],
    "Dadra and Nagar Haveli and Daman and Diu": ["Dadra and Nagar Haveli", "Daman", "Diu"],
    "Delhi": ["North Delhi", "North West Delhi", "West Delhi", "Central Delhi", "South West Delhi", "South Delhi", "New Delhi", "East Delhi", "North East Delhi"],
    "Goa": ["North Goa", "South Goa"],
    "Gujarat": ["Ahmedabad", "Gandhinagar", "Surat", "Vadodara", "Rajkot", "Jamnagar", "Bhavnagar", "Junagadh", "Porbandar", "Kutch", "Morbi", "Surendranagar", "Patan", "Mahesana", "Banaskantha", "Palanpur", "Sabarkantha", "Aravalli", "Panchmahal", "Dahod", "Vadodara", "Narmada", "Bharuch", "The Dangs", "Navsari", "Surat", "Tapi", "Valsad"],
    "Haryana": ["Ambala", "Panchkula", "Yamunanagar", "Kurukshetra", "Kaithal", "Karnal", "Panipat", "Sonipat", "Jhajjar", "Rohtak", "Bhiwani", "Mahendragarh", "Charkhi Dadri", "Sirsa", "Fatehabad", "Hisar", "Hansi", "Jind", "Khetri", "Rajgarh", "Rewari"],
    "Himachal Pradesh": ["Shimla", "Solan", "Sirmaur", "Bilaspur", "Hamirpur", "Una", "Kangra", "Chamba", "Lahul and Spiti", "Kullu", "Mandi", "Kinnaur", "Lahaul and Spiti"],
    "Jharkhand": ["Ranchi", "Gumla", "Lohardaga", "Simdega", "Khunti", "Palamu", "Garhwa", "Latehar", "Chatra", "Hazaribagh", "Koderma", "Ramgarh", "Dhanbad", "Bokaro", "Jamtara", "Deoghar", "Dumka", "Pakur", "Godda"],
    "Jammu and Kashmir": ["Jammu", "Srinagar", "Kathua", "Rajouri", "Poonch", "Doda", "Kishtwar", "Ramban", "Udhampur", "Reasi", "Anantnag", "Kulgam", "Shopian", "Pulwama", "Budgam", "Ganderbal", "Bandipora", "Baramulla", "Kupwara"],
    "Karnataka": ["Bengaluru Urban", "Bengaluru Rural", "Mysuru", "Belagavi", "Kalaburagi", "Dharwad", "Davangere", "Shivamogga", "Hubli-Dharwad", "Vijayapura", "Bidar", "Raichur", "Yadgir", "Hassan", "Mandya", "Chamarajanagar", "Kodagu", "Chikkamagaluru", "Tumakuru", "Kolar", "Ramnagara", "Chitradurga", "Davangere", "Bellary", "Vijayapura", "Bagalkot", "Haveri", "Gadag", "Davanagere", "Udupi", "Dakshina Kannada", "Kolar", "Chikkaballapura"],
    "Kerala": ["Thiruvananthapuram", "Kollam", "Alappuzha", "Pathanamthitta", "Kottayam", "Idukki", "Ernakulam", "Thrissur", "Palakkad", "Malappuram", "Kozhikode", "Wayanad", "Kannur", "Kasaragod"],   
    "Ladakh": ["Leh", "Kargil"],
    "Lakshadweep": ["Agatti", "Amini", "Androth", "Bitra", "Kadmat", "Kalpeni", "Kavaratti", "Minicoy"],
    "Madhya Pradesh": ["Bhopal", "Indore", "Jabalpur", "Gwalior", "Bhind", "Morena", "Guna", "Ashoknagar", "Shivpuri", "Tikamgarh", "Damoh", "Sagar", "Vidisha", "Raisen", "Sehore", "Bhopal", "Sehore", "Rajgarh", "Vidisha", "Bhind", "Gwalior", "Datia", "Jhansi", "Lalitpur", "Hamirpur", "Banda", "Fatehpur", "Kanpur Dehat", "Kanpur Nagar", "Etawah", "Mainpuri", "Auraiya", "Farrukhabad", "Hardoi", "Unnao", "Lucknow", "Sitapur", "Barabanki", "Faizabad", "Ayodhya", "Ambedkar Nagar", "Sultanpur", "Azamgarh", "Mau", "Ballia", "Ghazipur", "Varanasi", "Chandauli", "Mirzapur", "Sonbhadra"],
    "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Thane", "Kolhapur", "Aurangabad", "Solapur", "Jalna", "Parbhani", "Hingoli", "Nandurbar", "Dhule", "Jalgaon", "Ahmednagar", "Pune", "Satara", "Ratnagiri", "Sindhudurg", "Kolhapur", "Sangli", "Bijapur", "Bagalkot", "Belgaum", "Dharwad", "Gadag", "Haveri", "Udupi", "Dakshina Kannada"],
    "Manipur": ["Imphal East", "Imphal West", "Thoubal", "Kakching", "Chandel", "Bishnupur", "Phungpoh", "Churachandpur", "Tengnoupal", "Noney", "Ukhrul", "Senapati", "Tamenglong", "Jiribam"],
    "Meghalaya": ["East Khasi Hills", "West Khasi Hills", "Ri-Bhoi", "Jaintia Hills", "West Garo Hills", "East Garo Hills", "South West Garo Hills", "North Garo Hills"],
    "Mizoram": ["Aizawl", "Champhai", "Kolasib", "Lunglei", "Mamit", "Saiha", "Serchhip", "Hnahthial", "Siaha"],
    "Nagaland": ["Kohima", "Dimapur", "Mokokchung", "Wokha", "Mon", "Tuensang", "Kiphire", "Peren", "Phek", "Zunheboto"],
    "Odisha": ["Bhubaneswar", "Cuttack", "Puri", "Ganjam", "Kalahandi", "Kandhamal", "Boudh", "Sambalpur", "Bargarh", "Nuapada", "Sonapur", "Jharsuguda", "Sundargarh", "Keonjhar", "Mayurbhanj", "Balasore", "Bhadrak", "Jajpur", "Kendrapada", "Jagatsinghpur", "Nayagarh", "Khurda", "Gajapati", "Malkangiri", "Nabarangpur", "Koraput"],
    "Puducherry": ["Puducherry", "Karaikal", "Mahe", "Yanam"],
    "Punjab": ["Amritsar", "Patiala", "Ludhiana", "Jalandhar", "Hoshiarpur", "Kapurthala", "Moga", "Firozpur", "Faridkot", "Muktsar", "Sangrur", "Barnala", "Patiala", "Fatehgarh Sahib", "Ropar", "Mohali", "Kharar", "Anandpur Sahib"],
    "Rajasthan": ["Jaipur", "Kota", "Jodhpur", "Bikaner", "Ajmer", "Udaipur", "Alwar", "Bhilwara", "Bharatpur", "Barmer", "Jaisalmer", "Jhalawar", "Jodhpur", "Jalore", "Jaisalmer", "Karauli", "Kota", "Nagaur", "Pali", "Sikar", "Tonk", "Bikaner", "Churu", "Hanumangarh", "Jhunjhunu", "Sikar", "Shekhawati", "Alwar", "Bharatpur", "Dausa", "Karauli", "Sawai Madhopur", "Bhilwara", "Chittorgarh", "Rajsamand", "Udaipur", "Banswara", "Dungarpur", "Pratapgarh"],
    "Sikkim": ["East Sikkim", "West Sikkim", "North Sikkim", "South Sikkim"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Vellore", "Erode", "Thoothukudi", "Nilgiris", "Namakkal", "Dharmapuri", "Krishnagiri", "Ramanathapuram", "Virudhunagar", "Tenkasi", "Kanyakumari", "Perambalur", "Ariyalur", "Ranipet", "Chengalpattu", "Kancheepuram", "Thiruvallur"],
    "Telangana": ["Hyderabad", "Ranga Reddy", "Medchal-Malkajgiri", "Nalgonda", "Warangal Urban", "Warangal Rural", "Khammam", "Bhadradri-Kothagudem", "Mahabubabad", "Nirmal", "Adilabad", "Komaram Bheem Asifabad", "Mancherial", "Karimnagar", "Jagtial", "Peddapalli", "Rajanna Siricilla", "Medak", "Sangareddy", "Siddipet", "Nizamabad", "Kamareddy", "Bheemgal", "Yadadri-Bhuvanagiri", "Nalgonda", "Suryapet", "Mahbubnagar", "Nagarkurnool", "Jogulamba Gadwal"],
    "Tripura": ["Agartala", "West Tripura", "South Tripura", "North Tripura", "Dhalai", "Gomati", "Khowai", "Sepahijala", "Unakoti"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Agra", "Bareilly", "Aligarh", "Meerut", "Moradabad", "Gorakhpur", "Varanasi", "Jhansi", "Faizabad", "Saharanpur", "Amroha", "Badaun", "Bulandshahr", "Etawah", "Farrukhabad", "Fatehpur", "Firozabad", "Gautam Buddha Nagar", "Hapur", "Hardoi", "Jalaun", "Jhansi", "Kanpur Dehat", "Kheri", "Lalitpur", "Mathura", "Mau", "Mahoba", "Mainpuri", "Mirzapur", "Muzaffarnagar", "Pilibhit", "Rae Bareli", "Rampur", "Saharanpur", "Sambhal", "Shahjahanpur", "Shrawasti", "Sitapur", "Sultanpur", "Unnao", "Uttar Pradesh", "Varanasi"],
    "Uttarakhand": ["Dehradun", "Nainital", "Haridwar", "Udham Singh Nagar", "Pauri Garhwal", "Tehri Garhwal", "Chamoli", "Rudraprayag", "Uttarkashi", "Bageshwar", "Champawat", "Pithoragarh"],
    "West Bengal": ["Kolkata", "North 24 Parganas", "South 24 Parganas", "Howrah", "Hooghly", "Nadia", "Murshidabad", "Birbhum", "Malda", "North Dinajpur", "South Dinajpur", "Darjeeling", "Jalpaiguri", "Cooch Behar", "Alipurduar", "Bankura", "West Midnapore", "East Midnapore", "Purba Medinipur", "Paschim Medinipur"]
};

const state = document.getElementById('state');
const city = document.getElementById('city');

function populateCities() {
    const selectedState = state.value;
    const cities = citiesByState[selectedState];

    city.innerHTML = '<option value="">Select City</option>';
    cities.forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        option.text = city;
        cityDropdown.appendChild(option);
    });
}

const allInputs = [phone_input, email_input, password_input, cpassword_input, blood_input].filter(input => input != null)

allInputs.forEach(input => {
  input.addEventListener('input', () => {
    if(input.parentElement.classList.contains('incorrect')){
      input.parentElement.classList.remove('incorrect')
      error_message.innerText = ''
    }
  })
})

