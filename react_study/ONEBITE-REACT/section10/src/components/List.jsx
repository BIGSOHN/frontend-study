import './List.css';
import TodoItem from './TodoItem';

import { useState, useMemo } from 'react';

const List = ({ todos, onUpdate, onDelete }) => {
	const [search, setSearch] = useState('');

	const onChangeSearch = (e) => {
		setSearch(e.target.value);
	};

	const getFilteredData = () => {
		if (search === '') {
			return todos;
		}
		return todos.filter((todo) =>
			todo.content.toLowerCase().includes(search.toLowerCase())
		);
	};

	const filteredTodos = getFilteredData();

	// const getAnalyzedData = () => {
	// 	const totalCount = todos.length;
	// 	const doneCount = todos.filter((todo) => todo.isDone).length;
	// 	const notDoneCount = totalCount - doneCount;

	// 	return {
	// 		totalCount,
	// 		doneCount,
	// 		notDoneCount,
	// 	};
	// };

	const { totalCount, doneCount, notDoneCount } = useMemo(() => {
		// 메모이제이션하고 싶은 연산을 넣어주면 됨
		const totalCount = todos.length;
		const doneCount = todos.filter((todo) => todo.isDone).length;
		const notDoneCount = totalCount - doneCount;

		return {
			totalCount,
			doneCount,
			notDoneCount,
		};
	}, [
		// 의존성 배열 : deps
		todos,
	]);

	// const { totalCount, doneCount, notDoneCount } = getAnalyzedData();

	return (
		<div className='List'>
			<h4>Todo List 🌱</h4>
			<div>total : {totalCount}</div>
			<div>done : {doneCount}</div>
			<div>notDone : {notDoneCount}</div>
			<input
				value={search}
				onChange={onChangeSearch}
				placeholder='검색어를 입력하세요.'
			></input>
			<div className='todos_wrapper'>
				{filteredTodos.map((todo) => {
					return (
						<TodoItem
							key={todo.id}
							{...todo}
							onUpdate={onUpdate}
							onDelete={onDelete}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default List;
