const Button = ({ children, text, color = 'black' }) => {
	// 이벤트 객체
	// 합성 이벤트 : 모든 웹 브라우저의 이벤트 객체를 하나로 통일한 형태
	const onClickButton = (e) => {
		console.log(e);
		console.log(text);
	};

	return (
		<button
			// // 이벤트 핸들러
			onClick={onClickButton}
			// onMouseEnter={onClickButton}
			style={{ color: color }}
		>
			{text} - {color.toUpperCase()}
			{children}
		</button>
	);
};

export default Button;

// 25년 이후로는 props의 기본값을 default props 세팅을 따로 할 필요 없이 저런식으로.
