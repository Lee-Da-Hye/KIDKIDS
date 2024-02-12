const API_KEY = '42d5026beb33086787247c76ab037104'
const country = document.querySelector('#country');
const area = document.querySelector('#area');
const currentTemp = document.querySelector('#currentTemp');
const currentDescription = document.querySelector('#currentDescription');
const  maxTemp = document.querySelector('#maxTemp');
const minTemp = document.querySelector('#minTemp');
const citybtn = document.querySelectorAll('.citybtn');

citybtn.forEach((ele)=>{
  ele.addEventListener('click', (e)=> {
    getCityWeather(e)})
}
)

//현재 위치를 받아와서 lat lon 값을 넘기면서 getCurrentWeather 호출
const getCurrentLocation = ()=>{
  navigator.geolocation.getCurrentPosition((position)=>{
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    getCurrentWeather(lat,lon)
  })
}
//requestGeolocationPermission()

//http://api.openweathermap.org/data/2.5/air_pollution?lat={lat}&lon={lon}&appid={API key}

const getCurrentWeather = async(lat,lon) =>{
  let url = new URL(`https://api.openweathermap.org/data/2.5/air_pollution?lat =${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`);
  let response = await fetch(url);
  let data = await response.json();
  render(data);

}
const getCityWeather = async(e)=>{

  let city = e.target.dataset.cityname;
  //url ''이렇게 하면 객체로 못 받음. 그래서 new URL로 만들어줘야함.
  //d위도 경도 대신 시티이름 적고 시티 이름 누를 때마다 다르게 하기 위해 html에 데이터 넣어놓음. 첫글자만 대문자로 적으면 됨. 
  let url = new URL(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=kr`)

  let response = await fetch(url);
  let data = await response.json();
  console.log(data)
  render(data)
  
}

const render = (data)=>{
  //이름.키이름.
  country.innerText = data.sys.country;
  currentDescription.innerText = data.weather[0].description;
  area.innerText = data.name;
  currentTemp.innerText =data.main.temp;
  maxTemp.innerText = data.main.temp_max;
  minTemp.innerText = data.main.temp_min;
}
