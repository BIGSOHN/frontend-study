import { useState } from 'react';

// state는 2개로 이루어져있음 첫번째는 값 두번째는 변경하는 함수
const Bulb = () => {
	// let light 한다고 해도 리렌더링이 되지 않음
	const [light, setLight] = useState('OFF');
	return (
		<div>
			{light === 'ON' ? (
				<h1 style={{ backgroundColor: 'orange' }}>ON</h1>
			) : (
				<h1 style={{ backgroundColor: 'gray' }}>OFF</h1>
			)}
			<button
				onClick={() => {
					setLight(light === 'ON' ? 'OFF' : 'ON');
				}}
			>
				{light === 'ON' ? '끄기' : '켜기'}
			</button>
			;
		</div>
	);
};

export default Bulb;
