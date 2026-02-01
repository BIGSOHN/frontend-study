// 5가지 배열 변형 메서드
// 1. filter
// 기존 배열에서 조건을 만족ㅎ라는 요소들만 필터링하여 새로운 배열로 반환

let arr1 = [
	{ name: '손승모', hobby: '요리' },
	{ name: '홍길동', hobby: '독서' },
	{ name: '김철수', hobby: '요리' },
];

const cookingPeople = arr1.filter((item) => {
	if (item.hobby === '테니스') return true;
});

// 2. map
// 배열의 모든 요소를 순회하면서, 각각 콜백함수를 실행하고 그 결과값들을 모아서 새로운 배열로 반환
let arr2 = [1, 2, 3];
const mapResult1 = arr2.map((item, idx, arr) => {
	return item * 2;
});

let names = arr1.map((item) => item.name);

// 3. sort
// 배열을 사전순으로 정렬하는 메서드(사전 순이기 때문에 int의 경우는 제대로 정렬 x 그래서 콜백함수 이용)
// 원본 배열 자체를 바꿈
let arr3 = [10, 3, 5];
arr3.sort((a, b) => {
	// 오름차순으로 정렬하려면
	if (a > b) {
		// b가 a 앞에 와라
		return 1;
	} else if (a < b) {
		// a가 b 앞에 와라
		return -1;
	} else {
		// 두 값의 자리를 바꾸지 마라
		return 0;
	}
});

// 4. toSorted (가장 최근에 추가된 최신 함수)
// 정렬된 새로운 배열을 반환하는 메서드
let arr5 = ['c', 'a', 'b'];
const sorted = arr5.toSorted();

// 5. join
// 배열의 모든 요소를 하나의 문자열로 합쳐서 반환하는 메서드
let arr6 = ['hi', "i'm", 'sohn'];
const joined = arr6.join();
