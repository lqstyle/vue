import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/** note: submenu only apppear when children.length>=1
*   detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
**/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/authredirect', component: () => import('@/views/login/authredirect'), hidden: true },
  { path: '/404', component: () => import('@/views/errorPage/404'), hidden: true },
  { path: '/401', component: () => import('@/views/errorPage/401'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: 'case'
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [

  {
    path: '/user',
    component: Layout,
    redirect: '/user/user',
    name: 'user',
    meta: {
      title: 'user',
      icon: 'peoples',
      roles: ['admin']
    },
    children: [
      { path: 'user', component: () => import('@/views/user/user'), name: 'user', meta: { title: 'user', noCache: true , icon: 'peoples', roles: ['admin'] }}
    ]
  },
  {
    path: '/process',
    component: Layout,
    redirect: '/process/modeler',
    name: 'processmanage',
    meta: {
      title: 'process',
      icon: 'component',
      roles: ['admin']
    },
    children: [
      // { path: 'admin', component: () => import('@/views/process/manage'), name: 'manage', meta: { title: 'manage', roles: ['admin'] }},
      { path: 'modeler', component: () => import('@/views/process/modeler'), name: 'design', meta: { title: 'design', roles: ['admin'], icon: 'component'  }}
    ]
  },
  {
    path: '/case',
    component: Layout,
    redirect: '/case/tasking',
    name: 'case',
    meta: {
      title: 'case',
      icon: 'table'
    },
    children: [
      { path: 'tasking', component: () => import('@/views/case/tasking'), name: 'caseTasking', meta: { title: 'caseWorking', noCache: true }},
      { path: 'tasked', component: () => import('@/views/case/tasked'), name: 'caseTasked', meta: { title: 'caseHistory' }},
      { path: 'handle-case', component: () => import('@/views/case/handle'), name: 'handlecase', meta: { title: 'handlecase', noCache: true }, hidden: true }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]
