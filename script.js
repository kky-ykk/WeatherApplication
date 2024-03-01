/**
 * The JavaScript code fetches weather data from an API based on user input for a specific city and
 * displays various weather details on a webpage.
 * @param url - The `url` variable in your code is the endpoint for fetching weather data from the
 * Weatherbit API. It includes parameters like latitude, longitude, API key, and the city you want to
 * get weather data for. The latitude and longitude are set to Raleigh, North Carolina by default, but
 * the city
 */

// -------------- fetching Api thorugh cities------------------
let data="";

let url="https://api.weatherbit.io/v2.0/current?lat=35.7796&lon=-78.6382&key=fb78446f031e45cab70f33a8aa6530e8&include=minutely&city=Roorkee&country=India";

const inpt=document.querySelector(".input-box");

let search_btn=document.querySelector("#searchBtn");
search_btn.addEventListener("click",()=>{
    let city=inpt.value;
    url=url=`https://api.weatherbit.io/v2.0/current?lat=35.7796&lon=-78.6382&key=fb78446f031e45cab70f33a8aa6530e8&include=minutely&city=${city}`;
    callApi(url);
});


async function callApi(url) {
    let res1=await fetch(url);
    if(res1.ok){
      let res2=await res1.json();
      data=res2.data;
      if(data)
      loadData(data);
    }else{
      show404();
      throw new Error("fail to fetch Api's Datas");
    }
}



function show404() {
     document.querySelector(".location-not-found").style.display="block";
     document.querySelector(".weather-body").style.display="none";
}

function loadData(data) {

      // ------------------------------diplaying content
     document.querySelector(".weather-body").style.display="block";
          
      let cityName=document.querySelector(".city");
      let dateTime=document.querySelector(".date-time");

      // adding city name
      cityName.innerText=data[0].city_name;

      // ------------- displaying country code
      document.querySelector(".countryCode").innerText=data[0].country_code;

      // adding date and time
      const dt=data[0].ob_time.split(" ");
      const dates=dt[0].split("-");
      const monthNamesShort = ["","Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

      let month=monthNamesShort[+dates[1]];
      let date=dates[2];
      let year=dates[0];

      dateTime.innerText=date+" "+month+" "+year;

      console.log(dt);
      console.log(dates);

      // ---------------seting weather images

      const wi=document.querySelector(".weather-img");
      console.log(data[0].weather.icon);
      wi.src=`https://cdn.weatherbit.io/static/img/icons/${data[0].weather.icon}.png`;

      // --------------- adding temperature----------------
      let temp=document.querySelector(".temperature");
      temp.innerHTML=`${data[0].temp}<sup>°C</sup>`;

      // ------ addding description-------------

      let desc=document.querySelector(".description");
      desc.innerText=data[0].weather.description;

      // --------------------- adding humidity

      let humidity=document.querySelector("#humidity");
      humidity.innerText=data[0].rh+"%";

      //  ---------------------- adding wind-speed------------
      let ws=document.querySelector("#wind-speed");
      ws.innerText=data[0].wind_spd.toFixed(2)+" Km/H";

      // -------------------- adding air quality

      let aqi=document.querySelector("#air-quality");
      aqi.innerText=data[0].aqi;

      // --------------------- adding visbility-------------

      let visible=document.querySelector("#visible");
      visible.innerText=data[0].vis+" km";

      // --------------------uc-index------------
      let uv=document.querySelector("#uv");
      uv.innerText=data[0].uv+" +";

      // ---------------------- wind -direction
      let wd=document.querySelector("#wind-dir");
      wd.innerText=data[0].wind_cdir_full;
}


callApi(url);
