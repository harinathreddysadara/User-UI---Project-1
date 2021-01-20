import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from '../store/index'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component:() => import('../views/Home.vue'),
  children:[
    {
      path: '/',
      name: 'opt',
      component: () => import('../views/children/LandingPage.vue')

    },
   
  {
    path:'/cart',
    component:()=>import('../views/children/Cart.vue')
  },
 {
   path:'/product',
   component:()=>import('../views/children/ViewProduct.vue')
 },
 {
  path:'/profile',
  component:()=>import('../views/children/Profile.vue'),
  

},
{
  path:'/orders',
  component:()=>import('../views/children/OrderHistory.vue'),
  
},
{
  path:'/logs',
  component:()=>import('../views/children/LogHistory.vue')
},
{
  path:'/cateogry',
  component:()=>import('../views/children/Category.vue')
},
{
  path:'/search',
  component:()=>import('../views/children/Search.vue')
},
{
  path:'/allproducts',
  component:()=>import('../views/children/ProductList.vue')
}


]
  },
{
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue')
  },



  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
