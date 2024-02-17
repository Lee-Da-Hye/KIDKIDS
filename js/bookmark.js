let bookmark = document.querySelector('.bookmark-grid-gap')
let plusBtn = document.querySelectorAll('.plus_btn');
const menuSet = document.querySelector('#id_my_menu_set');
let set = document.querySelector('.set')

bookmark.addEventListener('click', (e)=>{
  menuSet.classList.add('active');
  e.preventDefault();
})

set.addEventListener('click', (e)=>{
  menuSet.classList.remove('active');
  e.preventDefault();
})