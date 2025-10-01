// 🏗️ 생성자 함수 정의 - 객체를 체계적으로 만드는 함수
function Person(name, age, job) {
	// this 키워드로 인스턴스 프로퍼티 설정
	this.name = name;
	this.age = age;
	this.job = job;
	this.sayHi = function () {
		console.log('...');
	};
}

// 👥 new 키워드로 인스턴스 생성
const person1 = new Person('홍길동', 30, 'Manager');
