<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-4">Mes Tâches</h1>
    
    <!-- Formulaire pour ajouter une tâche -->
    <div class="mb-6 flex gap-2">
      <input 
        v-model="newTask" 
        type="text" 
        placeholder="Ajouter une nouvelle tâche..."
        class="flex-1 px-4 py-2 border rounded"
        @keyup.enter="addTask"
      />
      <button 
        @click="addTask"
        class="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Ajouter
      </button>
    </div>

    <!-- Liste des tâches -->
    <ul class="space-y-2">
      <li 
        v-for="task in tasks" 
        :key="task.id"
        class="flex items-center gap-3 p-3 bg-gray-100 rounded"
      >
        <input 
          type="checkbox" 
          :checked="task.completed"
          @change="toggleTask(task.id)"
        />
        <span :class="{ 'line-through': task.completed }">
          {{ task.title }}
        </span>
        <button 
          @click="deleteTask(task.id)"
          class="ml-auto text-red-500 hover:text-red-700"
        >
          ✕
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
const tasks = ref([]);
const newTask = ref('');

// Au chargement, récupérer les tâches depuis l'API
onMounted(async () => {
  const response = await fetch('/api/tasks');
  tasks.value = await response.json();
});

// Ajouter une tâche
const addTask = async () => {
  if (!newTask.value.trim()) return;
  
  const response = await fetch('/api/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: newTask.value })
  });
  
  const newTaskData = await response.json();
  tasks.value.push(newTaskData);
  newTask.value = '';
};

// Basculer le statut d'une tâche
const toggleTask = async (id) => {
  const task = tasks.value.find(t => t.id === id);
  const response = await fetch(`/api/tasks/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed: !task.completed })
  });
  
  const updated = await response.json();
  task.completed = updated.completed;
};

// Supprimer une tâche
const deleteTask = async (id) => {
  await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
  tasks.value = tasks.value.filter(t => t.id !== id);
};
</script>
