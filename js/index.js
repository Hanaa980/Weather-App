let search = document.getElementById("search"),
    find = document.getElementById("find");

let todayDayEle = document.querySelector(".day"),
    todayDate = document.querySelector(".date"),
    locationEle = document.querySelector(".location"),
    temp = document.querySelector(".temp"),
    todayHumidity = document.querySelector(".humidity"),
    todayWind_Kph = document.querySelector(".wind-kph"),
    todayWind_Dir = document.querySelector(".wind-dir"),
    iconForecast = document.getElementById("iconForecast"),
    dataForecast = document.querySelector(".data-forecast"),
    //-----------------tomorrow----------------//
    tomorrow = document.querySelector(".tomorrow"),
    tomIconForecast = document.getElementById("tom-iconForecast"),
    tomMaxTemp = document.querySelector(".tom-max-temp"),
    tomMinTemp = document.querySelector(".tom-min-temp"),
    tom_data_forecast = document.querySelector(".tom-data-forecast"),
    //-------------------aftertomorrow--------//
    aftertom = document.querySelector(".after-tomorrow"),
    afterTomiconForecast = document.getElementById("afterTomiconForecast"),
    afterMaxTemp = document.querySelector(".after-max-temp"),
    afterMinTemp = document.querySelector(".after-min-temp"),
    afterDataForecast = document.querySelector(".after-data-forecast");

find.addEventListener("click", function () {
    if (search.value.trim() !== "") {
        async function getWeather() {
            try {
                let response =
                    await fetch(`https://api.weatherapi.com/v1/forecast.json?q=${search.value.trim()}&days=3&hour=1&tp=15&key=32890912db5349dda1f191552241912`);

                let data = await response.json();

                if (data.location) {
                    displayWeather(data);
                } else {
                    alert("Invalid location. Please enter a valid country or city name.");
                }
            } catch (error) {
                alert(error.message);
            }
        }
        getWeather();
    }
});

if (search.value.trim() === "") {
    navigator.geolocation.getCurrentPosition((position) => {
        let currentLocation = `${position.coords.latitude},${position.coords.longitude}`;
        getWeather(currentLocation);
    });
}

async function getWeather(location) {
    let response =
        await fetch(`https://api.weatherapi.com/v1/forecast.json?q=${location}&days=3&hour=1&tp=15&key=32890912db5349dda1f191552241912

`);
    let data = await response.json();
    displayWeather(data);
}

function displayWeather(data) {
    let DateOfDay = new Date(data.current.last_updated);
    let todayName = DateOfDay.toLocaleString("en-us", { weekday: "long" });
    let todaMonth = DateOfDay.toLocaleString("en-us", { month: "long" });
    let todayNumber = DateOfDay.toLocaleString("en-us", { day: "numeric" });
    //----------------------------------->
    //today
    todayDayEle.innerHTML = todayName;
    todayDate.innerHTML = `${todayNumber} ${todaMonth}`;
    locationEle.innerHTML = data.location.name;
    temp.innerHTML = data.current.temp_c;
    iconForecast.setAttribute("src", `https:${data.current.condition.icon}`);
    dataForecast.innerHTML = data.current.condition.text;
    todayHumidity.innerHTML = `${data.current.humidity}%`;
    todayWind_Kph.innerHTML = `${data.current.wind_kph}km/h`;
    todayWind_Dir.innerHTML = `${data.current.wind_dir}`;

    //---------------------------------->
    //tomorrow
    let DateOfTom = new Date(data.forecast.forecastday[1].date);
    let tomName = DateOfTom.toLocaleString("en-us", { weekday: "long" });
    tomorrow.innerHTML = tomName;
    tomIconForecast.setAttribute(
        "src",
        `https:${data.forecast.forecastday[1].day.condition.icon}`);
    tomMaxTemp.innerHTML = data.forecast.forecastday[1].day.maxtemp_c;
    tomMinTemp.innerHTML = data.forecast.forecastday[1].day.mintemp_c;
    tom_data_forecast.innerHTML = data.forecast.forecastday[1].day.condition.text;
    //--------------------------------->
    // afterTomorrow
    let afterTomDate = new Date(data.forecast.forecastday[2].date);
    let afterTomName = afterTomDate.toLocaleString("en-us", { weekday: "long" });
    aftertom.innerHTML = afterTomName;
    afterTomiconForecast.setAttribute("src", `https:${data.forecast.forecastday[2].day.condition.icon}`);
    afterMaxTemp.innerHTML = data.forecast.forecastday[2].day.maxtemp_c;
    afterMinTemp.innerHTML = data.forecast.forecastday[2].day.mintemp_c;
    afterDataForecast.innerHTML = data.forecast.forecastday[2].day.condition.text;
}
