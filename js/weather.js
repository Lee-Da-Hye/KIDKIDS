$(document).ready(function() {
    Kakao.init('770d3a3d2219a639452acca8e59a62d4');
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

  var serviceKey = 'LukiVznMrRVfgr%2FmME%2Flropqo%2Fn39Hq74bNK9gZh1%2B8oW%2BLAi70wMvDqzgXK3cAyZzlWSKjieh68kBnwM8TQoQ%3D%3D';
//   var airUrl = `https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty`;
  const sidoName = "전국";



$.ajax({
    url: `https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?serviceKey=${serviceKey}&json&numOfRows=100&pageNo=1&sidoName=전국&ver=1.3`,
    //method: 'GET',
    //data: params,
    success: function(result) {
        console.log(result)
        const items = result.response.body.items;

        // 미세먼지 및 오존 농도 표시
        const pm10 = getDustStatus(items);
        const o3 = getOzoneStatus(items);
        const pm10Status = getStatus(pm10);
        const o3Status = getOzoneStatusText(o3);
        updateDustInfo(sidoName, pm10Status, o3Status);
       
        // 미세먼지 및 오존 이미지 업데이트
        updateStatusImage(pm10Status, o3Status);
    },
    error: function(error) {
        console.log(error);
    }
});

function getDustStatus(items) {
    return items[0].pm10Value;
}

function getOzoneStatus(items) {
    return items[0].o3Value; 
}

function getStatus(value) {
    if (value <= 30) {
        return "좋음";
    } else if (value <= 80) {
        return "보통";
    } else {
        return "나쁨";
    }
}

function getOzoneStatusText(value) {
    if (value <= 0.03) {
        return "좋음";
    } else if (value <= 0.09) {
        return "보통";
    } else {
        return "나쁨";
    }
}

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
})
});