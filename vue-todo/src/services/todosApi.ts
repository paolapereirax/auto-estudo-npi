// api/todosApi.ts
import api from "./axios";
import { Tarefa } from "@/types/Tarefa";

export const getTodos = () => api.get<Tarefa[]>("/api/todos");

export const getTodoById = (id: number) => api.get<Tarefa>(`/api/todos/${id}`);

export const createTodo = (todo: Tarefa) => api.post("/api/todos", todo);

export const updateTodo = (id: number, todo: Tarefa) =>
  api.put(`/api/todos/${id}`, todo);

export const deleteTodo = (id: number) => api.delete(`/api/todos/${id}`);
