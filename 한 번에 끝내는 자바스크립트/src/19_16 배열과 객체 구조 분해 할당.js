// 📦 배열 구조 분해 할당 - 배열 요소를 개별 변수에 할당
let colors = ['green', 'blue', 'purple'];
let [co1, co2, co3] = colors;

console.log(co1);
console.log(co2);
console.log(co3);

// 🔄 선언과 할당 분리
let a1, a2, a3; //선언 분리 할당
[a1, a2, a3] = ['green', 'blue', 'purple'];

// 📊 배열보다 적은 변수 - 나머지는 무시
let b1, b2;
[b1, b2] = ['green', 'blue', 'purple'];
console.log(b1);
console.log(b2);

// ✨ 기본값 설정 - undefined 대신 기본값 사용
let d1, d2, d3, d4;
[d1, d2, d3, d4 = 'yellow'] = ['green', 'blue', 'purple'];
console.log(d1);
console.log(d2);
console.log(d3);
console.log(d4);

// 🔁 변수 값 교환 - 임시 변수 없이 간단하게
let a = 10;
let b = 5;
[a, b] = [b, a];
console.log(a, b);

// 🎨 객체 구조 분해 할당 예시를 위한 객체
let colorsArr = {
	c1: 'green',
	c2: 'blue',
	c3: 'purple',
};

// 📄 기존 방식 - 일일이 접근해서 할당
let color1 = colorsArr.c1;
let color2 = colorsArr.c2;
let color3 = colorsArr.c3;

console.log(color1, color2, color3);

// 🎯 객체 구조 분해 - 키에서 값을 추출하여 새 변수명으로 할당
let { c1: color4, c2: color5, c3: color6 } = colorsArr;

console.log(color4, color5, color6);

// 📝 기본값을 가진 객체 구조 분해
let colorsArray = {
	col1: 'green',
	col2: 'blue',
	col3: 'purple',
};
// 키와 동일한 변수명 사용 + 기본값 설정
let { col1, col2, col3, col4 = 'yellow' } = colorsArray;
console.log(col1);
console.log(col2);
console.log(col3);
console.log(col4);
