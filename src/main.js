import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router';
import dashboard from './components/dashboard.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/dashboard', component: dashboard},
    ]
})
const app = createApp(App);
app.use(router);
app.mount('#app');
