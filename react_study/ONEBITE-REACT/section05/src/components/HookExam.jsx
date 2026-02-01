import { useState } from 'react';
import useInput from '../hooks/useInput';

// 3가지 hook 관련된 팁
// 1. 함수 컴포넌트, 커스텀 훅 내부에서만 호출 가능
// 2. 조건부로 호출될 수는 없다. 조건부 반복문 내부 사용 x
// 3. 나만의 훅(Custom Hook) 직접 만들 수 있다.
// 맨 앞에 use를 붙이면 custom hook이라고 리액트가 생각

const HookExam = () => {
	const [input, onChange] = useInput();
	return (
		<div>
			<input value={input} onChange={onChange}></input>
		</div>
	);
};

export default HookExam;
