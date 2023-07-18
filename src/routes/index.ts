import { createRouter, createWebHistory } from 'vue-router';
import Posts from '../views/Posts.vue';
import Create from '../views/Create.vue';
import Inner from '../views/Inner.vue';

const routes = [
  { path: '/', component: Posts },
  { path: '/create', component: Create },
  { path: '/post/:id', component: Inner, name: 'inner' },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router