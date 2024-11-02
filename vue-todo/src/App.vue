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
  <v-container class="app">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-sheet rounded class="pa-4">
          <v-row class="pb-4">
            <v-col>
              <h2 class="text-center">To Do List</h2>
            </v-col>
          </v-row>
          <v-form @submit.prevent="addTodo">
            <v-text-field
              label="Título da tarefa"
              v-model="title"
              outlined
            />
            <v-text-field
              label="Descrição da tarefa"
              v-model="description"
              outlined
            />
            <v-row class="pa-4 justify-end">
              <v-btn type="submit" color="success" >Adicionar Tarefa</v-btn>
            </v-row>
          </v-form>
        </v-sheet>
        
        <v-sheet rounded class="pa-4 mt-4">
          <h3>Lista de Tarefas</h3>
          <v-list>
            <v-list-item
              v-for="todo in todos"
              :key="todo.id"
              :class="{ 'completed': todo.completed }"
              @click="toggleTodoCompletion(todo)"
            >
              <v-row class="pa-4 mt-4 justify-space-between">
                <v-list-item-content>
                  <v-row>
                    <v-checkbox
                    v-model="todo.completed"
                    @change="toggleTodoCompletion(todo)"
                  ></v-checkbox>
                  <v-col>
                    <v-list-item-title>{{ todo.title }}</v-list-item-title>
                    <v-list-item-subtitle>{{ todo.description }}</v-list-item-subtitle>
                  </v-col>
                  </v-row>
                </v-list-item-content>
                <v-btn size="small" icon @click.stop="removeTodo(todo)">
                  <v-icon color="error">mdi-delete</v-icon>
                </v-btn>
              </v-row>
            </v-list-item>
          </v-list>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.completed .v-list-item-title {
  text-decoration: line-through;
}
</style>
