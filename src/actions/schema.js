// to hadle normalizing of reducer API call responses
import { Schema, arrayOf } from 'normalizr';

export const todo = new Schema('todos');
export const arrayOfTodos = arrayOf(todo);
