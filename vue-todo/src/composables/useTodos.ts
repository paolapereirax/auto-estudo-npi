// composables/useTodos.ts
import { ref } from "vue";
import api from "@/services/axios";
import { Tarefa } from "@/types/Tarefa";

export function useTodos() {
  const todos = ref<Tarefa[]>([]);
  const error = ref<string | null>(null);
  const loading = ref(false);

  // Função para gerar um ID aleatório
  const generateRandomId = () => Math.floor(Math.random() * 100000);

  // Função para listar todas as tarefas
  const fetchTodos = async () => {
    loading.value = true;
    try {
      const response = await api.get<Tarefa[]>("/api/todos");
      todos.value = response.data;
    } catch (err) {
      error.value = "Erro ao buscar tarefas.";
    } finally {
      loading.value = false;
    }
  };

  // Função para criar uma nova tarefa com ID aleatório
  const createNewTodo = async (todo: Omit<Tarefa, "id">) => {
    loading.value = true;
    try {
      const todoWithId = { ...todo, id: generateRandomId() }; // Atribui um ID aleatório
      await api.post("/api/todos", todoWithId);
      await fetchTodos(); // Atualiza a lista após criação
    } catch (err) {
      error.value = "Erro ao criar tarefa.";
    } finally {
      loading.value = false;
    }
  };

  // Funções para atualizar e deletar permanecem iguais
  const updateExistingTodo = async (id: number, updatedTodo: Tarefa) => {
    loading.value = true;
    try {
      await api.put(`/api/todos/${id}`, updatedTodo);
      await fetchTodos();
    } catch (err) {
      error.value = "Erro ao atualizar a tarefa.";
    } finally {
      loading.value = false;
    }
  };

  const deleteExistingTodo = async (id: number) => {
    loading.value = true;
    try {
      await api.delete(`/api/todos/${id}`);
      await fetchTodos();
    } catch (err) {
      error.value = "Erro ao excluir a tarefa.";
    } finally {
      loading.value = false;
    }
  };

  return {
    todos,
    error,
    loading,
    fetchTodos,
    createNewTodo,
    updateExistingTodo,
    deleteExistingTodo,
  };
}
