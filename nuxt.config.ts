// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  css: ['~/assets/css/w3.css'],
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  }
})