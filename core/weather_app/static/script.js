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

/* function to update ui */
function update(res){
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
   
}
/* function to fetch data */
function send_name(event){
    $.ajax({
        type: "post",
        headers:{'X-CSRFToken': csrftoken},
        url: `${window.location.href}search_city/`,
        data: {"location":userLocation.value},
        dataType: "json",
        success: function (response) {
            update(response);
            fetch_forecast(response.location.name,7);
        },
        error: function(response) {
            console.log("error",response);
            window.alert(response.responseJSON.error);
        }
    });
};
function fetch_forecast(loc,days){

}
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
