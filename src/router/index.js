import Vue from 'vue'
import VueRouter from 'vue-router'
import WangEditor from '../views/WangEditor.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'WangEditor',
    component: WangEditor
  },
  {
    path: '/read-execl',
    name: 'ReadExecl',
    component: () => import( '../views/ReadExecl.vue')
  },
  {
    path: '/export-execl',
    name: 'ExportExecl',
    component: () => import( '../views/ExportExecl.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
