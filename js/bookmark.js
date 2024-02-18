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

                // 로컬 스토리지에 저장하기
                localStorage.setItem('plus_btn_' + clickedBtn.getAttribute('data-index'), menuName);
                clickedBtn.classList.add('hidden'); // 클릭된 버튼 숨기기
                e.preventDefault();
            }
        });
    });

    // 페이지 로드 시 로컬 스토리지에서 저장된 메뉴를 불러와 바로가기 버튼에 적용하기
    for (let i = 0; i < plusBtns.length; i++) {
        const menu = localStorage.getItem(`plus_btn_${i}`);
        if (menu) {
            plusBtns[i].innerHTML = menu;
            plusBtns[i].classList.add('hidden'); // 로컬 스토리지에 해당 데이터가 있으면 플러스 버튼 숨기기
        }
    }
    

    // localStorage에서 데이터를 지웠을 때 플러스 버튼이 다시 나타나도록 함
    window.addEventListener('storage', function(e) {
        if (e.key.startsWith('plus_btn_')) {
            const index = e.key.split('_')[1]; // 인덱스 추출
            const btn = document.querySelector(`.plus_btn[data-index="${index}"]`);
            if (!localStorage.getItem(e.key)) {
                btn.classList.remove('hidden'); // localStorage에서 해당 데이터를 지웠을 때 플러스 버튼 나타내기
            }
        }
    });

    // Plus 버튼에 대한 클릭 이벤트 핸들러 추가
    plusBtns.forEach(function(btn, index) {
        // 마우스 호버 이벤트 핸들러 추가
        btn.addEventListener('mouseenter', function() {
            // Plus 버튼에 해당하는 localStorage 값이 있는지 확인
            var menu = localStorage.getItem('plus_btn_' + index);
            if (menu) {
                // Plus 버튼 위에 x 아이콘 추가
                btn.innerHTML += '<span class="remove_btn"></span>';
                // x 아이콘에 대한 클릭 이벤트 핸들러 추가
                let removeBtn = btn.querySelector('.remove_btn');
                removeBtn.addEventListener('click', function(e) {
                    e.stopPropagation(); // 부모 요소에 이벤트 전파 방지
                    // localStorage에서 해당 값 삭제
                    localStorage.removeItem('plus_btn_' + index);
                    // Plus 버튼 내용 비우기
                    btn.innerText = '';
                    // Plus 버튼 표시
                    btn.innerHTML = '<img src="img/bookmark/plus.svg" alt="바로가기 추가">';

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


/*document.addEventListener("DOMContentLoaded", function() {
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

                // 로컬 스토리지에 저장하기
                localStorage.setItem('plus_btn_' + clickedBtn.getAttribute('data-index'), menuName);
                clickedBtn.classList.add('hidden'); // 클릭된 버튼 숨기기
                e.preventDefault();
            }
        });
    });

    // 페이지 로드 시 로컬 스토리지에서 저장된 메뉴를 불러와 바로가기 버튼에 적용하기
    for (let i = 0; i < plusBtns.length; i++) {
        const menu = localStorage.getItem(`plus_btn_${i}`);
        if (menu) {
            plusBtns[i].innerHTML = menu;
            plusBtns[i].classList.add('hidden'); // 로컬 스토리지에 해당 데이터가 있으면 플러스 버튼 숨기기
        }
    }
    

    // localStorage에서 데이터를 지웠을 때 플러스 버튼이 다시 나타나도록 함
    window.addEventListener('storage', function(e) {
        if (e.key.startsWith('plus_btn_')) {
            const index = e.key.split('_')[1]; // 인덱스 추출
            const btn = document.querySelector(`.plus_btn[data-index="${index}"]`);
            if (!localStorage.getItem(e.key)) {
                btn.classList.remove('hidden'); // localStorage에서 해당 데이터를 지웠을 때 플러스 버튼 나타내기
            }
        }
    });

    // Plus 버튼에 대한 클릭 이벤트 핸들러 추가
    plusBtns.forEach(function(btn, index) {
        // 마우스 호버 이벤트 핸들러 추가
        btn.addEventListener('mouseenter', function() {
            // Plus 버튼에 해당하는 localStorage 값이 있는지 확인
            var menu = localStorage.getItem('plus_btn_' + index);
            if (menu) {
                // Plus 버튼 위에 x 아이콘 추가
                btn.innerHTML += '<span class="remove_btn"></span>';
                // x 아이콘에 대한 클릭 이벤트 핸들러 추가
                let removeBtn = btn.querySelector('.remove_btn');
                removeBtn.addEventListener('click', function(e) {
                    e.stopPropagation(); // 부모 요소에 이벤트 전파 방지
                    // localStorage에서 해당 값 삭제
                    localStorage.removeItem('plus_btn_' + index);
                    // Plus 버튼 내용 비우기
                    btn.innerText = '';
                    // Plus 버튼 표시
                    btn.classList.remove('hidden');
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
*/


