// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {enabled: false},
    runtimeConfig: {
        public: {
            apiBase: 'http://localhost:8080/api',
            domainName: 'http://localhost:8080/api'
        }
    }
})
