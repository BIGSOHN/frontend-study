import { useState, useRef } from 'react';

const Register = () => {
	// 비슷한 여러개의 state가 있으면 하나의 객체로 묶어서 통합해서 관리하자.

	// 간단한 회원가입 폼
	// 1. 이름
	// 2. 생년월일
	// 3. 국적
	// 4. 자기소개
	const [input, setInput] = useState({
		name: '',
		birth: '',
		country: '',
		bio: '',
	});

	// 이런거는 리렌더링을 해도 초기화가 되지 않음.
	const countRef = useRef(0);
	const inputRef = useRef();

	const onSubmit = () => {
		if (input.name == '') {
			// 이름을 입력하는 DOM 요소 포커스
			inputRef.current.focus();
		}
	};

	// 여러개의 비슷한 이벤트 핸들러는 통합 이벤트 핸들러로 관리할 수 있다.
	const onChange = (e) => {
		countRef.current++;
		console.log(countRef.current);
		setInput({
			...input,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<div>
			<div>
				<input
					ref={inputRef}
					name='name'
					value={input.name}
					onChange={onChange}
					placeholder={'이름'}
				/>
			</div>
			<div>
				<input
					name='birth'
					value={input.birth}
					onChange={onChange}
					type='date'
				/>
			</div>
			<div>
				<select name='country' value={input.country} onChange={onChange}>
					<option></option>
					<option value='kr'>한국</option>
					<option value='us'>미국</option>
					<option value='uk'>영국</option>
				</select>
			</div>
			<div>
				<textarea name='bio' value={input.bio} onChange={onChange} />
			</div>
			<button onClick={onSubmit}>제출</button>
		</div>
	);
};

export default Register;
