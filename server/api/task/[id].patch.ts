export default defineEventHandler(async (event) => {
    const id = parseInt(event.context.params.id);
    const body = await readBody(event);
    const storage = useStorage('data');
    
    // Récupérer les tâches
    const tasks = await storage.getItem('tasks') || [];
    
    // Trouver et mettre à jour
    const task = tasks.find(t => t.id === id);
    if (task) {
      task.completed = body.completed;
    }
    
    await storage.setItem('tasks', tasks);
    return task;
  })