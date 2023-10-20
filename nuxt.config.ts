// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {enabled: false},
    runtimeConfig: {
        public: {
            apiBase: 'https://ывап.рф:8080/api',
            domainName: 'https://ывап.рф:8080/api'
        }
    }
})
