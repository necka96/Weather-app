window.addEventListener("load", ()=>{
 let long;
 let lat;
 let description1 = document.querySelector(".description")
 let tempDeg =document.querySelector(".temperature-degree")
 let location = document.querySelector(".location-city")
 let icon = document.querySelector(".icon")
 const alert = document.getElementById("alert")
 const degreeSec = document.querySelector(".degree-section")
 const span = degreeSec.querySelector("span")
 if(navigator.geolocation){
  navigator.geolocation.getCurrentPosition(position => {
   alert.style.display="none"
   long = position.coords.longitude
   lat =position.coords.latitude
  //  const proxy = "https://cors-anywhere.herokuapp.com/"
   const api = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${long}&key=ccda3705afc44becb4a9602bd0ced898&include=minutely`
  
   console.log(api);
   fetch(api)
   .then(response => {
    console.log("Response:", response);
    return response.json()
   })
   .then(data => {
    console.log(data.data[0]);
    const temp =  data.data[0].temp
    const trueTemp = Math.floor(temp)
    const city = data.data[0].city_name
    const {code, description} = data.data[0].weather
    tempDeg.textContent = trueTemp
    location.textContent = city
    description1.textContent = description
    if(code < 250){
     icon.src = "./icon/animated/thunder.svg"
    }else if (code < 350){
     icon.src = "./icon/animated/rainy-2.svg"
    }else if (code < 550){
     icon.src = "./icon/animated/rainy-7.svg"
    }else if (code < 650){
     icon.src = "./icon/animated/snowy-6.svg"
    }else if (code < 800){
     icon.src = "./icon/animated/cloudy.svg"
    }else if (code >= 800){
     icon.src = "./icon/animated/day.svg"
    }
    let farenhajt = (temp + 273)
   degreeSec.addEventListener("click",()=>{
     if(span.textContent === "C"){
      span.textContent = "F"
      tempDeg.textContent =farenhajt
     }else{
      span.textContent = "C"
      tempDeg.textContent =trueTemp
     }
   })
   })
 
  })
  
 }

});