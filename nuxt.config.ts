export default defineNuxtConfig({
  ssr: true,
  nitro: {
    storage: {
      data: { driver: 'memory' }
    }
  }
})