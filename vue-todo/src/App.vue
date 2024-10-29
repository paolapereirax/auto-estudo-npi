<script setup>
import { ref, onMounted } from 'vue';
import { useTodos } from '@/composables/useTodos';

const title = ref('');
const description = ref('');

const { 
  todos, 
  fetchTodos,  
  createNewTodo, 
  updateExistingTodo, 
  deleteExistingTodo, 
} = useTodos();

// Função para adicionar uma nova tarefa
const addTodo = async () => {
  if (title.value.trim() === '' || description.value.trim() === '') {
    return;
  }

  const newTodo = {
    title: title.value,
    description: description.value,
    completed: false,
  };

  await createNewTodo(newTodo); // Cria uma nova tarefa na API com ID aleatório
  title.value = ''; // Limpa o campo de título
  description.value = ''; // Limpa o campo de descrição
}

// Função para remover uma tarefa
const removeTodo = async (todo) => {
  await deleteExistingTodo(todo.id); // Remove a tarefa na API
}

// Função para alternar o status de uma tarefa
const toggleTodoCompletion = async (todo) => {
  await updateExistingTodo(todo.id, { ...todo, completed: !todo.completed });
}

// Carrega as tarefas ao montar o componente
onMounted(async () => {
  await fetchTodos();
});
</script>

<template>
  <main class="app">
    <section class="header">
      <h2>To-Do List</h2>
    </section>

    <section class="create-todo">
      <h3>Adicionar Nova Tarefa</h3>
      <form @submit.prevent="addTodo">
        <input 
          type="text" 
          placeholder="Título da tarefa"
          v-model="title" 
          class="input-field" 
        />
        <input 
          type="text" 
          placeholder="Descrição da tarefa"
          v-model="description" 
          class="input-field" 
        />
        <button type="submit" class="button-submit">Adicionar Tarefa</button>
      </form>
    </section>

    <section class="todo-list">
      <h3>Lista de Tarefas</h3>
      <div v-for="todo in todos" :key="todo.id" :class="`todo-item ${todo.completed ? 'completed' : ''}`">
        <label>
          <input type="checkbox" v-model="todo.completed" @change="toggleTodoCompletion(todo)" />
          <span>{{ todo.title }}</span>
        </label>
        <p>{{ todo.description }}</p>
        <button @click="removeTodo(todo)" class="delete-button">Deletar</button>
      </div>
    </section>
  </main>
</template>

<style scoped>
/* Estilos simplificados e básicos */
.app {
  max-width: 600px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  padding: 20px;
  background-color: #f4f4f9;
  border-radius: 8px;
}

.header {
  text-align: center;
  margin-bottom: 20px;
}

.create-todo {
  background: #ffffff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.input-field {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.button-submit {
  width: 100%;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.button-submit:hover {
  background-color: #45a049;
}

.todo-list {
  background: #ffffff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.todo-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.todo-item.completed label span {
  text-decoration: line-through;
}

.delete-button {
  padding: 5px 10px;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

.delete-button:hover {
  background-color: #e60000;
}
</style>
