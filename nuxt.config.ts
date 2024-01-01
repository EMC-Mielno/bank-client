// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {enabled: false},
    ssr: false,
    runtimeConfig: {
        public: {
            apiBase: 'http://127.0.0.1:8080/api',
        }
    }
})
