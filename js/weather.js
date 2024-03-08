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
        var nearbyStation = findNearbyStation(items, latitude, longitude);
        const pm10 = nearbyStation.pm10Value;
        const pm10Status = getStatus(pm10);
        //const pm10 = getDustStatus(items);
        //const o3 = getOzoneStatus(items);
        //const pm10Status = getStatus(pm10);
        //const o3Status = getOzoneStatusText(o3);
       // updateDustInfo(sidoName, pm10Status, o3Status);
       console.log(`근처 측정소: ${nearbyStation.stationName}, 미세먼지 농도: ${pm10Status}`);
       
        // 미세먼지 및 오존 이미지 업데이트
        updateStatusImage(pm10Status, o3Status);
    },
    error: function(error) {
        console.log(error);
    }
});

// function getDustStatus(items) {
//     return items[0].pm10Value;
// }

// function getOzoneStatus(items) {
//     return items[0].o3Value; 
// }

function getStatus(value) {
    if (value <= 30) {
        return "좋음";
    } else if (value <= 80) {
        return "보통";
    } else {
        return "나쁨";
    }
}

// function getOzoneStatusText(value) {
//     if (value <= 0.03) {
//         return "좋음";
//     } else if (value <= 0.09) {
//         return "보통";
//     } else {
//         return "나쁨";
//     }
// }

// function updateDustInfo(location, pm10, o3) {
//     $('#location').text(location);
//     $('#dustStatusText').text(pm10);
//     $('#ozoneStatusText').text(o3);
// }

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

// 사용자 주변의 측정소 찾기
function findNearbyStation(items, userLatitude, userLongitude) {
    var minDistance = Infinity;
    var nearbyStation = null;
    items.forEach(item => {
        var stationLatitude = parseFloat(item.tmX);
        var stationLongitude = parseFloat(item.tmY);
        var distance = calculateDistance(userLatitude, userLongitude, stationLatitude, stationLongitude);
        if (distance < minDistance) {
            minDistance = distance;
            nearbyStation = item;
        }
    });
    return nearbyStation;
}

// 두 지점 사이의 거리 계산
function calculateDistance(lat1, lon1, lat2, lon2) {
    var R = 6371; // 지구의 반경(km)
    var dLat = deg2rad(lat2 - lat1);
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // 두 지점 사이의 거리(km)
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

// 미세먼지 상태 판별 함수
function getStatus(value) {
    if (value <= 30) {
        return "좋음";
    } else if (value <= 80) {
        return "보통";
    } else {
        return "나쁨";
    }
}