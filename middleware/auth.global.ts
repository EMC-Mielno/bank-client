export default defineNuxtRouteMiddleware((to, from) => {
    if (!process.server) {
        const token = useCookie('token')
        if (!token.value && to.path !== '/auth' && to.path !== '/' && to.path.startsWith('/online')) {
            return navigateTo('/')
        }
        if (token.value && to.path === '/auth') {
            return navigateTo('/online/dashboard')
        }
    }
})