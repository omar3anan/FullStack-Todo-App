import { apiClient } from "./ApiClient";

export function retrieveAllTodosForUsername(username) {
  return apiClient.get(`/users/${username}/todos`);
}
export function getTodoById(username, id) {
  return apiClient.get(`/users/${username}/todos/${id}`);
}

export function deleteTodoById(username, id) {
  return apiClient.delete(`/users/${username}/todos/${id}`);
}

export function updateTodoById(username, id, todo) {
  return apiClient.put(`/users/${username}/todos/${id}`, todo); //todo send the todo object
}

export function createTodo(username, todo) {
  return apiClient.post(`/users/${username}/todos`, todo);
}
