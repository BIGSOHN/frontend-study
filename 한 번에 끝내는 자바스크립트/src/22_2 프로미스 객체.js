// 🎯 Promise 실행자 함수 - 비동기 작업을 수행하고 결과를 리턴
const executor = (resolve, reject) => {
	setTimeout(() => {
		resolve('성공'); // 성공 시 resolve 호출
		// reject("실패"); // 실패 시 reject 호출 (현재는 주석 처리)
	}, 3000);
};

// 🤝 Promise 객체 생성 및 then 메서드 사용
const promise = new Promise(executor);
promise.then(
	(result) => {
		console.log(result); // 성공 시 실행
	},
	(error) => {
		console.log(error); // 실패 시 실행
	}
);

// ⛓️ Promise 체이닝 - then과 catch를 분리하여 사용
const promising = new Promise(executor);
promising
	.then((result) => {
		console.log(result); // 성공 처리
	})
	.catch((error) => {
		console.log(error); // 에러 처리
	});

// 🔥 콜백 지옥(Callback Hell) - 콜백 안에 콜백이 중첩되어 코드가 복잡해지는 현상
const workA = (value, callback) => {
	setTimeout(() => {
		callback(value + 5);
	}, 5000);
};
const workB = (value, callback) => {
	setTimeout(() => {
		callback(value - 3);
	}, 3000);
};
const workC = (value, callback) => {
	setTimeout(() => {
		callback(value + 10);
	}, 10000);
};
// 📏 콜백 지옥의 예시 - 3단계 중첩된 콜백
workA(10, (resA) => {
	console.log(`workA : ${resA}`);
	workB(resA, (resB) => {
		console.log(`workB : ${resB}`);
		workC(resB, (resC) => {
			console.log(`workC : ${resC}`);
		}); // 이렇게 중첩되면 코드 읽기가 어려워짐
	});
});

// 🛠️ Promise로 변환한 비동기 함수들
const workingA = (value) => {
	const promise = new Promise((resolve) => {
		setTimeout(() => {
			resolve(value + 5); // 5초 후 value + 5 반환
		}, 5000);
	});
	return promise;
};

const workingB = (value) => {
	const promise = new Promise((resolve) => {
		setTimeout(() => {
			resolve(value - 3);
		}, 5000);
	});
	return promise;
};
const workingC = (value) => {
	const promise = new Promise((resolve) => {
		setTimeout(() => {
			resolve(value + 10);
		}, 5000);
	});
	return promise;
};

// 🙄 Promise를 사용해도 여전히 중첩된 경우 (잘못된 예시)
workingA(10).then((resA) => {
	console.log(`workingA : ${resA}`);
	workingB(resA).then((resB) => {
		console.log(`workingB : ${resB}`);
		workingC(resA).then((resC) => {
			// 여기서 resA를 사용한 것은 오타
			console.log(`workingC : ${resC}`);
		});
	});
});

// ✨ Promise 체이닝 - 콜백 지옥을 해결하는 우아한 방법
workingA(10)
	.then((resA) => {
		console.log(`workingA : ${resA}`);
		return workingB(resA); // 다음 Promise 반환
	})
	.then((resB) => {
		console.log(`workingB : ${resB}`);
		return workingC(resB); // 다음 Promise 반환
	})
	.then((resC) => {
		console.log(`workingC : ${resC}`);
	});
