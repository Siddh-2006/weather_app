const userLocation=document.querySelector("#userLocation");
const converter=document.querySelector("#converter");
const wdvalue=document.querySelector("#WDValue")
const temperature=document.querySelector(".temperature");
const feelsLike=document.querySelector(".feelsLike");
const description=document.querySelector(".description");
const date=document.querySelector(".date");
const city=document.querySelector(".city");
const HValue=document.querySelector("#HValue");
const WValue=document.querySelector("#WValue");
const SRValue=document.querySelector("#SRValue");
const SSValue=document.querySelector("#SSValue");
const CValue=document.querySelector("#CValue");
const UVValue=document.querySelector("#UVValue");
const PValue=document.querySelector("#PValue");
const Forecast =document.querySelector(".Forecast");
const search_btn=document.querySelector("#search_city_btn");
const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value
const all_temp_holder=document.querySelectorAll(".temp_val");

/* function to update current data to ui */
function update_current(res){
    if(res.current.cloud==1){
        CValue.textContent=`cloudy`;
    }
    else{CValue.textContent=`clear`;}
    temperature.textContent=`${res.current.temp_c}°C`;
    feelsLike.textContent=`feels like ${res.current.feelslike_c}`;
    HValue.textContent=`${res.current.humidity}%`;
    WValue.textContent=`${res.current.wind_mph} mph`;
    city.textContent=`${res.location.name}`;
    description.textContent=`${res.current.condition.text}`;
    PValue.textContent=`${res.current.pressure_in} in`;
    city.textContent=`${res.location.name},${res.location.region},${res.location.country}`;
    date.textContent=`${res.location.localtime}`;
    wdvalue.textContent=`${res.current.wind_mph}`;
    SRValue.textContent=`${res.forecast.forecastday[0].astro.sunrise}`;
    SSValue.textContent=`${res.forecast.forecastday[0].astro.sunset}`;
   $("#MValue").text(`${res.forecast.forecastday[0].astro.moon_phase}`);
   $("#PrecVal").text(`${res.forecast.forecastday[0].day.totalprecip_in}`);
   UVValue.textContent=`${res.forecast.forecastday[0].day.uv}`;
   $("#AQIValue").text(`${res.forecast.forecastday[0].day.air_quality["us-epa-index"]}`);
   forecast(res.forecast);
}

/* function to fetch data */
function send_name(event){
    showLoading();
    $.ajax({
        type: "post",
        headers:{'X-CSRFToken': csrftoken},
        url: `${window.location.href}search_city/`,
        data: {"location":userLocation.value},
        dataType: "json",
        success: function (response) {
            update_current(response);
            add_local(response.location.name);
            let longitude=response.location.lon;
            let latitude=response.location.lat;
            map.setView([latitude,longitude],5);
            displayMapInfo(latitude,longitude);
        },
        error: function(response) {
            console.log("error",response);
            window.alert(response.responseJSON.error);
        }
    });
    
    setTimeout(hideLoading,400);
};
/* function to update seven day forecast */
function forecast(fr){
    const fr_node_list=document.querySelectorAll(".Forecast h1");
    const fr_node_date=document.querySelectorAll(".Forecast .fore_date .date_holder");
    for(let i=0;i<14;i++){
        let temp=fr.forecastday[i].day.avgtemp_c;
        fr_node_list[i].textContent=`${temp}°C`;
        fr_node_date[i].innerText=`${fr.forecastday[i].date}`;
    }
    
}


/* function to show loading */
function showLoading() {
    console.log("called");
    document.getElementById('loading-dialog').classList.add('active');
}

/* function to hide loading */
function hideLoading() {
    document.getElementById('loading-dialog').classList.remove('active');
}

/* function to add prefered location on local device */
function add_local(loc){
    localStorage.setItem('user_data69',`${loc}`);
}
/* function to convert celceus to farenheight */
function cel_to_far(num,rev=false){
    if(!rev){
        return (num*(9/5))+32;
    }
    else{
        return (num-32)*5/9;
    }
}
/* event listeners */

/* search box activation */
$(userLocation).keyup(function (e) { 
    if(e.keyCode==13){
        $(search_btn).click();
    }
});
search_btn.addEventListener('click',(e)=>{
    if (userLocation.value!=''){
        send_name(e);
        console.log(userLocation.value)
    }
    else{
        console.log("no value");
    }
});

/* degree to celcius */
converter.addEventListener("change",()=>{
    let current_value=converter.value;
    if(current_value=="far"){
        all_temp_holder.forEach(element => {
            element.textContent=`${cel_to_far(parseFloat(element.textContent)).toFixed(1)} F`;
        });
    }
    else{
        all_temp_holder.forEach(element => {
            element.textContent=`${cel_to_far(parseFloat(element.textContent),rev=true).toFixed(1)}°C`;
        });
    }
});