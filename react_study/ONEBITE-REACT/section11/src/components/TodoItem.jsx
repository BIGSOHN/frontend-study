import './TodoItem.css';
import { memo, useContext } from 'react';
import { TodoDispatchContext } from '../App';

const TodoItem = ({ id, isDone, content, date }) => {
	const { onUpdate, onDelete } = useContext(TodoDispatchContext);

	const onChangeCheckbox = () => {
		onUpdate(id);
	};

	const onDeleteClickButton = () => {
		onDelete(id);
	};

	return (
		<div className='TodoItem'>
			<input
				onChange={onChangeCheckbox}
				readOnly
				checked={isDone}
				type='checkbox'
			></input>
			<div className='content'>{content}</div>
			<div className='date'>{new Date(date).toLocaleDateString()}</div>
			<button onClick={onDeleteClickButton}>삭제</button>
		</div>
	);
};

// 고차 컴포넌트 (HOC)
// export default memo(TodoItem, (prevProps, nextProps) => {
// 	// 반환값에 따라 , Props가 바뀌었는지 안바뀌었는지 판단
// 	// T -> Props 바뀌지 않음 -> 리렌더링 X
// 	// F -> Props가 바귐 -> 리렌더링 O

// 	if (prevProps.id !== nextProps.id) return false;
// 	if (prevProps.isDone !== nextProps.isDone) return false;
// 	if (prevProps.content !== nextProps.content) return false;
// 	if (prevProps.date !== nextProps.date) return false;
// 	return true;
// });
// memo 는 props가 바꼈을 때마다 하기 때문에 과거와 현재를 비교함. 얕은 비교를 함

export default memo(TodoItem);
