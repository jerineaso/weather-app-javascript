let locate_btn = document.querySelector("#locate_btn");
let weather_inp = document.querySelector("#weather");
let warning = document.querySelector(".warning");
let country_name = document.querySelector(".country_name")
let weather_now = document.querySelector(".weather_now")
let temperature = document.querySelector(".temp")
let pressures = document.querySelector(".pressure")
let humiditys = document.querySelector(".humidity")
let wind = document.querySelector(".wind")
let detailed_tab = document.querySelector(".detailed_tab")
let weather_img = document.querySelector(".weather_img")


let API = "8dbc1e38c1168ee680482073900931d7"

locate_btn.addEventListener('click',(e)=>{
    e.preventDefault();
    weather_inp.value = ""
    getLocation();
})

// Navigating to the device location

function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition,showError);
    }else{
        console.log(("not supported"));
    }
}

function showPosition(position){
    lat = position.coords.latitude;
    lon = position.coords.longitude
    
    console.log(lat+""+lon);
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API}`).then(res=>res.json())
    .then(data=>{
        weatherApi(data)
        detailed_tab.style.display = "block"
    })
}

function showError(error)
{
switch(error.code) 
{
case error.PERMISSION_DENIED:
    warning.textContent = "User denied the request for Geolocation";
    break;
case error.POSITION_UNAVAILABLE:
    warning.textContent = "Location information is unavailable.";
    break;
case error.TIMEOUT:
    warning.textContent = "The request to get user location timed out.";
    break;
case error.UNKNOWN_ERROR:
    warning.textContent = "An unknown error occurred.";
    break;
}
}

// Data from API

function weatherApi(info){
    console.log(info);
    if(info.cod == 404){
        console.log("Invalid");
        warning.style.display = "block"
        warning.classList.add("error")
        warning.textContent = "Please enter a valid city!!!"
        setTimeout(()=> {
            warning.style.display = "none"
            warning.classList.remove("error")  
        }, 3000);
    }else{
        warning.classList.add("pending")
        warning.textContent = "Getting the details"
        setTimeout(()=> {
            warning.style.display = "none"
            warning.classList.remove("pending")  
        }, 3000);   
    }


    const {temp,humidity,pressure} = info.main
    const {id, description} = info.weather[0]

    country_name.textContent = info.name
    weather_now.textContent =  description
    temperature.innerHTML = `${temp} °C`
    pressures.textContent = pressure
    humiditys.textContent = `${humidity}%`
    wind.textContent =  info.wind.speed

    if(id >= 200 && id <=232){
        weather_img.src = "weather_icons/thunder.svg"
    }else if(id >= 502 && id <=531){
        weather_img.src = "weather_icons/rainy.svg"
    }else if(id >= 500 && id <502){
        weather_img.src = "weather_icons/rainy_sun.svg"
    }else if(id >= 600 && id <602){
        weather_img.src = "weather_icons/snowy_sun.svg"
    }else if(id >= 602 && id <622){
        weather_img.src = "weather_icons/snowy.svg"
    }else if(id >= 801 && id<= 804){
        weather_img.src = "weather_icons/cloudy_sun.svg"
    }else{
        weather_img.src = "weather_icons/day.svg"
    }
}

// By taking the input from the user
weather_inp.addEventListener("change",(e)=>{
    e.preventDefault();
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${e.target.value}&units=metric&appid=${API}`)
    .then(res => res.json())
    .then(data => {
        weatherApi(data)
        detailed_tab.style.display = "block"
    })
})


        
        
