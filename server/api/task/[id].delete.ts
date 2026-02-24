export default defineEventHandler(async (event) => {
    const id = parseInt(event.context.params.id);
    const storage = useStorage('data');
    
    let tasks = await storage.getItem('tasks') || [];
    tasks = tasks.filter(t => t.id !== id);
    
    await storage.setItem('tasks', tasks);
    
    return { success: true };
  })