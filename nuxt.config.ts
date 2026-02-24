export default defineNuxtConfig({
  ssr: true,
  nitro: {
    storage: {
      data: { 
        driver: process.env.NODE_ENV === 'production' 
          ? 'vercelKV' 
          : 'memory'
      }
    }
  }
})