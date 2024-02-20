const API_KEY = 'LukiVznMrRVfgr%2FmME%2Flropqo%2Fn39Hq74bNK9gZh1%2B8oW%2BLAi70wMvDqzgXK3cAyZzlWSKjieh68kBnwM8TQoQ%3D%3D'
const myArea = document.querySelector('#my_area');
//const area = document.querySelector('#area');
const dustStatus = document.querySelector('#status');
const dustImg = document.querySelector('#dust_img');
const ozone = document.querySelector('#ozone');
const ozoneImg = document.querySelectorAll('#ozone_img');

const getData = ()=>{
  fetch(`https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?serviceKey=${API_KEY}&returnType=json&numOfRows=100&pageNo=1&sidoName=%EC%84%9C%EC%9A%B8&ver=1.0`)
  .then(data => data.json())
  .then(data => {
    console.log(data.response.body.items[0].pm10Value)
  })
}

getData();