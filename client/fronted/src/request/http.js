import {Notify} from 'vant';
/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from 'axios';
import router from '../router';
import store from '@/store';
import qs from 'qs'
//import { Toast } from 'vant';

/**
 *
 * @param msg  提示信息
 * @param color 背景颜色
 */
const tip = (msg, color = '#1989fa') => {
  Notify({
    message: msg,
    duration: 2000,
    background: color
  });
}
/**********************头部配置***********************/
const headerConfig = {
  json: {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'X-Requested-With': 'XMLHttpRequest',
    },
  },
  form: {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  },
  file: {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
  },
  excel: {
    responseType: 'arraybuffer',
  },
}

/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
  router.replace({
    path: '/login',
    query: {
      redirect: router.currentRoute.fullPath
      // 将跳转的路由path作为参数，登录成功后跳转到该路由
    }
  });
}

/**
 * 注销
 * 清空所有登录信息
 */
const logout = () => {
  store.dispatch('changeToken', null);
  store.dispatch('changeUserInfo', {
    isLogin: false,
    userName: '',
    password: ''
  })
}

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, other) => {
  // 状态码判断
  switch (status) {
    // 401: 未登录状态，跳转登录页
    case 401:
      logout()
      toLogin()
      break;
    // 403 token过期
    // 清除token并跳转登录页
    case 402://token 出错
      tip('登录出错，请重新登录', 'red');
      logout()
      setTimeout(() => {
        toLogin();
      }, 1000)
    case 403:
      tip('登录过期，请重新登录', 'red');
      logout()
      setTimeout(() => {
        toLogin();
      }, 1000);
      break;
    // 404请求不存在
    case 404:
      tip('请求的资源不存在');
      break;
    case 500:
      //store.commit('changeNetwork', false);
      tip('网络异常!');
    //router.push({path:'refresh'})
    default:
      console.log('其它错误', other);
  }
}

const instance = axios.create({
  timeout: 10000,
})
// 设置post请求头
//instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */
instance.interceptors.request.use(config => {
    console.log(136, config)
    //post请求时，判断头部是什么
    /*if(config.method === 'post') {
      if(config.data&&config.data.headers) {
        config.headers = headerConfig[config.data.headers].headers
        delete config.data.headers
      }
    }*/
    // 登录流程控制中，根据本地是否存在token判断用户的登录情况
    // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
    // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
    // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。
    const token = store.state.token;//localStorage.getItem('token')
    token && (config.headers.Authorization = token);
    return config;
  },
  error => Promise.error(error))

// 响应拦截器
instance.interceptors.response.use(
  // 请求成功
  res => {
    if (res.status === 200) {
      store.dispatch('changeNetwork', true)
      return Promise.resolve(res)
    } else {
      return Promise.reject(res)
    }
  },
  // 请求失败

  error => {
    const {response} = error;
    console.log(94, response)
    if (response) {
      // 请求已发出，但是不在2xx的范围
      errorHandle(response.status, response.data.message);
      return Promise.reject(response);
    } else {
      // 处理断网的情况
      // eg:请求超时或断网时，更新state的network状态
      // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
      // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
      //store.dispatch('changeNetwork', false);
      tip('网络异常!', 'red');
      //router.push({path:'refresh'})
    }
  });

export default instance;