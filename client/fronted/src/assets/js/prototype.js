import Vue from 'vue'
import { Button, Cell, Toast } from 'vant';
Vue.use(Button)
//接口配置
import api from '@/request/api'

const prototype = ()=>{
  Vue.prototype.$api = api
  Vue.prototype.$tip = Toast
}
export default prototype

