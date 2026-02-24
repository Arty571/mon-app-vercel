export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const storage = useStorage('data');
    
    // Récupérer les tâches existantes
    const tasks = await storage.getItem('tasks') || [];
    
    // Créer une nouvelle tâche
    const newTask = {
      id: Date.now(),
      title: body.title,
      completed: false
    };
    
    tasks.push(newTask);
    
    // Sauvegarder
    await storage.setItem('tasks', tasks);
    
    return newTask;
  })