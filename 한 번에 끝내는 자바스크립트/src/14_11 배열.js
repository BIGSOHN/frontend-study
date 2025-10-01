// 🏗️ 배열 생성자 함수로 배열 만들기
let arr1 = new Array(1, 2, 3); // 요소 1, 2, 3을 가진 배열
let arr2 = new Array(3); // 길이가 3인 빈 배열

console.log(arr1);
console.log(arr2);

// 📝 배열 리터럴 (더 간단한 배열 생성 방법)
let arr3 = [1, 2, 3];
let arr4 = [3];
console.log(arr3);
console.log(arr4);

let arr5 = [
	{ name: '홍길동' },
	1,
	'array',
	function () {
		console.log('Hello World!');
	},
	null,
	undefined,
];
console.log(arr5);

// 🔧 배열 요소 접근, 추가, 삭제 방법들
let array1 = [1, 'hello', null];
console.log(array1[0]);
console.log(array1[1]);
console.log(array1[2]);

let fruits = ['apple', 'orange', 'peach'];
fruits.push('grape');
console.log(fruits);
fruits.unshift('pear');
console.log(fruits);

let animal = ['cat', 'dog', 'hamster'];

animal = ['cat', 'rabbit', 'hamster'];
animal[2] = 'parrot';
console.log(animal);

const constAnimal = ['cat', 'dog', 'hamster'];
console.log(constAnimal);
constAnimal[2] = 'parrot';
console.log(constAnimal);

// 🗑️ 배열 요소 삭제 메서드들
console.log('Delete Array');
const colors = ['purple', 'skyblue', 'green', 'blue', 'white', 'orange'];
colors.splice(1, 3);
console.log(colors);
colors.pop();
console.log(colors);
colors.shift();
console.log(colors);

// 📏 배열 길이 확인
console.log('');
console.log(colors.length);
