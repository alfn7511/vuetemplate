import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  { path: '/', name: 'index', component: () => import('@/views/index.vue') }
]

export default new Router({
  mode: 'hash',
  routes: routes
})
