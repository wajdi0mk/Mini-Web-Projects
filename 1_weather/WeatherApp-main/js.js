const apiKey="a8c8f1b8f4489c5fc2471ef19cfd617c";
const apiUrl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox= document.querySelector(".search input");
const searchBtn= document.querySelector(".search button");

async function checkWeather(city){
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    const data = await response.json();

    if (response.status === 404) {
        document.querySelector(".city").innerHTML = "City not found. Please check the name and try again.";
        document.querySelector(".temp").innerHTML = ""
        document.querySelector(".img").src="cloud.png";
        document.querySelector(".humidity").innerHTML = "";
        document.querySelector(".wind").innerHTML = "";
        return;
    }
    console.log(data);
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) +"°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
    switch(data.weather[0].main) {
        case "Clear":
          document.querySelector(".img").src="sun.png";
          break;
        case "Rain":
            document.querySelector(".img").src="raining.png";
          break
        case "Snow":
            document.querySelector(".img").src="snow.png";
          break;
        case "Clouds":
            document.querySelector(".img").src="cloudy.png";
          break;
        case "Drizzle":
            document.querySelector(".img").src="drizzle.png";
          break;
        case "Thunderstorm":
            document.querySelector(".img").src="thunderstorm.png";
          break;
        case "Mist":
            document.querySelector(".img").src="mist.png";
          break;
        default:
          document.querySelector(".img").src="sun.png";
      }   


  } catch (error) {
    console.error("An error occurred:", error);
    document.querySelector(".city").innerHTML = "An error occurred. Please try again later.";
    
}
}


searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
})
searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault(); 
        checkWeather(searchBox.value);
    }
});