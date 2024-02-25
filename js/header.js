const searchInput = document.querySelector('#searchInput')
const searchResult = document.querySelector('.search-box-result')
const btnClose = document.querySelector('.btn-close')

//검색 입력란 클릭 이벤트 핸들러
searchInput.addEventListener('click', ()=>{
  //활성 클래스 추가 및 검색 결과 보이기
  searchInput.classList.add('active')
  searchResult.style.display = 'block';
})

//닫기 버튼 클릭 이벤트 핸들러
btnClose.addEventListener('click', ()=>{
  //활성 클래스 제거 및 검색 결과 숨기기
  searchInput.classList.remove('active');
  searchResult.style.display = 'none';
})
// 다른 곳을 클릭했을 때 닫히도록 설정
document.addEventListener("click", function(event) {
  if (!searchInput.contains(event.target)) {
    searchInput.classList.remove('active');
    searchResult.style.display = 'none';
  }
});

const gnb = document.querySelector('.gnb');
const depth1 = gnb.querySelectorAll('li'); //  gnb 하위의 li 요소를 모두 찾음
const dep2Link = document.querySelectorAll('.dep2-links-title');

depth1.forEach(function(ele){
  // 마우스가 li 요소 위에 올려졌을때 
  ele.addEventListener('mouseenter', function(){
    let depth2 = this.querySelector('.dep2-bg-box')
    if(depth2)depth2.style.display = 'block';
  })
   // 마우스가 li 요소를 벗어났을 떄 
   ele.addEventListener('mouseleave', function(){
    let depth2 = this.querySelector('.dep2-bg-box')
    if(depth2)depth2.style.display = 'none';
   })
})

dep2Link.forEach(function(ele){

  ele.addEventListener('mouseenter', function(){
    let dep2LinkTitle = this.querySelector('.dep2-links-title > a');
    dep2LinkTitle.classList.add('active')
  })
  ele.addEventListener('mouseleave', function(){
    let dep2LinkTitle = this.querySelector('.dep2-links-title > a');
    dep2LinkTitle.classList.remove('active')
  })
})


//섹션 1의 슬라이더 bxslider
$(document).ready(function(){
  $(".sliderAd").bxSlider({
    auto: true,
    mode:'fade',
    pager: false,
    autoControls: false,
    autoControlsCombine: true,
    autoHover:true,
  
  
    onSlideBefore:function($slideElement, oldIndex, newIndex){
      //슬라이드 넘어가기 직전
      $slideElement.children('img').removeClass('on')
    },
    onSlideAfter:function($slideElement, oldIndex, newIndex){
      $slideElement.children('img').addClass('on');
      $('.count').text(newIndex+1);
    },
  })
});













/* 데스트탑 gnb 처리
const gnb = document.querySelector(".gnb");
const depth1 = gnb.querySelectorAll("li"); //  gnb 하위의 li 요소를 모두 찾음
//const depth1 =  document.querySelectorAll('.gnb>li');

depth1.forEach(function(ele){
  // 마우스가 li 요소 위에 올려졌을때 
  ele.addEventListener("mouseenter",function(){
    //현재li 요소의 자식 중에 클래스가 dep2-bg-box인요소를 찾아서 보이게 한다. 
    let depth2 = this.querySelector(".dep2-bg-box");
    if(depth2)depth2.style.display = "block";
  })
  // 마우스가 li 요소를 벗어났을 떄 
  ele.addEventListener("mouseleave",function(){
    //현재li 요소의 자식 중에 클래스가 dep2-bg-box인요소를 찾아서 숨김
    let depth2 = this.querySelector(".dep2-bg-box");
    if(depth2)depth2.style.display = "none";
  })

}) */