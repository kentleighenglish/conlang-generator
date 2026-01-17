// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxt/eslint", "@pinia/nuxt"],
  css: ["~/assets/css/main.css"],
  app: {
    head: {
      title: "Conlang Generator",
    },
  },
  nitro: {
    devStorage: {
      translation: {
        driver: "fs",
        base: "./.cache/translation",
      },
    },
  },
  runtimeConfig: {
    isServer: true,
  },
  experimental: {
    renderJsonPayloads: false,
  },
});
