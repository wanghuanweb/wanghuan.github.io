import * as types from '../constants/ActionTypes'

export function addRadio(text) {
  return { type: types.ADD_RADIO, text }
}

export function addSelect(text) {
  return { type: types.ADD_SELECT, text }
}

export function addText(text) {
  return { type: types.ADD_TEXT, text }
}

export function repeatTodo(text) {
  return { type: types.REPEAT_TODO, text }
}

export function deleteTodo(id) {
  return { type: types.DELETE_TODO, id }
}

export function editTodo(id, text) {
  return { type: types.EDIT_TODO, id, text }
}

export function completeTodo(id) {
  return { type: types.COMPLETE_TODO, id }
}

export function completeAll() {
  return { type: types.COMPLETE_ALL }
}

export function clearCompleted() {
  return { type: types.CLEAR_COMPLETED }
}
