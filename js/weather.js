$(document).ready(function() {
    // 사용자의 현재 위치 가져오기
    navigator.geolocation.getCurrentPosition(function(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        // 미세먼지 데이터 가져오기
        getDustData(latitude, longitude);
    });

    // 미세먼지 데이터 가져오는 함수
    function getDustData(latitude, longitude) {
        var serviceKey = 'LukiVznMrRVfgr%2FmME%2Flropqo%2Fn39Hq74bNK9gZh1%2B8oW%2BLAi70wMvDqzgXK3cAyZzlWSKjieh68kBnwM8TQoQ%3D%3D';
        var sidoName = "전국";

        $.ajax({
            url: `https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?serviceKey=${serviceKey}&json&numOfRows=100&pageNo=1&${sidoName}&ver=1.3`,

            success: function(result) {
                console.log(result);
                // 가져온 데이터를 화면에 표시하는 함수 호출
                displayDustInfo(latitude, longitude, result);
            },
            error: function(error) {
                console.log(error);
            }
        });
    }

    // 미세먼지 정보를 화면에 표시하는 함수
    function displayDustInfo(latitude, longitude, dustData) {
        // 미세먼지 정보를 이용하여 지도에 마커 표시 등의 작업 수행
        // 예를 들어, 아래와 같이 마커를 추가하고 정보를 표시할 수 있습니다.
        var mapContainer = document.getElementById('map');
        var mapOption = {
            center: new kakao.maps.LatLng(latitude, longitude),
            level: 5
        };
        var map = new kakao.maps.Map(mapContainer, mapOption);

        // 마커 추가
        var markerPosition = new kakao.maps.LatLng(latitude, longitude);
        var marker = new kakao.maps.Marker({
            position: markerPosition
        });
        marker.setMap(map);

        // 미세먼지 정보 표시
        var pm10 = dustData.response.body.items.pm10Value;
        var pm10Status = getStatus(pm10);
        $('#dustStatusText').text(pm10Status);
        // 미세먼지 상태에 따라 이미지 업데이트 등의 작업 수행
        updateStatusImage(pm10Status);
    }

    // 미세먼지 상태를 판별하는 함수
    function getStatus(value) {
        if (value <= 30) {
            return "좋음";
        } else if (value <= 80) {
            return "보통";
        } else {
            return "나쁨";
        }
    }

    // 이미지 업데이트 함수
    function updateStatusImage(pm10Status) {
        var imageUrl = getStatusImageUrl(pm10Status);
        $('#statusImage').attr('src', imageUrl);
    }

    // 미세먼지 상태에 따른 이미지 URL 반환 함수
    function getStatusImageUrl(status) {
        if (status === "좋음") {
            return "img/weather/good.png";
        } else if (status === "보통") {
            return "img/weather/normal.png";
        } else {
            return "img/weather/bad.png";
        }
    }
});