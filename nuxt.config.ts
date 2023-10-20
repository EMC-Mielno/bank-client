// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {enabled: false},
    runtimeConfig: {
        public: {
            apiBase: 'http://ывап.рф:8080/api',
            domainName: 'http://ывап.рф:8080/api'
        }
    }
})
