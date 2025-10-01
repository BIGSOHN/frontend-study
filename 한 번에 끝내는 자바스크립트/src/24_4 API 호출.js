// 🌐 fetch API - 웹 API를 호출하는 표준 메서드
let response = fetch('https://jsonplaceholder.typicode.com/users') // 가짜 사용자 데이터 API
	.then((res) => console.log(res)) // Response 객체 출력 (데이터 자체가 아님)
	.catch((err) => console.log(err)); // 에러 처리
console.log(response); // Promise 객체가 출력됨

// 🛠️ async/await로 API 데이터 가져오기 (바른 방법)
const getData = async () => {
	try {
		// 1단계: API 호출 (Response 객체 반환)
		let response = await fetch('https://jsonplaceholder.typicode.com/users');
		// 2단계: JSON 데이터로 변환
		let data = await response.json();
		console.log(data); // 실제 사용자 데이터 배열 출력
	} catch (error) {
		console.log(error); // 변수명 수정 (err -> error)
	}
};

getData();
