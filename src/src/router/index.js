import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Logout from '../views/Logout.vue';
// import User from '../views/User.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/About.vue')
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout
  },
  {
    path: '/me',
    name: 'Me',
    component: () => import('../views/Me.vue')
  },
  {
    path: '/u/:user',
    component: () => import('../views/User.vue')
  },
  {
    path: '/edit/:project',
    component: () => import('../views/Editor.vue')
  },
  {
    path: '/new',
    component: () => import('../views/New.vue')
  },
  {
    path: '/node',
    component: () => import('../views/Node.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
