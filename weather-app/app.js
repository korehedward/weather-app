const tempDegree = document.querySelector(".temperature-degree");
const tempDesc = document.querySelector(".temperature-description");
const weatherIcon = document.querySelector(".icon");
const loc = document.querySelector(".location-timezone");
window.addEventListener("load", () => {
  let long;
  let lati;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lati = position.coords.latitude;

      console.log(lati);

      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${long}&appid=fdfc2d83e814052d161a7109ca2aa57e`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          const { temp } = data.main;
          let tempC = Math.round((temp - 272.15) * 10) / 10;
          tempDegree.innerHTML = tempC;

          loc.textContent = data.name + "/" + data.sys.country;

          const [icon] = data.weather;
          console.log(icon.description);

          function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
          }

          tempDesc.innerHTML = capitalizeFirstLetter(icon.description);

          if (icon.description == "few clouds") {
            weatherIcon.src = "/animated/cloudy.svg";
          } else if (icon.description == "clear sky") {
            weatherIcon.src = "/animated/day.svg";
          } else if (icon.description == "scattered clouds") {
            weatherIcon.src = "/animated/cloudy.svg";
          } else if (icon.description == "broken clouds") {
            weatherIcon.src = "/animated/cloudy.svg";
          } else if (icon.description == "overcast clouds") {
            weatherIcon.src = "/animated/cloudy.svg";
          }
        });
    });
  }
});
