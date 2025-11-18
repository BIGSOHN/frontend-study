// 1. 함수 표현식 -> 호이스팅의 대상이 되지 않음.

function funcA() {
	// console.log('funcA');
}

let varA = funcA;
varA();

let varB = function () {
	// console.log('funcB');
}; // 익명 함수

varB();

// 2. 화살표 함수
let varC = (value) => {
	return value + 1;
};

console.log(varC(10));
