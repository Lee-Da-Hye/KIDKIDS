
var swiper = new Swiper(".recom-tab-Swiper", {
  slidesPerView: "auto",
  spaceBetween: 8,
  pagination: {
    el: ".swiper-pagination",
    type: "progressbar",
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

});
var swiper2 = new Swiper(".product-tab-Swiper", {
  slidesPerView: "auto",
  spaceBetween: 8,
  // pagination: {
  //   el: ".swiper-pagination",
  //   type: "progressbar",
  // },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

});
var swiper3 = new Swiper(".more-services-Swiper", {
  slidesPerView: "auto",
  spaceBetween: 8,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

});



//슬라이드

// var text = []
// const bannerSlider = new Swiper('.banner-swiper', {
//   autoplay: {
//     delay: 3000,
//     pauseOnMouseEnter:true,
//   },
//   loop:true,
//   navigation: {
//     nextEl: '.swiper-button-next',
//     prevEl: '.swiper-button-prev',
//     },
//     pagination: {
//       el: '.swiper-pagination',
//       type: 'bullets',
//       clickable:true,
//     },
// })

// let winWidth=$(window).innerWidth();
// $('.slider img').width(winWidth+(winWidth*0.3));