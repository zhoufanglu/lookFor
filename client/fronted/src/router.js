import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

//import page
const error_404 = () => import('@/page/errorPage/error_404.vue')
const error_401 = () => import('@/page/errorPage/error_401.vue')
const home = ()=> import('@/page/home.vue')
const test = ()=> import('@/page/test/test.vue')
const login = ()=>import('@/page/user/login.vue')
const register = ()=>import('@/page/user/register.vue')
const userInfo = ()=> import('@/page/user/userInfo.vue')
//special
const refresh = ()=> import('@/page/special/refresh.vue')
//tool
const tool = ()=> import('@/page/tool/tool.vue')
const imgShow = ()=> import('@/page/tool/children/imgShow.vue')
const imgUpload = ()=> import('@/page/tool/children/imgUpload.vue')
const qiniuUpload = ()=> import('@/page/tool/children/qiniuUpload.vue')
const qiniuImgShow = ()=> import('@/page/tool/children/qiniuImgShow.vue')



export default new Router({
  routes: [
    {
      path: '/home',
      name: 'Home',
      meta:{
        requiresAuth:true,//是否要登录后查看
      },
      component: home
    },
    {
      path:'*',
      name:'Error_404',
      component: error_404
    },
    {
      path:'/401',
      name:'Error_401',
      component: error_401
    },
    {
      path:'/test',
      name:'Test',
      hidden:true,
      meta:{
        requiresAuth:true,
      },
      component: test
    },
    {
      path:'/refresh',
      name:'refresh',
      component: refresh
    },
    {
      path:'/login',
      name:'login',
      component: login
    },
    {
      path:'/register',
      name:'register',
      component: register
    },
	  {
		  path:'/userInfo',
		  name:'userInfo',
		  component: userInfo,
      meta:{
        requiresAuth:false,
      },
	  },
    {
      path:'/tool',
      redirect: '/tool/imgShow',
      name:'tool',
      component: tool,
      meta:{
        requiresAuth:false,
      },
      children: [
        {
          path:'/tool/imgShow',
          name:'imgShow',
          component: imgShow,
          meta:{
            ZHName: '图片展示',
          },
        },
        {
          path:'/tool/imgUpload',
          name:'imgUpload',
          component: imgUpload,
          meta:{
            ZHName: '图片上传',
          },
        },
        {
          path:'/tool/qiniuUpload',
          name:'qiniuUpload',
          component: qiniuUpload,
          meta:{
            ZHName: '七牛云上传',
          },
        },
        {
          path:'/tool/qiniuImgShow',
          name:'qiniuImgShow',
          component: qiniuImgShow,
          meta:{
            ZHName: '七牛云展示',
          },
        },
      ]
    },
  ]
})
