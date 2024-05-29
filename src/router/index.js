import Vue from 'vue'
import VueRouter from 'vue-router'
import artistas from '../views/artistas.vue'
import discos from '../views/discos.vue'
import ClasesDD_E2View from '../views/ClasesDD_E2View.vue'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/artistas',
    name: 'artistas',
    component: artistas
  },
  {
    path: '/discos',
    name: 'discos',
    component: discos
  },
  {
    path: '/d&d',
    name: 'd&d',
    component: ClasesDD_E2View
  }
]

const router = new VueRouter({
  routes
})

export default router
