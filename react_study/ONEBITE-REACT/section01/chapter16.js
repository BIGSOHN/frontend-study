// 1. 상수 객체
const animal = {
	type: '고양이',
	name: '나비',
	color: 'black',
};

// 추가, 수정, 삭제 가능
animal.age = 2; // 추가
animal.name = '까망이'; // 수정
delete animal.color; // 삭제

// 2. 메서드
// -> 값이 함수인 프로퍼티를 말함

const person = {
	name: '손승모',
	sayHi() {
		console.log('안녕!');
	},
};

person.sayHi();
person['sayHi']();
