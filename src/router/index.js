import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/instrumento/:id',
    name: 'Instrumento',
    component: () => import(/* webpackChunkName: "about" */ '../views/Instrumento.vue')
  },
  {
    path:'/crud',
    component: () => import(/* webpackChunkName: "crud" */ '../views/Crud.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior: function (to) {
    if (to.hash) {
      return {
        selector: to.hash
      }
    }
  }
});


export default router;