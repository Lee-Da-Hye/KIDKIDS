document.addEventListener('DOMContentLoaded', async function() {
    var serviceKey = 'LukiVznMrRVfgr%2FmME%2Flropqo%2Fn39Hq74bNK9gZh1%2B8oW%2BLAi70wMvDqzgXK3cAyZzlWSKjieh68kBnwM8TQoQ%3D%3D';
    var sidoName = "서울";

    try {
        var result = await fetch(`https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?serviceKey=${serviceKey}&returnType=json&numOfRows=1&pageNo=1&sidoName=%EC%84%9C%EC%9A%B8&ver=1.3`);
        if (!result.ok) {
            throw new Error('Network response was not ok');
        }

        var json = await result.json();
        var items = json.response.body.items;

        // 미세먼지 및 오존 농도 표시
        var pm10 = getDustStatus(items);
        var o3 = getOzoneStatus(items);
        var pm10Status = getStatus(pm10);
        var o3Status = getOzoneStatusText(o3);
        updateDustInfo(sidoName, pm10Status, o3Status);

        // 이미지 엘리먼트 생성
        var image1 = document.createElement('img');
        var image2 = document.createElement('img');

        // 이미지 소스 설정
        var imageUrl1 = getStatusImageUrl(pm10Status);
        var imageUrl2 = getOzoneStatusImageUrl(o3Status);
        image1.src = imageUrl1;
        image2.src = imageUrl2;

        // 이미지에 대한 속성 설정 (옵션)
        image1.alt = "미세먼지 상태 이미지";
        image2.alt = "오존 상태 이미지";

        // 이미지 엘리먼트를 HTML에 추가
        document.getElementById('dust-imageContainer').appendChild(image1);
        document.getElementById('ozone-imageContainer').appendChild(image2);

        // 미세먼지 및 오존 이미지 업데이트
        //updateStatusImage(pm10Status, o3Status);
    } catch (error) {
        console.error('Fetch error:', error);
    }

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
        document.getElementById('location').textContent = location;
        document.getElementById('dustStatusText').textContent = pm10;
        document.getElementById('ozoneStatusText').textContent = o3;
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

