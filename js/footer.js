document.addEventListener("DOMContentLoaded", function() {
    const selectbox = document.querySelector(".selectbox");
    const infoContainer = document.querySelector(".info-container");
    const titleImg = document.querySelector(".title img");

    // 클릭 이벤트를 추가하여 드롭다운 메뉴를 토글
    selectbox.addEventListener("click", function() {
        infoContainer.classList.toggle("show");
        titleImg.classList.toggle("show");
    });

    // 다른 곳을 클릭했을 때 드롭다운 메뉴가 닫히도록 설정
    document.addEventListener("click", function(event) {
        if (!selectbox.contains(event.target)) {
            infoContainer.classList.remove("show");
            titleImg.classList.remove("show");
        }
    });
});