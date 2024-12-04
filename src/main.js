import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router';
import dashboard from './components/dashboard.vue';
import login from './components/login.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/dashboard', component: dashboard},
        {path: '/login', component: login},
    ]
})
const app = createApp(App);
app.use(router);
app.mount('#app');
