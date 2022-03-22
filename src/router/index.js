import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'HomeView',
    component: () => import('../views/HomeView.vue'),
    children: [{
        path: 'MyTasks',
        name: 'MyTasks',
        component: () => import('../views/pages/MyTasks.vue'),
      },
      {
        path: 'InProgress',
        name: 'InProgress',
        component: () => import('../views/pages/InProgress.vue'),
      },
      {
        path: 'Completed',
        name: 'Completed',
        component: () => import('../views/pages/Completed.vue'),
      }
    ]
  },

]

const router = new VueRouter({
  routes
})

export default router