// Promise의 효능
// 비동기 작업 실행
// 비동기 작업 상태 관리
// 비동기 작업 결과 저장
// 비동기 작업 병렬 실행
// 비동기 작업 다시 실행

// Promise의 3가지 상태
// 대기(pending), 성공(fullfiled), 실패(Rejected)

function add10(num) {
	const promise = new Promise((resolve, reject) => {
		// 비동기 작업 실행하는 함수
		// executor
		setTimeout(() => {
			if (typeof num === 'number') {
				resolve(num + 10);
			} else {
				reject('num이 숫자가 아닙니다');
			}
		}, 2000);
	});

	return promise;
}

// // then 메서드
// // -> 그 후에, 성공했을 때만 호출
// // promise 객체를 그대로 다시 반환함 그래서 .catch 연결 가능
// promise
// 	.then((value) => {
// 		console.log(value);
// 	})
// 	.catch((error) => {
// 		console.log(error);
// 	});

add10(0)
	.then((result) => {
		console.log(result);
		const newP = add10(result);
	})
	.then((result) => {
		console.log(result);
		return add10(result);
	})
	.then((result) => {
		console.log(result);
	})
	.catch((error) => {
		console.log(error);
	});
