// select 요소 선택하기
const $fruitSelect = document.getElementById('fruitSelect');

// select 값 변경 이벤트 리스너 추가
$fruitSelect.addEventListener('change', (event) => {
	console.log(event.target.value); // 선택된 값 출력
});

// select 옵션 제거하기 (인덱스 1번 옵션 제거)
$fruitSelect.remove(1);

// form 입력 요소들 선택하기
const $userName = document.getElementById('userName');
const $password = document.getElementById('password');

// 로그인 버튼 선택 및 클릭 이벤트 리스너 추가
const $loginBtn = document.querySelector('button');
$loginBtn.addEventListener('click', () => {
	console.log($userName.value); // 사용자명 값 출력
	console.log($password.value); // 비밀번호 값 출력
});

// input 값 설정하기
$userName.value = '아무개';

// input 값 변경 실시간 감지
$password.addEventListener('input', (event) => {
	console.log(event.target.value); // 입력되는 값 실시간 출력
});
