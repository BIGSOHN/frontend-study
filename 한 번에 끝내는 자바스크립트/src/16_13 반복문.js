// 👤 반복문 예시를 위한 새플 객체
let person = {
	name: '홍길동',
	age: 25,
	height: 180,
};

// 🔄 Object.keys()로 키 배열을 만들고 for문으로 순회
let newArray = Object.keys(person);
for (let i = 0; i < newArray.length; i++) {
	let nowKey = newArray[i];
	console.log(`key: ${nowKey}, value: ${person[nowKey]}`);
}

// 📊 Object.entries()로 [key, value] 배열로 만들고 순회
newArray = Object.entries(person);
for (let i = 0; i < newArray.length; i++) {
	console.log(`key : ${newArray[i][0]}, value: ${newArray[i][1]}`);
}

console.log(Object.keys(person));
console.log(Object.values(person));
console.log(Object.entries(person));

let arr = [1, 2, 3, 4, 5];

// 🔁 for...of문 - 배열 요소를 직접 순회
for (let i of arr) {
	console.log(i);
}

// 🔑 for...in문 - 객체의 모든 키를 순회
for (let key in person) {
	console.log(`key ${key}, value : ${person[key]}`);
}
