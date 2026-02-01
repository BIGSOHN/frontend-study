import './TodoItem.css';

const TodoItem = ({ id, isDone, content, date, onUpdate, onDelete }) => {
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

export default TodoItem;
