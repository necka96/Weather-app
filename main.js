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
   const proxy = "https://cors-anywhere.herokuapp.com/"
   const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=aa7a74c0b91bf54da9fcc12f098b2f5a`
   console.log(api);
   fetch(api)
   .then(response => {
    console.log("Response:", response);
    return response.json()
   })
   .then(data => {
    console.log(data.weather);
    const {temp} =  data.main
    const city = data.name
    const {id, description} = data.weather[0]
    tempDeg.textContent = temp
    location.textContent = city
    description1.textContent = description
    if(id < 250){
     icon.src = "./icon/animated/thunder.svg"
    }else if (id < 350){
     icon.src = "./icon/animated/rainy-2.svg"
    }else if (id < 550){
     icon.src = "./icon/animated/rainy-7.svg"
    }else if (id < 650){
     icon.src = "./icon/animated/snowy-6.svg"
    }else if (id < 800){
     icon.src = "./icon/animated/cloudy.svg"
    }else if (id === 800){
     icon.src = "./icon/animated/day.svg"
    }
    let celsius = (temp - 273)
   degreeSec.addEventListener("click",()=>{
     if(span.textContent === "F"){
      span.textContent = "C"
       tempDeg.textContent =Math.round(celsius)
     }else{
      span.textContent = "F"
      tempDeg.textContent =temp
     }
   })
   })
 
  })
  
 }

});