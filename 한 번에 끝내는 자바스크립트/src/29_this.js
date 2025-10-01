// 전역 공간에서의 this - window 객체 참조
console.log(this);

// 일반 함수에서의 this - window 객체 참조 (strict mode에서는 undefined)
function func() {
	console.log(this);
}
func();

// 메서드에서의 this - 호출한 객체 참조
const cafe = {
	brand: '이디야',
	menu: '아메리카노',
	print: function () {
		console.log(this); // cafe 객체 참조
	},

	newCafe: {
		brand: '이디야',
		menu: '라떼',
		print: function () {
			console.log(this); // newCafe 객체 참조
		},
	},
};

cafe.print(); // cafe 객체의 메서드로 호출
cafe.newCafe.print(); // newCafe 객체의 메서드로 호출

// 메서드를 변수에 할당하여 호출
const mCafe = cafe.print;
mCafe(); // 전역 공간에서 일반 함수로 호출됨 - window 객체 참조

// 생성자 함수에서의 this - 새로 생성되는 인스턴스 객체 참조
function Cafe(menu) {
	console.log(this); // 새로 생성되는 인스턴스 객체
	this.menu = menu;
}

let myCafe = new Cafe('latte'); // new 키워드로 생성자 함수 호출
console.log(myCafe); // 생성된 인스턴스 확인
let yourCafe = Cafe('americano'); // new 없이 호출하면 window 객체에 menu 속성 추가
console.log(yourCafe); // undefined 반환

// 콜백함수에서의 this - 호출 방식에 따라 달라짐
const cafe2 = {
	brand: '이디야',
	menu: '',
	setMenu: function (menu) {
		this.menu = menu; // 콜백으로 호출되면 window 객체 참조
	},
};

function getMenu(menu, callback) {
	callback(menu); // 일반 함수로 호출
}

getMenu('핫초코', cafe2.setMenu); // setMenu가 콜백으로 전달되어 this는 window

console.log(cafe2); // menu가 설정되지 않음

// 화살표 함수에서의 this - 상위 스코프의 this 참조 (렉시컬 바인딩)
const cafe3 = {
	brand: '이디야',
	menu: '아메리카노',
	print: () => {
		console.log(this); // 전역 스코프의 this (window) 참조
	},
};

cafe3.print(); // 화살표 함수는 호출 방식과 관계없이 정의된 위치의 this 사용
