import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/home',
    name: 'Home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  }
]


const router = new VueRouter({
  routes
})

//只有在登录情况下才可以访问其他的API
//通过路由守卫进行登录判断
router.beforeEach((to,from,next)=>{
  //to 将要访问的页面
  //from  来源页面
  //next 是一个函数，表示放行 next()---放行  next('/login')----强行跳转到login页面
  if(to.path=="/login"){
    next()
  }
  let tokenStr=sessionStorage.getItem('token')
  if(tokenStr===null){
    next('/login')
  }else{
    next()
  }
})

export default router
