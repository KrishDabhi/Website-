document.addEventListener('DOMContentLoaded', function () {
    function getUserCity() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    console.log('Latitude:', lat, 'Longitude:', lon); // Debug coordinates

                    const apiKey = '87589f771c1989d32b313de8e263ef0b';
                    const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${lat},${lon}`;

                    fetch(url)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(`HTTP error! status: ${response.status}`);
                            }
                            return response.json();
                        })
                        .then(data => {
                            console.log('API Response:', data); // Debug the API response
                            if (data.location && data.location.name) {
                                typeCityName(data.location.name);
                            } else {
                                console.error('Invalid API response structure');
                                typeCityName('Unknown City');
                            }
                        })
                        .catch(error => {
                            console.error('Fetch error:', error);
                            typeCityName('Unknown City');
                        });
                },
                function () {
                    console.error('Geolocation permission denied or unavailable.');
                    typeCityName('Unknown City');
                }
            );
        } else {
            console.error('Geolocation not supported.');
            typeCityName('Geolocation Not Supported');
        }
    }

    function typeCityName(cityName) {
        const cityHeading = document.getElementById('city-heading');
        if (!cityHeading) {
            console.error('Element with id "city-heading" not found in HTML');
            return;
        }

        const text = `${cityName}, Connected.`;
        let i = 0;

        cityHeading.textContent = ''; // Clear existing text

        function typeWriter() {
            if (i < text.length) {
                cityHeading.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 95);
            }
        }

        typeWriter();
    }

    getUserCity();
});
