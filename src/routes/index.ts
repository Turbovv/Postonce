import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Posts from '../views/Posts.vue';
import Create from '../views/Create.vue';
import Inner from '../views/Inner.vue';
import { isAuthenticated } from '../utils/auth';

const routes: Array<RouteRecordRaw> = [
  { path: '/', component: Posts, name: 'Home' },
  { path: '/create', component: Create, meta: {
    requiresAuth: true,
  }, },
  { path: '/post/:id', component: Inner, name: 'inner' },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: Posts
  }
];



const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, _from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next({ name: 'Home' });
  } else {
    next();
  }
});

export default router