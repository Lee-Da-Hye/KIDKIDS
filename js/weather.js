<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=발급받은 APP KEY를 넣으시면 됩니다."></script>


const API_KEY = 'LukiVznMrRVfgr%2FmME%2Flropqo%2Fn39Hq74bNK9gZh1%2B8oW%2BLAi70wMvDqzgXK3cAyZzlWSKjieh68kBnwM8TQoQ%3D%3D'
const myArea = document.querySelector('#my_area');
//const area = document.querySelector('#area');
const dustStatus = document.querySelector('#status');
const dustImg = document.querySelector('#dust_img');
const ozone = document.querySelector('#ozone');
const ozoneImg = document.querySelectorAll('#ozone_img');




$(document).ready(function(){
  if (navigator.permissions && navigator.permissions.query) {
  navigator.permissions.query({name: 'geolocation'}).then(function (result) {
  if (result.state == 'granted') {
    function success(position) {
        console.log("1");
        
        var geocoder = new kakao.maps.services.Geocoder();
        var lat = position.coords.latitude, // 위도
            lon = position.coords.longitude; // 경도
        var callback = function (result, status) {
            if (status === kakao.maps.services.Status.OK) {
                var my_area = result[0]['address']['region_1depth_name'];
                if (my_area == '경기') {
                    my_area = '경기남부';
                }
                get_area(my_area);
            }
        }
        var coord = new kakao.maps.LatLng(lat, lon);
        geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
  
    }
    navigator.geolocation.getCurrentPosition(success);
    } else{
      get_area('경기남부');
    }
  });
  }
  
  });


  function get_area(area){
    var my_area = area;
    $.ajax({
      url: `https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?serviceKey=${API_KEY }&returnType=json&numOfRows=100&pageNo=1&stationName=%EC%A2%85%EB%A1%9C%EA%B5%AC&dataTerm=DAILY&ver=1.0`,
      success: function (result){
        console.log(result);
        let item = result.response.body.items[3];
        let content = `날짜는 ${item.dataTime} 미세먼지 농도는 ${item.pm10Value} 오존농도는  ${item.o3Value} 입니다.`;
        $('.result').text(content);
      },
  });
    }