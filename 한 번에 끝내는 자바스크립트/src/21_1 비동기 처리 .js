// 🔄 동기 처리 - 코드가 순차적으로 실행됨
const workA = () => {
	console.log('workA');
};
const workB = () => {
	console.log('workB');
};
const workC = () => {
	console.log('workC');
};

workA();
workB();
workC();

// ⏰ 비동기 처리 - 시간이 걸리는 작업을 기다리지 않고 다음 코드 실행
// 🕰️ setTimeout - 3초 후에 실행되는 비동기 작업
setTimeout(() => {
	console.log('비동기');
	console.log('종료');
}, 3000);

// 🔄 콜백 함수 - 비동기 작업 완료 후 실행할 함수를 전달
const work = (callback) => {
	setTimeout(() => {
		console.log('비동기');
		// callback(); // 이 줄을 넣어야 콜백이 실행됨
	}, 3000);
};

work(() => {
	console.log('종료'); // 이 콜백은 실행되지 않음
});

// 🏃‍♂️ 여러 비동기 작업의 실행 순서 비교
const workingA = () => {
	setTimeout(() => {
		console.log('workingA'); // 5초 후 실행
	}, 5000);
};

const workingB = () => {
	setTimeout(() => {
		console.log('workingB'); // 3초 후 실행 (두 번째로 출력)
	}, 3000);
};

const workingC = () => {
	setTimeout(() => {
		console.log('workingC'); // 10초 후 실행 (마지막에 출력)
	}, 10000);
};
const workingD = () => {
	console.log('workingD'); // 즉시 실행 (동기, 가장 먼저 출력)
};

// 실행 순서: workingD(0초) -> workingB(3초) -> workingA(5초) -> workingC(10초)
workingA();
workingB();
workingC();
workingD();
