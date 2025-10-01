// 🎆 Spread 연산자 (...) - 객체나 배열을 펼쳐서 사용
// 🧸 기본 장난감 객체
const toy = {
	type: 'bear',
	price: 15000,
};

// 🔵 기존 객체를 복사하고 새 속성 추가
const blueToy = {
	...toy, // toy 객체의 모든 속성을 펼쳐서 복사
	color: 'blue',
};

const yellowToy = {
	...toy,
	color: 'yellow',
};

console.log(blueToy);
console.log(yellowToy);

// 🌈 배열 합치기 - 여러 배열을 하나로 합침
const color1 = ['red', 'orange', 'yellow'];
const color2 = ['blue', 'navy', 'purple'];

const rainbow = [...color1, 'green', ...color2]; // 배열들을 펼쳐서 합침
console.log(rainbow);

// 📬 Rest 연산자 (...) - 나머지 요소들을 모음
// ⚠️ 주의: rest는 항상 맨 마지막에 위치해야 함

// 🟦 객체에서 Rest 연산자 사용
const blueToy2 = {
	type: 'bear',
	price: 15000,
	color: 'blue',
};

// type만 추출하고 나머지는 rest1 객체에 담기
const { type, ...rest1 } = blueToy2;

console.log(type);
console.log(rest1);

// 🎨 배열에서 Rest 연산자 사용
const color = ['red', 'orange', 'yellow', 'green'];
// 첫 두 요소만 추출하고 나머지는 배열로 담기
const [c1, c2, ...rest2] = color;
console.log(c1, c2);
console.log(rest2);

// 📝 함수 매개변수에서 Rest 사용 - 가변 인수 처리
const printRest = (a, b, ...rest) => {
	console.log(a, b, rest); // rest는 나머지 인수들을 배열로 모음
};

printRest(1, 2, 3, 4, 5, 6); // a=1, b=2, rest=[3,4,5,6]

// 🗋 배열을 개별 인수로 전달 - Spread 연산자 사용
const print = (a, b, c, d, e, f) => {
	console.log(a, b, c, d, e, f);
};

const numbers = [1, 2, 3, 4, 5, 6];
print(...numbers); // 배열을 펼쳐서 개별 인수로 전달

// 🔄 Rest와 Spread 동시 사용 예시
const printNums = (...rest) => {
	console.log(...rest); // rest로 모은 배열을 다시 spread로 펼쳐서 출력
};

const nums = [7, 8, 9, 10, 11, 12];
printNums(...nums); // 배열을 개별 인수로 전달
