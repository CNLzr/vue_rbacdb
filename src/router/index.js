import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

import index from "../rbac/index.vue"
import rolesList from "../rbac/roles/list.vue"
import usersList from "../rbac/users/list.vue"
import menusList from "../rbac/menus/list.vue"

const routes = [
  {
    path:"/",
    name:index,
    component:index,
    children:[
      {
        path:"/roles/list",
        name:rolesList,
        component:rolesList
      },
      {
        path:"/users/list",
        name:usersList,
        component:usersList
      },
      {
        path:"/menus/list",
        name:menusList,
        component:menusList
      }
    ]
  }
  // {
  //   path: '/woniuxy2',
  //   name: 'woniuxy2',
  //   component: () => import('../views/woniuxy2.vue')
  // },
  // {
  //   path: '/father',
  //   name: 'father',
  //   component: () => import('../son_father/father.vue')
  // },
  // {
  //   path: '/money',
  //   name: 'money',
  //   component: () => import('../views/money.vue')
  // },
  // {
  //   path: '/luyou',
  //   name: 'index',
  //   component: () => import('../my/index.vue'),
  //   children:[
  //     {
  //       path: '/login',
  //       name: 'login',
  //       component: () => import('../my/login.vue')
  //     },
  //     {
  //       path: '/register',
  //       name: 'register',
  //       component: () => import('../my/register.vue')
  //     },
  //   ]
  // }
];

const router = new VueRouter({
  routes
});

export default router
