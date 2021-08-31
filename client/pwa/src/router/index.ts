import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "search" */ '../views/Home.vue')
    },
    {
      path: '/documents',
      name: 'documents',
      component: () => import(/* webpackChunkName: "search" */ '../views/Documents.vue')
    },
  ]
})

export default router;