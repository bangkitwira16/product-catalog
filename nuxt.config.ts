// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  components: {
    global: true,
    dirs: ["~/components"],
  },
  modules: ['nuxt-icon'],
  runtimeConfig: {
    public: {
      API_URL: "https://dummyjson.com",
    },
  },
});
