function toggleLocationInput() {
    const pincodeInput = document.getElementById('pincodeInput');
    const currentLocationButton = document.getElementById('currentLocationButton');
    const locationOption = document.querySelector('input[name="locationOption"]:checked').value;

    if (locationOption === 'pincode') {
        pincodeInput.style.display = 'block';
        currentLocationButton.style.display = 'none';
    } else {
        pincodeInput.style.display = 'none';
        currentLocationButton.style.display = 'block';
    }
}

function searchCare() {
    const careType = document.getElementById('careType').value;
    const locationOption = document.querySelector('input[name="locationOption"]:checked').value;

    if (locationOption === 'pincode') {
        const pincode = document.getElementById('pincode').value; // Get the pincode

        if (!pincode) {
            alert("Please enter a pincode");
            return;
        }

        const apiKey = "ASiw2lNNhUDGLUCzeYl495r1zIs6oqm7dUpCCTPWLRhXWdhpDvuwJQQJ99AJACYeBjF03GaDAAAgAZMPmj7G";
        const geocodingUrl = `https://atlas.microsoft.com/search/address/json?subscription-key=${apiKey}&api-version=1.0&query=${pincode}&countrySet=IN`;

        fetch(geocodingUrl)
            .then(response => response.json())
            .then(data => {
                if (data.results.length > 0) {
                    const latitude = data.results[0].position.lat;
                    const longitude = data.results[0].position.lon;

                    performSearch(careType, latitude, longitude); // Search with pincode lat/long
                } else {
                    console.error("Unable to find location for the given pincode.");
                }
            })
            .catch(error => {
                console.error('Error geocoding pincode:', error);
            });
    } else {
        getCurrentLocation(); // Use current location if selected
    }
}

function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const careType = document.getElementById('careType').value;

            performSearch(careType, latitude, longitude); // Search with current location lat/long
        }, () => {
            alert("Unable to retrieve your location");
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function performSearch(careType, latitude, longitude) {
    const apiKey = "ASiw2lNNhUDGLUCzeYl495r1zIs6oqm7dUpCCTPWLRhXWdhpDvuwJQQJ99AJACYeBjF03GaDAAAgAZMPmj7G";
    const searchUrl = `https://atlas.microsoft.com/search/poi/json?subscription-key=${apiKey}&api-version=1.0&typeahead=true&query=${careType}&limit=10&countrySet=IN&lat=${latitude}&lon=${longitude}&radius=50000`;

    fetch(searchUrl)
        .then(response => response.json())
        .then(data => {
            displayResults(data.results);
            displayMap(data.results, latitude, longitude); // Pass latitude and longitude to the map function
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function displayResults(results) {
    const tableBody = document.querySelector('#resultsTable tbody');
    tableBody.innerHTML = ''; // Clear previous results

    // Sort results by distance
    const sortedResults = results.sort((a, b) => a.dist - b.dist);

    // Display top 10 results
    sortedResults.slice(0, 10).forEach(result => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${result.poi.name}</td><td>${(result.dist / 1000).toFixed(2)} km</td>`;
        tableBody.appendChild(row);
    });
}

function displayMap(results, latitude, longitude) {
    const map = new atlas.Map('myMap', {
        center: [longitude, latitude], // Center on the location
        zoom: 12,
        view: 'Auto',
        authOptions: {
            authType: 'subscriptionKey',
            subscriptionKey: 'ASiw2lNNhUDGLUCzeYl495r1zIs6oqm7dUpCCTPWLRhXWdhpDvuwJQQJ99AJACYeBjF03GaDAAAgAZMPmj7G'
        }
    });

    // Add markers for the top 10 results
    results.slice(0, 10).forEach(result => {
        const position = [result.position.lon, result.position.lat];
        const marker = new atlas.HtmlMarker({
            color: 'DodgerBlue',
            text: result.poi.name,
            position: position
        });

        map.markers.add(marker);
    });

    // Set map view to fit all markers
    const positions = results.slice(0, 10).map(r => [r.position.lon, r.position.lat]);
    const bounds = atlas.data.BoundingBox.fromPositions(positions);
    map.setCamera({
        bounds: bounds,
        padding: 50,
        center: [longitude, latitude],
        zoom: 12
    });
}