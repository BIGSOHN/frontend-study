// 일반 함수를 사용한 Counter - this 바인딩 문제 발생
function Counter1() {
	this.count = 0; // Counter1 인스턴스의 count 속성 초기화
	setInterval(function () {
		// setInterval의 콜백함수는 일반 함수로 호출됨
		this.count++; // 여기서 this는 window 객체를 가리킴 (의도하지 않은 동작)
		console.log(this.count); // NaN 출력 (window.count는 undefined)
	}, 2000);
}

const counter1 = new Counter1(); // Counter1 인스턴스 생성

// 화살표 함수를 사용한 Counter - this 바인딩 문제 해결
function Counter() {
	this.count = 0; // Counter 인스턴스의 count 속성 초기화
	setInterval(() => {
		// 화살표 함수는 상위 스코프의 this를 그대로 사용 (렉시컬 바인딩)
		this.count++; // 여기서 this는 Counter 인스턴스를 가리킴 (의도한 동작)
		console.log(this.count); // 1, 2, 3... 순서대로 출력
	}, 2000);
}

const counter = new Counter(); // Counter 인스턴스 생성
