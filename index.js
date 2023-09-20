const options = {
    method: "GET",
    headers: {
        'X-RapidAPI-Key': 'b45e96323fmshf5e4bc50d3b8a90p1e091djsnfb21cde4eb87',
        'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
    }
};

const cityName = document.getElementById("cityName");
const nameCity = document.getElementById("namecity");
const temp = document.getElementById("temp");
const temp2 = document.getElementById("temp2");
const feels_like = document.getElementById("feels_like");
const humidity = document.getElementById("humidity");
const humidity2 = document.getElementById("humidity2");
const min_temp = document.getElementById("min_temp");
const max_temp = document.getElementById("max_temp");
const wind_speed = document.getElementById("wind_speed");
const wind_speed2 = document.getElementById("wind_speed2");
const wind_degrees = document.getElementById("wind_degrees");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const city = document.getElementById("city");
const submit = document.getElementById("submit");
const home = document.getElementById("home");


const formatTime = (timestamp) => {
    const time = new Date(timestamp * 1000);
    return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true});
};

// Function to update weather data for a specific city
const updateCityWeather = (cityIndex, data) => {
    const rows = document.querySelectorAll('tbody tr'); // Select all table rows

    if (cityIndex < rows.length) {
        const row = rows[cityIndex]; // Get the specific row for the city

        // Update the cells within the row with relevant data
        row.cells[1].textContent = data.feels_like;
        row.cells[2].textContent = data.humidity;
        row.cells[3].textContent = data.max_temp;
        row.cells[4].textContent = data.min_temp;
        row.cells[5].textContent = formatTime(data.sunrise);
        row.cells[6].textContent = formatTime(data.sunset);
        row.cells[7].textContent = data.temp;
        row.cells[8].textContent = data.wind_degrees;
        row.cells[9].textContent = data.wind_speed;
    }
};

// Function to get weather data for a specific city
const getWeather = (city, cityIndex) => {
    cityName.innerHTML = city;
    fetch('https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=' + city, options)
        .then(response => response.json())
        .then((response) => {
            console.log(response);
            temp.innerHTML = response.temp;
            temp2.innerHTML = response.temp;
            feels_like.innerHTML = response.feels_like;
            humidity.innerHTML = response.humidity;
            humidity2.innerHTML = response.humidity;
            min_temp.innerHTML = response.min_temp;
            max_temp.innerHTML = response.max_temp;
            wind_speed.innerHTML = response.wind_speed;
            wind_speed2.innerHTML = response.wind_speed;
            wind_degrees.innerHTML = response.wind_degrees;
            sunrise.innerHTML = formatTime(response.sunrise);
            sunset.innerHTML = formatTime(response.sunset);

            // Now, update the table for the current city
            updateCityWeather(cityIndex, response);
        })
        .catch(err => console.error(err));
};

// Function to fetch weather data for all cities in the array
const fetchAllCityWeather = () => {
    const cities = ["Hamilton", "Sydney", "France", "Calgary"];
    cities.forEach((city, index) => {
        getWeather(city, index);
    });
};

// Call the function to fetch weather data for all cities when the page loads
window.addEventListener("load", () => {
    fetchAllCityWeather();
    getWeather("Toronto", -1); // Fetch weather for Toronto on page load
});

submit.addEventListener("click", (e) => {
    e.preventDefault();
    const cityValue = city.value.trim();
    if (cityValue !== "") {
        getWeather(cityValue, -1);
    }
});

home.addEventListener("click", () => {
    location.reload();
});
