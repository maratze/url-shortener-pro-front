export default defineNuxtRouteMiddleware((to, from) => {
    // Get the authentication status from the auth store
    const authStore = useAuthStore();

    // If the user is not authenticated and is trying to access a protected route
    if (!authStore.isAuthenticated) {
        // Redirect to the login page with a redirect back to the original route
        return navigateTo({
            path: '/login',
            query: { redirect: to.fullPath }
        });
    }
});