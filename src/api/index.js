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

const delay = (ms) =>
	new Promise(resolve => setTimeout(resolve, ms));

export const fetchTodos = (filter) =>
	delay(500).then(() => {
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
