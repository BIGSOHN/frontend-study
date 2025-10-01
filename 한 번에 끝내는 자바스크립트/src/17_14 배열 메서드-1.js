// 🔢 기본 for문으로 배열 순회
let arr = [1, 2, 3, 4, 5];

for (let i = 0; i < arr.length; i++) {
	console.log(arr[i]);
}

// 🔄 forEach - 배열 각 요소에 대해 함수 실행
arr.forEach((elm, idx, array) => {
	console.log(`${idx}번째 요소는 ${elm}입니다.`);
	console.log(array);
});

// let newArray = [];

// for (let i = 0; i < arr.length; i++) {
// 	newArray.push(arr[i] * 10);
// }

// 🗺️ map - 각 요소를 변환하여 새로운 배열 생성
let newArray = arr.map((elm) => {
	return elm * 10;
});
console.log(newArray);

// 🎨 배열 요소 찾기 메서드들
let colorsArr = ['green', 'blue', 'purple'];
// 🎯 at() - 마지막 요소 접근 (-1은 마지막)
console.log(colorsArr.at(-1));
// ✅ includes() - 해당 요소가 포함되어 있는지 확인
console.log(colorsArr.includes('blue', 2));
console.log(colorsArr.includes('blue', 1));
console.log(colorsArr.includes('yellow', 1));

// 📍 indexOf() - 요소의 인덱스 찾기 (못 찾으면 -1)
console.log(colorsArr.indexOf('purple'));
console.log(colorsArr.indexOf('yellow'));
console.log(colorsArr.indexOf('blue', 1));

// 📋 객체 배열에서 요소 찾기
let colors = [
	{ id: 1, color: 'green' },
	{ id: 2, color: 'blue' },
	{ id: 3, color: 'purple' },
	{ id: 4, color: 'yellow' },
];

// 🔍 findIndex() - 조건에 맞는 첫 번째 요소의 인덱스 찾기
let idx = colors.findIndex((elm) => elm.color === 'purple');
console.log(idx);
colors.findIndex((elm, idx, array) =>
	console.log(`${idx}번째 값은 id: ${elm.id}, color: ${elm.color}`)
);
colors.findIndex((elm, idx, array) => console.log(array));

// 🎯 find() - 조건에 맞는 첫 번째 요소 반환
let idxFind = colors.find((elm) => elm.color === 'purple');
console.log(idxFind);

console.log('');
// 📄 filter() - 조건에 맞는 모든 요소로 새 배열 생성
let filterArray = colors.filter((elm, idx, array) => elm.id > 1);
console.log(filterArray);

console.log('');
// ✂️ slice() - 배열의 일부를 복사하여 새 배열 생성
let sliceArray = colors.slice(1, 3);
console.log(sliceArray);
