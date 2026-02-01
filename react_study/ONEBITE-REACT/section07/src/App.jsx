import './App.css';
import Viewer from './components/Viewer';
import Controller from './components/Controller';
import { useState, useEffect, useRef } from 'react';
import Even from './components/Even';

function App() {
	const [count, setCount] = useState(0);
	const [input, setInput] = useState('');

	const isMount = useRef(false);

	// 의존성 배열
	// dependency array
	// deps

	// 리액트의 state는 비동기로 업데이트
	// 변경된 state 값을 바로 활용해서 side effect로 하려면 useEffect를 사용해야 한다.

	// 라이프 사이클
	// 1. 마운트 : 탄생 -> deps가 빈배열이면 됨
	useEffect(() => {
		console.log('mount');
	}, []);
	// 2. 업데이트 : 변화, 리렌더링 -> deps 생략
	useEffect(() => {
		if (!isMount.current) {
			isMount.current = true;
			return;
		}
		console.log('update');
	});
	// 3. 언마운트 : 죽음

	const onClickButton = (value) => {
		setCount(count + value);
	};
	return (
		<div className='App'>
			<h1>Simple Counter</h1>
			<section>
				<input
					value={input}
					onChange={(e) => {
						setInput(e.target.value);
					}}
				></input>
			</section>
			<section>
				<Viewer count={count} />
				{count % 2 === 0 ? <Even /> : null}
			</section>
			<section>
				<Controller onClickButton={onClickButton} />
			</section>
		</div>
	);
}

export default App;
