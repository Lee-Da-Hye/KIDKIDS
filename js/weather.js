$(document).ready(function() {
    var serviceKey = 'LukiVznMrRVfgr%2FmME%2Flropqo%2Fn39Hq74bNK9gZh1%2B8oW%2BLAi70wMvDqzgXK3cAyZzlWSKjieh68kBnwM8TQoQ%3D%3D';
    var airUrl = `https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty`;
    const sidoName = "서울";

    let params = {
      serviceKey: serviceKey,
      numOfRows: '1',
      pageNo: '1',
      dataTerm: 'MONTH',
      ver: '1.3',
      stationName: '마포구',
      sidoName: sidoName,
      returnType: 'json'
  };

  $.ajax({
      url: airUrl,
      method: 'GET',
      data: params,
      success: function(response) {
          const items = response.response.body.items;
          // 미세먼지 및 오존 농도 표시
          const pm10 = getDustStatus(items);
          const o3 = getOzoneStatus(items);
          updateDustInfo(sidoName,pm10, o3);
          // 미세먼지 및 오존 이미지 업데이트
          updateStatusImage(pm10, o3);
      },
      error: function(error) {
          console.log(error);
      }
  });
});

function getDustStatus(items) {
  return items[0].pm10Value; // 단위: 마이크로그램/미터³
}

function getOzoneStatus(items) {
  return items[0].o3Value; // 단위: 마이크로그램/미터³
}

function updateDustInfo(location, pm10, o3) {
  $('#location').text('지역: ' + location);
  $('#dustStatusText').text('미세먼지 농도: ' + pm10 + ' μg/m³');
  $('#ozoneStatusText').text('오존 농도: ' + o3 + ' μg/m³');
}

function updateStatusImage(pm10, o3) {
  var imageUrl1 = getImageUrl(pm10);
  var imageUrl2 = getImageUrl(o3);
  $('#statusImage1').attr('src', imageUrl1);
  $('#statusImage2').attr('src', imageUrl2);
}

function getImageUrl(value) {
  if (value <= 30) {
      return "img/weather/good.png"; // 좋음 상태 이미지
  } else if (value <= 80) {
      return "img/weather/normal.png"; // 보통 상태 이미지
  } else {
      return "img/weather/bad.png"; // 나쁨 상태 이미지
  }
}


