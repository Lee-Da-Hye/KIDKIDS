$(document).ready(function() {
  var serviceKey = 'LukiVznMrRVfgr%2FmME%2Flropqo%2Fn39Hq74bNK9gZh1%2B8oW%2BLAi70wMvDqzgXK3cAyZzlWSKjieh68kBnwM8TQoQ%3D%3D';
//   var airUrl = `https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty`;
  const sidoName = "서울";



$.ajax({
    url: `https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?serviceKey=${serviceKey}&returnType=json&numOfRows=1&pageNo=1&sidoName=%EC%84%9C%EC%9A%B8&ver=1.3`,
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