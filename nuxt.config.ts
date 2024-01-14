import { createResolver } from "@nuxt/kit";
import vuetify from "vite-plugin-vuetify";

const { resolve } = createResolver(import.meta.url);

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  //css: ["@/assets/main.scss"], // vuetify ships precompiled css, no need to import sass
  typescript: {
    shim: false,
  },

  vite: {
    // @ts-ignore
    // curently this will lead to a type error, but hopefully will be fixed soon #justBetaThings
    ssr: {
      noExternal: ["vuetify"], // add the vuetify vite plugin
    },
  },
  //build: { transpile: ["vuetify"] },
  modules: [
    'nuxt-vuefire',
    "@pinia/nuxt",
    async (options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config: any) =>
        // @ts-ignore
        config.plugins.push(vuetify({
                   styles: { configFile: resolve("/assets/scss/variables.scss") },
                 }))
      );
    },
  ],
  vuefire: {
    auth: {
      enabled: true,
      sessionCookie: true
    },
    config: {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: 'gamaoutillage-59a38.firebaseapp.com',
      projectId: 'gamaoutillage-59a38',
      appId: '1:701425524344:web:9e7231fd1a33e5de8ed78d',
      // there could be other properties depending on the project
    },
  },
  app: {
    head: {
      title:
        "Modernize Nuxt 3 - Vuetify 3 - vite - Typescript Based Admin Dashboard Template",
    },
  },
  nitro: {
    serveStatic: true,
  },

  sourcemap: { server: false, client: false },
  devServerHandlers: [],
  // hooks: {
  //   "vite:extendConfig": (config: any) => {
  //     config.plugins.push(
  //       vuetify({
  //         styles: { configFile: resolve("/assets/scss/variables.scss") },
  //       })
  //     );
  //   },
  // },
});
