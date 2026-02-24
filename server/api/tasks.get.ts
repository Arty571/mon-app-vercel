export default defineEventHandler(async () => {
    const storage = useStorage('data');
    const tasks = await storage.getItem('tasks') || [];
    return tasks;
  })