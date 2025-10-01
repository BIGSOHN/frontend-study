// ⏱️ 지연 시간을 만드는 Promise 함수
const delay = (ms) => {
	return new Promise((resolve) => {
		// return 추가 필요
		setTimeout(() => {
			resolve('3초가 지났습니다.');
		}, ms);
	});
};

// 🎆 async/await - Promise를 동기 코드처럼 사용할 수 있게 해주는 문법
// async: 함수를 비동기 함수로 만들고 자동으로 Promise 객체를 반환
// await: async 함수 내부에서 Promise가 완료될 때까지 기다림
// 🚀 async 함수 정의 및 await 사용
const start = async () => {
	try {
		let result = await delay(3000); // 3초간 기다린 후 결과 받음
		console.log(result);
	} catch (error) {
		console.log(error); // Promise가 reject될 경우 에러 처리
	}
};

start();

// 🛠️ 비동기 작업들을 시뮬레이션하는 Promise 함수들
const workA = () => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve('workA'); // 5초 후 완료
		}, 5000);
	});
};
const workB = () => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve('workB'); // 3초 후 완료
		}, 3000);
	});
};
const workC = () => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve('workC'); // 10초 후 완료
		}, 10000);
	});
};

// 🔄 async/await로 순차 및 병렬 실행 비교
const starting = async () => {
	try {
		// 🐌 순차 실행 - 각 작업이 끝날 때까지 기다림 (18초 소요)
		let resultA = await workA(); // 5초 기다림
		let resultB = await workB(); // 3초 기다림
		let resultC = await workC(); // 10초 기다림
		console.log(resultA);
		console.log(resultB);
		console.log(resultC);

		// 🚀 병렬 실행 - 모든 작업을 동시에 시작 (10초만 소요)
		// Promise.all: 모든 Promise가 성공해야 성공, 하나라도 실패하면 전체 실패
		let results = await Promise.all([workA(), workB(), workC()]);
		results.forEach((res) => console.log(res));
	} catch (error) {
		console.log(error);
	}
};
