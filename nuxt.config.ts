import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  modules: [
    "@nuxt/image",
    "@nuxtjs/i18n",
    "nuxt-graphql-client",
    "@pinia/nuxt",
  ],

  css: ["./app/assets/css/main.css"],

  runtimeConfig: {
    public: {
      "graphql-client": {
        clients: {
          default: "https://staging-api.baiitna.com/graphql",
        },
      },
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  i18n: {
    defaultLocale: "en",
    locales: [
      { code: "en", name: "English", file: "en.json" },
      { code: "ar", name: "العربية", file: "ar.json" },
    ],
  },
  pinia: {
    /**
     * Automatically add stores dirs to the auto imports. This is the same as
     * directly adding the dirs to the `imports.dirs` option. If you want to
     * also import nested stores, you can use the glob pattern `./stores/**`
     * (on Nuxt 3) or `app/stores/**` (on Nuxt 4+)
     *
     * @default `['store']`
     */
    storesDirs: [],
  },
});
