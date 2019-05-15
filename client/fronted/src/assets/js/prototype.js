import Vue from 'vue'
import { Toast } from 'vant';

//接口配置
import api from '@/request/api'

const prototype = ()=>{
  Vue.prototype.$api = api
  Vue.prototype.$tip = Toast
}
export default prototype

