// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxt/eslint", "@pinia/nuxt"],
  css: ["~/assets/css/main.css"],
  ssr: false,
  app: {
    head: {
      title: "Conlang Generator",
    },
  },
  runtimeConfig: {
    public: {
      translateEndpoint: "",
    }
  },
  // nitro: {
  //   devStorage: {
  //     translation: {
  //       driver: "fs",
  //       base: "./.cache/translation",
  //     },
  //   },
  //   prerender: {
  //     autoSubfolderIndex: false
  //   },
  //   preset: "cloudflare_module",
  //   cloudflare: {
  //     deployConfig: true,
  //     nodeCompat: true
  //   }
  // },
});
