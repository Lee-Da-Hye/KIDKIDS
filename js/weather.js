$(document).ready(function() {
    // 카카오 API 초기화
    Kakao.init('770d3a3d2219a639452acca8e59a62d4');

    // 현재 위치 가져오기
    navigator.geolocation.getCurrentPosition(function(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        // 카카오 맵 생성
        var mapContainer = document.getElementById('map');
        var mapOption = {
            center: new kakao.maps.LatLng(latitude, longitude),
            level: 5
        };
        var map = new kakao.maps.Map(mapContainer, mapOption);

        // 현재 위치에 마커 표시
        var markerPosition = new kakao.maps.LatLng(latitude, longitude);
        var marker = new kakao.maps.Marker({
            position: markerPosition
        });
        marker.setMap(map);

        // 공공데이터 API 호출
        var serviceKey = 'LukiVznMrRVfgr%2FmME%2Flropqo%2Fn39Hq74bNK9gZh1%2B8oW%2BLAi70wMvDqzgXK3cAyZzlWSKjieh68kBnwM8TQoQ%3D%3D';
        var apiUrl = `https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?serviceKey=${serviceKey}&numOfRows=1&pageNo=1&stationName=종로구&dataTerm=DAILY&ver=1.0&returnType=json`;

        $.ajax({
            url: apiUrl,
            success: function(result) {
                const items = result.response.body.items;
                const pm10 = parseInt(items.pm10Value, 10);
                const o3 = parseFloat(items.o3Value);
                const pm10Status = getStatus(pm10);
                const o3Status = getOzoneStatusText(o3);
                updateDustInfo("종로구", pm10Status, o3Status);
                updateStatusImage(pm10Status, o3Status);
            },
            error: function(error) {
                console.log("Error fetching air quality data:", error);
            }
        });
    });

    // 대기질 상태 계산 함수들

    function getStatus(value) {
        const GOOD_THRESHOLD = 30;
        const NORMAL_THRESHOLD = 80;
        if (value <= GOOD_THRESHOLD) {
            return "좋음";
        } else if (value <= NORMAL_THRESHOLD) {
            return "보통";
        } else {
            return "나쁨";
        }
    }

    function getOzoneStatusText(value) {
        const GOOD_THRESHOLD = 0.03;
        const NORMAL_THRESHOLD = 0.09;
        if (value <= GOOD_THRESHOLD) {
            return "좋음";
        } else if (value <= NORMAL_THRESHOLD) {
            return "보통";
        } else {
            return "나쁨";
        }
    }

    // 대기질 정보 업데이트 함수들

    function updateDustInfo(location, pm10, o3) {
        $('#location').text(location);
        $('#dustStatusText').text(pm10);
        $('#ozoneStatusText').text(o3);
    }

    function updateStatusImage(pm10, o3) {
        var imageUrl1 = getStatusImageUrl(pm10);
        var imageUrl2 = getOzoneStatusImageUrl(o3);
        $('#statusImage1').attr('src', imageUrl1);
        $('#statusImage2').attr('src', imageUrl2);
    }

    function getStatusImageUrl(status) {
        if (status === "좋음") {
            return "img/weather/good.png"; // 좋음 상태 이미지
        } else if (status === "보통") {
            return "img/weather/normal.png"; // 보통 상태 이미지
        } else {
            return "img/weather/bad.png"; // 나쁨 상태 이미지
        }
    }

    function getOzoneStatusImageUrl(status) {
        if (status === "좋음") {
            return "img/weather/good.png"; // 오존 좋음 상태 이미지
        } else if (status === "보통") {
            return "img/weather/normal.png"; // 오존 보통 상태 이미지
        } else {
            return "img/weather/bad.png"; // 오존 나쁨 상태 이미지
        }
    }
});
