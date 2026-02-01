// 자바스크립트 엔진에는 쓰레드가 1개밖에 없음
console.log(1);
setTimeout(() => {
	console.log(2);
}, 3000); // 숫자값만큼의 ms 경과 후 콜백 함수 내부의 함수 실행
console.log(3);
// 비동기 작업들은 자바스크립트 엔진이 아닌 Web APIs에서 실행됨
// WEB APIs -> 웹 브라우저가 직접 관리하는 영역
