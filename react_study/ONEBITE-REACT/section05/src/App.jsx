import './App.css';
import { useState } from 'react';
import Bulb from './components/Bulb';
import Counter from './components/Counter';
import Register from './components/Register';
import HookExam from './components/HookExam';

// 컴퍼넌트를 생성하는 이름의 시작은 대문자여야 함.

// 자식 컴포넌트는 부모의 값이 변경되어서 반영되면 리렌더링을 하게 됨.
// 리액트 리렌더링
//	1. 자신이 관리하는 state 값의 변경
//	2. 자신이 제공받는 props값의 변경
//	3. 부모 컴포넌트가 리렌더링 되면

// 앱 컴퍼넌트 = 최상위 조상. 루트 컴퍼넌트임.

function App() {
	return (
		<>
			<HookExam />
		</>
	);
}

export default App;
