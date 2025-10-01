// 🔰 객체 생성 방법 - 생성자 함수와 리터럴

let obj = new Object();
console.log(obj);

let obj1 = {};
console.log(obj1);

// 🔑 객체 프로퍼티 정의 (key-value 쌍)

let book = {
	title: '자바스크립트 첫걸음',
	author: '김효빈',
	category: '자바스크립트',
	year: undefined,
	color: function () {
		console.log('orange');
	},
};

// 📖 객체 프로퍼티에 접근하는 방법

let car = {
	name: '붕붕',
	model: 'morning',
	color: 'black',
};

// 📍 점 표기법으로 접근
console.log(car.name);

// 📦 괄호 표기법으로 접근 (동적 키 접근 가능)
console.log(car['color']);

const getValue = (key) => {
	console.log(car[key]);
};

getValue('color');

// ✏️ 객체 프로퍼티 추가, 수정, 삭제하기
let cat = {
	age: 2,
};

cat.name = '야옹이';
cat['color'] = 'white';
console.log(cat);

let modifyCat = {
	age: 2,
	name: '야옹이',
	color: 'white',
};

modifyCat.name = '옹이';
modifyCat['color'] = 'yellow';

console.log(modifyCat);

delete cat.color;
delete cat['age'];
console.log(cat);

const person = {
	name: '홍길동',
	age: 23,
	print: function () {
		console.log(`제 이름은 ${this.name}입니다.`);
	},
};

person.print();
person['print']();
