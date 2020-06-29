import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AddressList from '../views/AddressList'
import Success from '../views/Success'
import Info from '../views/Info'
Vue.use(VueRouter)

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
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
    {
      path: '/addressList',
      name:'新增地址',
      // component: () => import(/* webpackChunkName: "about" */ '../views/AddressList.vue')

      component: AddressList
    },
    {
      path: '/addressNew',
      name: '地址列表',
      component: () => import(/* webpackChunkName: "about" */ '../views/AddressNew.vue')
    },
    {
      path: '/addressEdit',
      name: '编辑地址列表',
      component: () => import('../views/AddressEdit.vue')
    },
    {
      path: '/detail',
      name: '订单详情',
      component: () => import('../views/Detail.vue')
    },
    {
      path: '/success',
      name: '支付成功',
      component: Success
    },
    {
      path: '/info',
      name: '订单信息',
      component: Info
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
