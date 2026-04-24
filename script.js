 let addbtn = document.querySelector(".addbtn");
        let result = document.querySelector(".result");
        let windspeed = document.querySelector(".wind");
        let humidity = document.querySelector(".humidity");
        let place = document.querySelector(".place");

        async function getWeatherData(defaultLocation) {
            let inputLocation = document.querySelector(".location");
            let l = inputLocation.value.trim() || defaultLocation;
            console.log(l);
            let loc = `https://geocoding-api.open-meteo.com/v1/search?name=${l}`;
            let r = await fetch(loc);
            let d = await r.json();
            if (!d.results || d.results.length === 0) {
                console.log("result not found");
                return;
            }
            let lat = d.results[0].latitude;
            let lon = d.results[0].longitude;
            console.log(lat);
            console.log(lon);
            let url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m,relative_humidity_2m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`;

            let res = await fetch(url);
            let weatherData = await res.json();
            console.log(weatherData);
            place.innerText = l;
            humidity.innerText = weatherData.current.relative_humidity_2m + weatherData.current_units.relative_humidity_2m;
            result.innerText = weatherData.current.temperature_2m + weatherData.current_units.temperature_2m;
            windspeed.innerText = weatherData.current.wind_speed_10m + weatherData.current_units.wind_speed_10m;
            inputLocation.value="";
        }
        addbtn.addEventListener("click", (e) => {
            e.preventDefault();
            getWeatherData();
        });
        window.addEventListener("load", () => {
            getWeatherData("kharian")
        })
