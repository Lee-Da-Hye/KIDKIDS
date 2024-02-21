   document.addEventListener("DOMContentLoaded", function() {
    let clickedBtn = null; // 클릭된 버튼을 추적하는 변수

    // Plus 버튼 클릭 시 메뉴 보이기
    let plusBtns = document.querySelectorAll('.plus_btn');
    const menuSet = document.querySelector('#id_my_menu_set');
    const set = document.querySelector('.set img');
    plusBtns.forEach(function(btn, index) {
        btn.addEventListener('click', function(e) {
            menuSet.style.display = 'block';
            clickedBtn = btn; // 클릭된 버튼 업데이트
            clickedBtn.classList.add('hidden'); // 클릭된 버튼 숨기기
            clickedBtn.setAttribute('data-index', index.toString()); // 클릭된 버튼의 인덱스 설정
            e.preventDefault();
        });
    });

    
    //X 누르면 menuSet 숨기기
    set.addEventListener('click', (e)=>{
      menuSet.style.display = 'none';
      e.preventDefault();
    })
    // 메뉴 클릭 시 메뉴 숨기고 버튼 내용 업데이트하기
    const menuItems = document.querySelectorAll('#id_my_menu_set li a');
    menuItems.forEach(function(item) {
        item.addEventListener('click', function(e) {
            let menuName = this.innerText;
            menuSet.style.display = 'none';
            if (clickedBtn && !clickedBtn.innerText.trim()) {
                clickedBtn.innerHTML = menuName;

                // 쿠키에 저장하기
                setCookie('plus_btn_' + clickedBtn.getAttribute('data-index'), menuName, 365);
                clickedBtn.classList.add('hidden'); // 클릭된 버튼 숨기기
                e.preventDefault();
            }
        });
    });

    // 페이지 로드 시 쿠키에서 저장된 메뉴를 불러와 버튼에 적용하기
    for (let i = 0; i < plusBtns.length; i++) {
        const menu = getCookie(`plus_btn_${i}`);
        if (menu) {
            plusBtns[i].innerHTML = menu;
            plusBtns[i].classList.add('hidden'); // 쿠키에 해당 데이터가 있으면 플러스 버튼 숨기기
        }
    }

    // Plus 버튼에 대한 클릭 이벤트 핸들러 추가
    plusBtns.forEach(function(btn, index) {
        // 마우스 호버 이벤트 핸들러 추가
        btn.addEventListener('mouseenter', function() {
            // Plus 버튼에 해당하는 쿠키 값이 있는지 확인
            var menu = getCookie('plus_btn_' + index);
            if (menu) {
                // Plus 버튼 위에 x 아이콘 추가
                btn.innerHTML += '<span class="remove_btn"></span>';
                // x 아이콘에 대한 클릭 이벤트 핸들러 추가
                let removeBtn = btn.querySelector('.remove_btn');
                removeBtn.addEventListener('click', function(e) {
                    e.stopPropagation(); // 부모 요소에 이벤트 전파 방지
                    // 쿠키에서 해당 값 삭제
                    setCookie('plus_btn_' + index, '', -1);
                    // Plus 버튼 내용 비우기
                    btn.innerText = '';
                    // Plus 버튼 표시
                    btn.innerHTML = '<img src="img/bookmark/plus.svg" alt="바로가기 추가">';

                    e.preventDefault();
                });
                
            }
        });

        // 마우스가 벗어났을 때 x 아이콘 제거
        btn.addEventListener('mouseleave', function() {
          let removeBtn = btn.querySelector('.remove_btn');
            if (removeBtn) {
                removeBtn.remove();
            }
        });
    });
});

// 쿠키 설정 함수
function setCookie(name, value, days) {
    var expires = '';
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '')  + expires + '; path=/';
}

// 쿠키 가져오는 함수
function getCookie(name) {
    var nameEQ = name + '=';
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}



//background 변경

const bookmarks = document.querySelectorAll('.bookPos');

bookmarks.forEach(bookmark => {
    const blobs = bookmark.querySelector('.blobs');
    const bookmarkTitle = bookmark.querySelector('.bookmark-title > h2');

    bookmark.addEventListener('mouseenter', function() {
        const bookmarkClass = this.classList[0]; // 첫 번째 클래스 이름을 가져옵니다.

        //bookmarkClass 문자열에서 마지막 문자를 가져오는 것
        blobs.classList.add(`path-hover${bookmarkClass.charAt(bookmarkClass.length - 1)}`);
        bookmarkTitle.style.color = 'white';
    });

    bookmark.addEventListener('mouseleave', function() {
        const bookmarkClass = this.classList[0]; // 첫 번째 클래스 이름을 가져옵니다.

        blobs.classList.remove(`path-hover${bookmarkClass.charAt(bookmarkClass.length - 1)}`);
        bookmarkTitle.style.color = '#5CBC00';
    });
});

/*
const bookmarks = document.querySelectorAll('.bookPos');

bookmarks.forEach(bookmark =>{
    bookmark.addEventListener('mouseenter', function(){
        let blobs = this.querySelector('.blobs');
        let bookmarkTitle = this.querySelector('.bookmark-title > h2');
        
        if(this.classList.contains('bookmark1')){
            blobs.classList.add('path-hover1');
            bookmarkTitle.style.color = 'white';

        }else if(this.classList.contains('bookmark2')){
            blobs.classList.add('path-hover2');
            bookmarkTitle.style.color = 'white';
        }else if(this.classList.contains('bookmark3')){
            blobs.classList.add('path-hover3');
            bookmarkTitle.style.color = 'white';
        }
    });

    bookmark.addEventListener('mouseleave', function(){
        let blobs = this.querySelector('.blobs');
        let bookmarkTitle = this.querySelector('.bookmark-title>h2');
        bookmarkTitle.style.color = '#5CBC00';
        if(this.classList.contains('bookmark1')){
            blobs.classList.remove('path-hover1');
            bookmarkTitle.style.color = '#5CBC00';
        }else if(this.classList.contains('bookmark2')){
            blobs.classList.remove('path-hover2');
            bookmarkTitle.style.color = '#5CBC00';
        }else if(this.classList.contains('bookmark3')){
            blobs.classList.remove('path-hover3');
            bookmarkTitle.style.color = '#5CBC00';
        }
    })
});
*/
