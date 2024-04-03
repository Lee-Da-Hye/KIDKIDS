


let slideWrap = document.querySelector('.slide-wrapper'),
slideContainer = document.querySelector('.slide-container'),
slide = document.querySelectorAll('.slider'),
prev = document.querySelector('.mbanner-prev'),
next = document.querySelector('.mbanner-next'),
slideCount = slide.length,
currentIndex = 0,
slideHeight = 0,
timer,
pagerHTML = '',
pager = document.querySelector('.pagination')
//pagerBtn = document.querySelectorAll('.pagination span');

//높이값
for(let i = 0; i < slideCount; i++){
  if(slideHeight <slide[i].offsetHeight ){
    slideHeight = slide[i].offsetHeight;
    
  }
}
console.log(slideHeight)  
slideWrap.style.height = slideHeight + 'px';
slideContainer.style.height = slideHeight + 'px';

//가로로 배치하기
for(let a = 0; a < slideCount; a++){
  slide[a].style.left = a * 100 + '%';
  pagerHTML += '<span data-idx = "'+ a +'">' + (a+1) + '</span>';
  pager.innerHTML = pagerHTML;
}
let pagerBtn = document.querySelectorAll('.pagination span');

//함수
function goToSlide(idx){
  slideContainer.classList.add('animated')
  slideContainer.style.left = -100 * idx + '%';
  currentIndex = idx;

  //클릭된 그 요소에만 active 추가
  for(let q = 0; q < pagerBtn.length; q++){
    pagerBtn[q].classList.remove('active');
  }
  pagerBtn[idx].classList.add('active');
  
}//goToSlide
goToSlide(0);

//방향
prev.addEventListener('click', ()=>{
  if(currentIndex == 0){
    goToSlide(slideCount - 1)
  }else{
    goToSlide(currentIndex - 1);
  }
})
next.addEventListener('click', ()=>{
  if(currentIndex == slideCount - 1){
    goToSlide(0);
  }else{
    goToSlide(currentIndex + 1);
  }
})

//자동슬라이드


//clearInterval(대상) - 멈추려는 대상
//자동슬라이드 함수
function startAutoSlide(){
  timer = setInterval(function(){
    let nextIdx = (currentIndex + 1) % slideCount;
    goToSlide(nextIdx)
  },4000)
}

startAutoSlide()

function stopAutoSlide(){
  clearInterval(timer)
}

//마우스가 들어오면 할일, 나가면 할일

slideWrap.addEventListener('mouseenter', function(){
  stopAutoSlide()
})

slideWrap.addEventListener('mouseleave', function(){
  startAutoSlide()
})

//pager로 슬라이드 이동하기
for(let x = 0; x < pagerBtn.length; x++){
  pagerBtn[x].addEventListener('click', function(event){
    console.log(event.target)
    //innerText 내용 반환 A.innerText(B)/A.innerText = 'B';
    //innerHTML의 태그를 반환 A.innerHTML / A.innerHTML = '<h2>'


    //let pagerNum =  event.target.getAttribute('data-idx');
    let pagerNum =  event.target.innerText - 1;
    goToSlide(pagerNum);

    
  });
  
}
  // 윈도우 크기 변경 시 슬라이드 높이 다시 설정
  window.addEventListener('resize', function() {
    const wrapper = document.querySelector('.slide-wrapper'); 
    const slideImg = slide[currentIndex].querySelector('img');
    const imgHeight = slideImg.offsetHeight;
    wrapper.style.height = imgHeight + 'px';
});