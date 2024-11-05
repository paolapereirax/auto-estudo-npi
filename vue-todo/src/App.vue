<script setup>
import { ref, onMounted } from 'vue';
import { useTodos } from '@/composables/useTodos';

const title = ref('');
const description = ref('');
const editingTodo = ref(null); // Variável para controlar a tarefa em edição

const { 
  todos, 
  fetchTodos,  
  createNewTodo, 
  updateExistingTodo, 
  deleteExistingTodo, 
} = useTodos();

// Função para adicionar ou atualizar uma tarefa
const saveTodo = async () => {
  if (title.value.trim() === '' || description.value.trim() === '') {
    return;
  }

  if (editingTodo.value) {
    // Edita e atualiza a tarefa existente
    const updatedTodo = {
      ...editingTodo.value,
      title: title.value,
      description: description.value,
    };
    await updateExistingTodo(editingTodo.value.id, updatedTodo);
    editingTodo.value = null; // Limpa o modo de edição após salvar
  } else {
    // Adiciona uma nova tarefa
    const newTodo = {
      title: title.value,
      description: description.value,
      completed: false,
    };
    await createNewTodo(newTodo);
  }

  title.value = ''; // Limpa o campo de título
  description.value = ''; // Limpa o campo de descrição
};

// Função para remover uma tarefa
const removeTodo = async (todo) => {
  await deleteExistingTodo(todo.id);
};

// Função para alterar o status da tarefa (completo, não completo)
const toggleTodoCompletion = async (todo) => {
  const updatedTodo = {
    ...todo,
    completed: !todo.completed
  };
  await updateExistingTodo(todo.id, updatedTodo);
};

// Função para iniciar o modo de edição de uma tarefa
const editTodo = (todo) => {
  if (!todo.completed) {
    editingTodo.value = todo;
    title.value = todo.title;
    description.value = todo.description;
  }
};

// Carrega as tarefas ao abrir a página
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
          <v-form @submit.prevent="saveTodo">
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
              <v-btn :color="editingTodo ? 'primary' : 'success'" type="submit">
                {{ editingTodo ? 'Atualizar Tarefa' : 'Adicionar Tarefa' }}
              </v-btn>
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
            >
              <v-row class="pa-4 mt-4 justify-space-between">
                <v-list-item-content>
                  <v-row>
                    <v-checkbox
                      v-model="todo.completed"
                      @click="toggleTodoCompletion(todo)"
                    ></v-checkbox>
                    <v-col>
                      <v-list-item-title>{{ todo.title }}</v-list-item-title>
                      <v-list-item-subtitle>{{ todo.description }}</v-list-item-subtitle>
                    </v-col>
                  </v-row>
                </v-list-item-content>
                <div class="actions">
                  <v-btn 
                    size="small" 
                    icon 
                    :disabled="todo.completed" 
                    @click.stop="editTodo(todo)"
                  >
                    <v-icon color="primary">mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn size="small" icon @click.stop="removeTodo(todo)">
                    <v-icon color="error">mdi-delete</v-icon>
                  </v-btn>
                </div>
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
.actions {
  display: flex;
  gap: 8px;
}
</style>