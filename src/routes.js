import Vue from 'vue'
import VueRouter from 'vue-router'

import Dashboard from './views/Dashboard'
import Users from './views/Users'
import Customers from './views/Customers'
// import Settings from './views/Settings'
// import Login from './components/Login'

Vue.use(VueRouter)

let router = new VueRouter ({
  routes:[
  {
    path:'/', 
    name: 'Dashboard', 
    component: Dashboard,
    meta:{
      requiresAuth: true
    }
  },
  {
    path:'/users', 
    name: 'Users', 
    component: Users,
    meta:{
      requiresAuth: true
    }
  },
  {
    path:'/Customers', 
    name: 'Customers', 
    component: Customers,
    meta:{
      requiresAuth: true
    }
  },
  // {
  //   path:'/settings', 
  //   name: 'Settings', 
  //   component: Settings,
  //   meta:{
  //     requiresAuth: true
  //   }
  // },
  // 
  // {
  //   path:'/login', 
  //   name: 'Login', 
  //   component: Login,
  //   meta:{
  //     requiresGuest: true
  //   }
  // }
],
  mode: 'history'
})

export default router;