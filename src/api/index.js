import { v4 } from 'node-uuid';

// this is a fakse in-memory implementation of a REST server
const fakeDatabase = {
	todos: [{
		id: v4(),
		text: 'hey',
		completed: true,
	}, {
		id: v4(),
		text: 'ho',
		completed: true,
	}, {
		id: v4(),
		text: 'lets go',
		completed: false,
	}],
};

// manual delay to mimic actual REST calls
const delay = (ms) =>
	new Promise(resolve => setTimeout(resolve, ms));

// methods to fake real REST calls & Promise returns
export const fetchTodos = (filter) =>
	delay(500).then(() => {
		if (Math.random() > 0.5) {
			throw new Error('Boom!');
		}

		switch (filter) {
			case 'all':
				return fakeDatabase.todos;
			case 'active':
				return fakeDatabase.todos.filter(t => !t.completed);
			case 'completed':
				return fakeDatabase.todos.filter(t => t.completed);
			default:
				throw new Error(`Unknown filter: ${filter}`);
		}
	});

// add addTodo for fakeDB
export const addTodo = (text) =>
	delay(500).then(() => {
		const todo = {
			id: v4(),
			text,
			completed: false,
		};
		fakeDatabase.todos.push(todo);
		return todo;
	});
// add toggleTodo for fakeDB
export const toggleTodo = (id) =>
	delay(500).then(() => {
		const todo = fakeDatabase.todos.find(t => t.id === id);
		todo.completed = !todo.completed;
		return todo;
	});
