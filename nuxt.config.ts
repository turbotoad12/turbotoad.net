// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/css/w3.css'],
  compatibilityDate: '2026-05-10',

  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },

  modules: ['@nuxtjs/sitemap']
})